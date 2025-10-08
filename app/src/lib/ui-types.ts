export type FrequencyType = "day" | "week" | "month" | "year"
export type ListViewType = "card" | "timeline"

export interface FrequencyChoice {
  value: FrequencyType
  label: string
  ariaLabel: string
}

export interface ListViewChoice {
  value: ListViewType
  label: string
  ariaLabel: string
}

export const MUSIC_MAP = {
  HOME: "https://vgmtreasurechest.com/soundtracks/nintendo-3ds-background-music/ojgeaqbl/02.%20Home%20Menu.mp3",
  ACTIVITY_LOG:
    "https://vgmtreasurechest.com/soundtracks/nintendo-3ds-background-music/vejhlhey/36.%20Activity%20Log%20-%20Main%20Theme.mp3"
}

export const SFX_MAP = {
  ACTIVITY_LOG_BANNER:
    "https://vgmtreasurechest.com/soundtracks/nintendo-3ds-background-music/bfzfdznr/77.%20%28Banner%29%20Activity%20Log.mp3"
}
