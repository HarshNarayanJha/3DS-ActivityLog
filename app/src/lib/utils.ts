import { DateTime } from "luxon"

export const parseTimestamp = (timestamp: number) => {
  const dt = DateTime.fromSeconds(timestamp)
  if (!dt.isValid) throw new Error(`Invalid datetime: ${dt.invalidReason}`)
  return dt
}

export const formatTimestamp = (timestamp: number) => {
  return parseTimestamp(timestamp).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
}

export const formatDayViewDate = (date: DateTime) => {
  return date.startOf("day").toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
}

export const formatWeekViewDates = (date0: DateTime, date1: DateTime) => {
  const start = date0
    .startOf("week", { useLocaleWeeks: true })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const end = date1
    .endOf("week", { useLocaleWeeks: true })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  return `${start} - ${end}`
}

export const formatMonthViewDate = (date: DateTime) => {
  return `${date.startOf("month").toLocaleString({ month: "long", year: "numeric" })}`
}

export const formatYearViewDate = (date: DateTime) => {
  return `${date.startOf("year").toLocaleString({ year: "numeric" })}`
}

/**
 * Zooms into an index range, in the middle
 * FIXME: has a few bugs with small ranges
 * @param leftIndex The left index
 * @param rightIndex The right index
 * @returns
 */
export function zoomIntoRange(leftIndex: number, rightIndex: number) {
  return Math.floor((leftIndex + rightIndex) / 2)
}

/**
 * Returns the index range [start, end) based on the start and end datetime passed
 * @param start The start datetime to look for. Start index will be such that it is at least that datetime at that index.
 * @param end The end datetime to look for. End index will be such that it is at most that datetime at that index.
 * @param dates The array of dates to search in
 */
export function findIndexRangeByDateRange(
  start: DateTime<true>,
  end: DateTime<true>,
  dates: DateTime<true>[]
): [number, number] {
  const rangeLow = dates.findIndex((d) => d.toSeconds() >= start.toSeconds())
  const rangeHigh = dates.findLastIndex((d) => d.toSeconds() <= end.toSeconds())

  return [rangeLow === -1 ? 0 : rangeLow, rangeHigh === -1 ? dates.length : rangeHigh]
}
