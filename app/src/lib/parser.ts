import { getTitle } from "./3dsdbapi"
import {
  SYSTEM_APPLETS,
  SYSTEM_APPLETS_TIDHIGH,
  SYSTEM_APPLICATIONS,
  SYSTEM_APPLICATIONS_TIDHIGH,
  SYSTEM_EVENT_TID
} from "./titledb"
import {
  type AppletData,
  type PlayHistory,
  type TitleData,
  EntryType,
  PlayEvent,
  SystemEvent
} from "./types"

export class PlayHistoryParser {
  private entries: PlayHistory = new Map()

  public async parse(input: string): Promise<PlayHistory> {
    this.reset()

    const lines = input.trim().split("\n")

    // skip header
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].trim().split(",")

      if (values.length !== 4) {
        throw new Error(`Invalid CSV Line. Expected 4 values at line ${i + 1}`)
      }

      const [recordStr, tid, logInfoStr, timestampStr] = values
      const record = Number.parseInt(recordStr.trim())
      const logInfo = Number.parseInt(logInfoStr.trim())
      const timestamp = Number.parseInt(timestampStr.trim())

      if ([record, logInfo, timestamp].some(Number.isNaN)) {
        throw new Error(`Invalid CSV Line. Some expected values are not number. Record ${record}`)
      }

      const { entryType, playEvent, systemEvent } = this.handleEvent(tid, logInfo)
      const { titleData, appletData } = await this.findAppData(tid)

      if (entryType === EntryType.SYSTEM && systemEvent === undefined) {
        throw new Error(`Invalid Data. Expected SYSTEM event but System Event not found. ${record}`)
      }

      if (
        (entryType === EntryType.APPLICATION || entryType === EntryType.APPLET) &&
        playEvent === undefined
      ) {
        throw new Error(
          `Invalid Data. Expected APPLICATION/APPLET event but Play Event not found. ${record}`
        )
      }

      if (entryType === EntryType.APPLICATION && titleData === undefined) {
        throw new Error(`Invalid Data. Expected SYSTEM event but Title Data not found. ${record}`)
      }

      if (entryType === EntryType.APPLET && appletData === undefined) {
        throw new Error(`Invalid Data. Expected APPLET event but Applet Data not found. ${record}`)
      }

      if (entryType === EntryType.APPLICATION)
        this.entries.set(record, {
          title: titleData,
          applet: appletData,
          entryType,
          playEvent,
          systemEvent,
          timestamp
        })
    }

    return this.entries
  }

  private async findAppData(
    _tid: string
  ): Promise<{ titleData?: TitleData; appletData?: AppletData }> {
    const tid = _tid.toUpperCase().trim()

    if (tid === SYSTEM_EVENT_TID) {
      // system event
      return {}
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

  private handleEvent(
    tid: string,
    logInfo: number
  ): { entryType: EntryType; playEvent?: PlayEvent; systemEvent?: SystemEvent } {
    if (tid.toUpperCase().trim() === SYSTEM_EVENT_TID) {
      return {
        entryType: EntryType.SYSTEM,
        ...this.handleSystemEvent(logInfo)
      }
    } else {
      return {
        ...this.handlePlayEvent(logInfo)
      }
    }
  }

  private handleSystemEvent(logInfo: number): { systemEvent: SystemEvent } {
    // logInfo is one number
    return { systemEvent: logInfo as SystemEvent }
  }

  private handlePlayEvent(logInfo: number): { entryType: EntryType; playEvent: PlayEvent } {
    // logInfo is a 4 bit binary string
    // if 3rd MSB is set, it is an Applet, otherwise full Application
    const entryType: EntryType = (logInfo & 0b0010) === 0 ? EntryType.APPLICATION : EntryType.APPLET

    let playEvent: PlayEvent
    if ((logInfo & 0b0001) === 0) {
      // last MSB NOT set means opening event
      if ((logInfo & 0b0100) === 0) {
        // 2nd MSB NOT set means launch
        playEvent = PlayEvent.OPEN
      } else {
        // set means resume
        playEvent = PlayEvent.RESUME
      }
    } else {
      // set means closing event
      if ((logInfo & 0b0100) === 0) {
        // 2nd MSB NOT set means quit
        playEvent = PlayEvent.CLOSE
      } else {
        // set means suspend
        playEvent = PlayEvent.SUSPEND
      }
    }

    return { entryType, playEvent }
  }

  private reset(): void {
    this.entries = new Map()
  }
}
