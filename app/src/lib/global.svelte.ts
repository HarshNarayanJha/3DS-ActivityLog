import { DateTime } from "luxon"
import type { PlayHistory } from "./types"
import { parseTimestamp } from "./utils"

export class GlobalState {
  playHistory = $state<PlayHistory | null>(null)

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

  reset() {
    this.playHistory = null
  }
}

export const globalState = new GlobalState()
