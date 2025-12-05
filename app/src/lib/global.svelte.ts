import { DateTime } from "luxon"
import type { PlayHistory, PlayStats } from "./types"
import { parseTimestamp } from "./utils"
import { getPlayStats } from "./stats"

export class GlobalState {
  playHistory = $state<PlayHistory | null>(null)
  playStats = $state<PlayStats | null>(null)
  audioSrc = $state<string | null>(null)

  isStable = $derived(this.playHistory !== null && this.playStats !== null)

  years = $derived.by(() => {
    if (this.playHistory === null) {
      return []
    }

    const s = new Set<number>()
    this.playHistory.forEach((h) => {
      s.add(parseTimestamp(h.timestamp).startOf("year").toSeconds())
    })

    return Array.from(s)
  })

  dates = $derived.by(() => {
    if (this.playHistory === null) {
      return []
    }

    const s: DateTime<true>[] = []
    this.playHistory.forEach((h) => {
      s.push(parseTimestamp(h.timestamp))
    })

    return s
  })

  firstDate = $derived(DateTime.min(...this.dates) ?? null)
  lastDate = $derived(DateTime.max(...this.dates) ?? null)

  buildPlayStats() {
    if (!this.playHistory) {
      this.playStats = null
      return
    }

    console.debug("Begin to generate play statistics from history")
    this.playStats = getPlayStats(this.playHistory)
    console.debug("Done generating play statistics from history")
  }

  reset() {
    this.playHistory = null
    this.playStats = null
    this.audioSrc = null
  }
}

export const globalState = new GlobalState()
