import { DateTime } from "luxon"

import type { PLDSessionDataEntry, PLDSummaryDataEntry } from "./types"

export class GlobalState {
  pldSessions = $state<Map<number, PLDSessionDataEntry> | null>(null)
  pldSummaries = $state<Map<string, PLDSummaryDataEntry> | null>(null)

  audioSrc = $state<string | null>(null)

  isStable = $derived(this.pldSessions !== null && this.pldSummaries !== null)

  years = $derived.by(() => {
    if (this.pldSessions === null) {
      return []
    }

    const y = new Set<number>()
    this.pldSessions.forEach(({ session: { timestamp } }) => {
      y.add(timestamp.startOf("year").toSeconds())
    })

    return Array.from(y)
  })

  dates = $derived.by(() => {
    if (this.pldSessions === null) {
      return []
    }

    const s: DateTime<true>[] = []
    this.pldSessions.forEach(({ session: { timestamp } }) => {
      s.push(timestamp)
    })

    return s
  })

  firstDate = $derived(this.dates.length > 0 ? DateTime.min(...this.dates) : null)
  lastDate = $derived(this.dates.length > 0 ? DateTime.max(...this.dates) : null)

  totalTitles = $derived(this.pldSummaries?.size ?? 0)
  totalPlayTimeSeconds = $derived(
    this.pldSummaries
      ?.values()
      ?.reduce((acc, { summary: { playtimeSeconds } }) => acc + playtimeSeconds, 0) ?? 0
  )
  titles = $derived(this.pldSummaries?.keys().map((tid) => tid) ?? [])

  playStats = $derived({
    totalTitles: this.totalTitles,
    totalPlayTimeSeconds: this.totalPlayTimeSeconds,
    titles: this.titles
  })

  reset() {
    this.pldSessions = null
    this.pldSummaries = null
    this.audioSrc = null
  }
}

export const globalState = new GlobalState()
