import { EntryType, type PlayEntry, PlayEvent, type PlayHistory, SystemEvent } from "./types"

export class PlayHistoryParser {
  private entries: PlayHistory = new Map()

  public parse(input: string): PlayHistory {
    this.reset()

    const lines = input.trim().split("\n")

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

      this.entries.set(record, {
        tid: tid.trim(),
        titleName: "TITLE NAME",
        publisher: "PUBLISHER",
        serial: "CTR-XYZ",
        region: "USA",
        trimmedSizeBytes: 12345,
        entryType,
        playEvent,
        systemEvent,
        timestamp
      })
    }

    return this.entries
  }

  private handleEvent(
    tid: string,
    logInfo: number
  ): { entryType: EntryType; playEvent?: PlayEvent; systemEvent?: SystemEvent } {
    if (tid.toLowerCase().trim() === "ffffffffffffffff") {
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
