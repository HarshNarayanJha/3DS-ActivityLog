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
