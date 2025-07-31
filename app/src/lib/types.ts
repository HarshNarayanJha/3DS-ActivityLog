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

export interface PlayEntry {
  title?: TitleData
  applet?: AppletData
  entryType: EntryType
  playEvent?: PlayEvent
  systemEvent?: SystemEvent
  timestamp: number
}

export type PlayHistory = Map<number, PlayEntry>
