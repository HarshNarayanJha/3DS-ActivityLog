import { DateTime } from "luxon"

import { getTitle } from "./3dsdbapi"
import {
  SYSTEM_APPLETS,
  SYSTEM_APPLETS_TIDHIGH,
  SYSTEM_APPLICATIONS,
  SYSTEM_APPLICATIONS_TIDHIGH,
  SYSTEM_EVENT_TID
} from "./titledb"
import type { AppletData, PLDSessionDataEntry, PLDSummaryDataEntry, TitleData } from "./types"

export class PLDParser {
  private sessionEntries: Map<number, PLDSessionDataEntry> = new Map()
  private summaryEntries: Map<string, PLDSummaryDataEntry> = new Map()

  public async parseSession(input: string) {
    this.reset()

    const lines = this.parseCSV(input, ["TitleID", "Timestamp", "PlaytimeSeconds"])
    console.log(`Ready to parse ${lines.length} Lines`)

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].trim().split(",")

      if (values.length !== 3) {
        throw new Error(`Invalid CSV Line. Expected 3 values at line ${i + 1}`)
      }

      const [tid, timestampStr, playtimeStr] = values
      const timestamp = DateTime.fromISO(timestampStr.trim())
      const playtimeSeconds = Number.parseInt(playtimeStr.trim())

      if (Number.isNaN(playtimeSeconds)) {
        throw new Error(`Invalid CSV Line. Some expected values are not number. record ${i}`)
      }

      if (!timestamp.isValid) {
        throw new Error(`Invalid CSV Line. Timestamp is not a valid date. record ${i}`)
      }

      const { titleData, appletData } = await this.findAppData(tid)

      if (titleData === undefined && appletData === undefined) {
        console.warn(
          `Invalid Data. Neither Title Data nor Applet Data found. ${tid}. record: ${i}. Skipping`
        )
        continue
      }

      this.sessionEntries.set(i, {
        title: titleData,
        applet: appletData,
        session: {
          tid,
          timestamp: timestamp as DateTime<true>,
          playtimeSeconds
        }
      })
    }

    console.log(`Finished with ${this.sessionEntries.size} Entries.`)
    return this.sessionEntries
  }

  public async parseSummary(input: string) {
    this.reset()

    const lines = this.parseCSV(input, [
      "TitleID",
      "PlaytimeSeconds",
      "Launches",
      "FirstPlayed",
      "LastPlayed"
    ])
    console.log(`Ready to parse ${lines.length} Lines`)

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].trim().split(",")

      if (values.length !== 5) {
        throw new Error(`Invalid CSV Line. Expected 5 values at line ${i + 1}`)
      }

      const [tid, playtimeStr, launchesStr, firstPlayedStr, lastPlayedStr] = values
      const playtimeSeconds = Number.parseInt(playtimeStr.trim())
      const launches = Number.parseInt(launchesStr.trim())
      const firstPlayed = DateTime.fromISO(firstPlayedStr.trim())
      const lastPlayed = DateTime.fromISO(lastPlayedStr.trim())

      if ([playtimeSeconds, launches].some(Number.isNaN)) {
        throw new Error(`Invalid CSV Line. Some expected values are not number. tid ${tid}`)
      }

      if (!firstPlayed.isValid) {
        throw new Error(`Invalid CSV Line. FirstPlayed is not a valid date. tid ${tid}`)
      }

      if (!lastPlayed.isValid) {
        throw new Error(`Invalid CSV Line. LastPlayed is not a valid date. tid ${tid}`)
      }

      const { titleData, appletData } = await this.findAppData(tid)

      if (titleData === undefined && appletData === undefined) {
        console.warn(`Invalid Data. Neither Title Data nor Applet Data found. ${tid}. Skipping`)
        continue
      }

      this.summaryEntries.set(tid, {
        title: titleData,
        applet: appletData,
        summary: {
          tid,
          playtimeSeconds,
          launches,
          firstPlayed: firstPlayed as DateTime<true>,
          lastPlayed: lastPlayed as DateTime<true>
        }
      })
    }

    console.log(`Finished with ${this.summaryEntries.size} Entries.`)
    return this.summaryEntries
  }

  private parseCSV(input: string, expectedHeader: string[]): string[] {
    const lines = input
      .trim()
      .split("\n")
      .map((l) => l.trim())

    // check header
    const header = lines[0].trim().split(",")
    if (header.length !== expectedHeader.length || header.some((h, i) => h !== expectedHeader[i])) {
      throw new Error(
        "Invalid CSV header. Expected: " +
          expectedHeader.join(",") +
          "\nReceived: " +
          header.join(",")
      )
    }

    return lines
  }

  private async findAppData(
    tid: string
  ): Promise<{ titleData?: TitleData; appletData?: AppletData }> {
    tid = tid.toUpperCase().trim()

    if (tid === SYSTEM_EVENT_TID) {
      return {}
    }

    if (tid.length !== 16) {
      throw new Error(`Invalid TID: ${tid}. Expected 16 characters but got ${tid.length}.`)
    }
    const [tidHigh, tidLow] = [tid.slice(0, 8), tid.slice(8, 16)]

    if (tidHigh === SYSTEM_APPLICATIONS_TIDHIGH) {
      return {
        titleData: SYSTEM_APPLICATIONS[tidLow]
      }
    } else if (tidHigh === SYSTEM_APPLETS_TIDHIGH) {
      return {
        appletData: SYSTEM_APPLETS[tidLow]
      }
    } else {
      const titleData = await getTitle(tid)
      return {
        titleData
      }
    }
  }

  public reset() {
    this.sessionEntries = new Map()
    this.summaryEntries = new Map()
  }
}
