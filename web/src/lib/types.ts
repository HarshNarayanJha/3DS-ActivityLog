import type { DateTime } from "luxon"

/** PTM playhistory.csv parsing */

export enum PlayEvent {
  OPEN,
  CLOSE,
  RESUME,
  SUSPEND
}

export enum EntryType {
  APPLET,
  APPLICATION,
  SYSTEM
}

export enum SystemEvent {
  DSI_START = 0b0000,
  DSI_END = 0b0001,
  UNKNOWN_UPDATER = 0b0111,
  SLEEP_START = 0b1000,
  SLEEP_END = 0b1001,
  N3DS_SERVICES_STOPPED = 0b1010,
  SYSTEM_CLOCK_CHANGE_START = 0b1011,
  SYSTEM_CLOCK_CHANGE_END = 0b1100
}

export type Region =
  | "North America"
  | "Europe"
  | "Japan"
  | "China"
  | "Korea"
  | "Taiwan"
  | "Australia"
  | "Canada"
  | "Region Free"
  | "Digital Demos"

export interface TitleData {
  tid: string
  uid: string
  titleName: string
  description?: string
  releaseDate?: Date
  publisher: string
  serial: string
  platform?: string
  region: Region
  trimmedSizeBytes: number
  genres?: Array<string>
  iconUrl?: string
  bannerUrl?: string
  boxArtUrl?: string
}

export interface AppletData {
  tid: string
  appletName: string
  serial: string
  regions: Array<"USA" | "EUR" | "JPN" | "CHN" | "KOR" | "TWN">
}

export type PlayEntry = {
  title?: TitleData
  applet?: AppletData
  entryType: EntryType
  playEvent?: PlayEvent
  systemEvent?: SystemEvent
  timestamp: number
}

/**
 * Used for the 3DS Cards Activity View
 */
export interface TitleInfo {
  key: string
  title: TitleData
  playTime: number
}

export type PlayHistory = Map<number, PlayEntry>

export type TitleStats = {
  title: TitleData
  playTime: number
  timesPlayed: number
  averagePlayTime: number
  firstPlayed: DateTime
  lastPlayed: DateTime
}

export type PlayStats = {
  totalTitles: number
  totalPlayTime: number
  titles: Map<string, TitleStats>
}

/** PLD.dat (pld_sessions.csv and pld_summary.csv parsing) */

/**
 * Each session entry of pld.dat sessions
 * @field tid - Title ID
 * @field timestamp - Session timestamp YYYY-MM-DDTHH:00 (hour scoped)
 * @field playtimeSeconds - Playtime in seconds (within that hour window, 0-3600)
 */
export type PLDSession = {
  tid: string
  timestamp: DateTime<true>
  playtimeSeconds: number
}

export type PLDSessionDataEntry = {
  title?: TitleData
  applet?: AppletData
  session: PLDSession
}

/**
 * Each entry of pld.dat title level summaries
 * @field tid - Title ID
 * @field playtimeSeconds - Total playtime in seconds (lifetime)
 * @field launches - Total number of launches (lifetime)
 * @field firstPlayed - First play timestamp (YYYY-MM-DD)
 * @field lastPlayed - Last play timestamp (YYYY-MM-DD)
 */
export type PLDSummary = {
  tid: string
  playtimeSeconds: number
  launches: number
  firstPlayed: DateTime<true>
  lastPlayed: DateTime<true>
}

export type PLDSummaryDataEntry = {
  title?: TitleData
  applet?: AppletData
  summary: PLDSummary
}
