import {
  EntryType,
  PlayEvent,
  type PlayHistory,
  type PlayStats,
  type TitleData,
  type TitleStats
} from "./types"
import { parseTimestamp } from "./utils"

type TitleParseStats = {
  playTime: number
  timesPlayed: number
  firstPlayedTimestamp: number
  lastPlayedTimestamp: number
}

export function getPlayStats(history: PlayHistory): PlayStats {
  if (!history)
    return {
      titles: new Map(),
      totalPlayTime: 0,
      totalTitles: 0
    }

  const parsingTitles = new Map<
    string,
    {
      title: TitleData
      lastOpenTimestamp: number
      lastSuspendTimestamp: number
      suspendDuration: number
      parseStats: TitleParseStats
    }
  >()

  for (const [r, { entryType, timestamp, applet, title, playEvent }] of history) {
    if (entryType === EntryType.APPLET) {
      // handle applet
      // console.debug("Entry is of type APPLET")
    } else if (entryType === EntryType.APPLICATION) {
      // handle application
      // console.debug("Entry is of type APPLICATION")

      if (!title) {
        console.error("Missing titledata for APPLICATION entry")
        continue
      }

      if (parsingTitles.has(title.tid)) {
        // get that entry
        const _entry = parsingTitles.get(title.tid)!

        // an OPEN event, title must be closed already
        if (playEvent === PlayEvent.OPEN) {
          // don't know when this happens, apart from the first launches of SYSTEM SETTINGS by Nintendo themselves
          if (_entry.lastOpenTimestamp !== -1) {
            console.error("Title is already open, cannot open")
            // suspend cleanup just in case, count this as fresh OPEN
            _entry.suspendDuration = 0
            _entry.lastSuspendTimestamp = -1
          }

          // ???
          if (_entry.lastSuspendTimestamp !== -1) {
            console.error("Title is already suspended, cannot open")
            // suspend cleanup just in case, count this as fresh OPEN
            _entry.suspendDuration = 0
            _entry.lastSuspendTimestamp = -1
          }

          _entry.lastOpenTimestamp = timestamp
          _entry.parseStats.timesPlayed++
          _entry.parseStats.lastPlayedTimestamp = timestamp

          // a CLOSE event, title must be open already
        } else if (playEvent === PlayEvent.CLOSE) {
          // This is again the first system settings launch, and some Unknown homebrew applications
          if (_entry.lastOpenTimestamp === -1) {
            console.error("Title was not open, cannot close")
            // cleanup to count this as clean close
            _entry.lastSuspendTimestamp = -1
            _entry.suspendDuration = 0
          } else {
            // title was OPEN
            _entry.parseStats.playTime += timestamp - _entry.lastOpenTimestamp

            // normal flow is SUSPEND -> CLOSE
            if (_entry.lastSuspendTimestamp !== -1) {
              _entry.suspendDuration += timestamp - _entry.lastSuspendTimestamp
              _entry.lastSuspendTimestamp = -1
            }

            // if has some suspendDuration
            if (_entry.suspendDuration > 0) {
              _entry.parseStats.playTime -= _entry.suspendDuration
              _entry.suspendDuration = 0
            }

            _entry.lastOpenTimestamp = -1
          }

          // a SUSPEND event, must be playing
        } else if (playEvent === PlayEvent.SUSPEND) {
          // ???
          if (_entry.lastOpenTimestamp === -1) {
            console.error("Title was not opened, cannot suspend")
            // count this much of duration or not?
          } else {
            // suspend while suspend, ignore, let it be the older time
            if (_entry.lastSuspendTimestamp !== -1) {
              console.error("Title is already suspended, cannot suspend")
            } else {
              _entry.lastSuspendTimestamp = timestamp
            }
          }

          // a RESUME event, must be suspended and playing
        } else if (playEvent === PlayEvent.RESUME) {
          // ???
          if (_entry.lastOpenTimestamp === -1) {
            console.error("Title was not opened, cannot resume")
          } else {
            // ???
            if (_entry.lastSuspendTimestamp === -1) {
              console.error("Title is not suspended, cannot resume")
            } else {
              // set the suspendDuration
              _entry.suspendDuration += timestamp - _entry.lastSuspendTimestamp
              _entry.lastSuspendTimestamp = -1
            }
          }
        } else {
          console.error("Invalid play event for APPLICATION entry")
        }
      } else {
        //
        // first time seeing this title
        if (playEvent === PlayEvent.OPEN) {
          //
          // must be OPEN for the first time
          parsingTitles.set(title.tid, {
            lastOpenTimestamp: timestamp,
            lastSuspendTimestamp: -1,
            suspendDuration: 0,
            title,
            parseStats: {
              playTime: 0,
              timesPlayed: 1,
              firstPlayedTimestamp: timestamp,
              lastPlayedTimestamp: timestamp
            }
          })
        } else {
          console.error("First log of APPLICATION entry is not OPEN, skipping")
          continue
        }
      }
    } else {
      // console.debug("Skipping non APPLET or APPLICATION entry")
    }
  }

  // console.log(titles)

  const titles = new Map<string, TitleStats>()

  for (const [tid, title] of parsingTitles) {
    const { firstPlayedTimestamp, lastPlayedTimestamp, playTime, timesPlayed } = title.parseStats
    const averagePlayTime = playTime / timesPlayed

    titles.set(tid, {
      averagePlayTime,
      firstPlayed: parseTimestamp(firstPlayedTimestamp),
      lastPlayed: parseTimestamp(lastPlayedTimestamp),
      playTime,
      timesPlayed,
      title: title.title
    })
  }

  return {
    titles: titles,
    totalPlayTime: titles.values().reduce((acc, title) => acc + title.playTime, 0),
    totalTitles: titles.size
  }
}
