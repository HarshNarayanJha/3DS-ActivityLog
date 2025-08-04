import { DateTime } from "luxon"

/**
 *
 * @param timestamp UNIX timestamp in seconds
 * @returns A parsed DateTime object in Asia/Kolkata tz, if valid. Have to make tz user configurable
 */
export const parseTimestamp = (timestamp: number) => {
  const dt = DateTime.fromSeconds(timestamp, { zone: "Asia/Kolkata" })
  if (!dt.isValid) throw new Error(`Invalid datetime: ${dt.invalidReason}`)
  return dt
}

/**
 *
 * @param timestamp UNIX timestamp in seconds
 * @returns DateTime formatted in locale string with DATETIME_MED_WITH_WEEKDAY
 */
export const formatTimestamp = (timestamp: number) => {
  return parseTimestamp(timestamp).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
}

/**
 *
 * @param date DateTime object to format
 * @returns A day level formatted locale string with DATE_MED_WITH_WEEKDAY
 */
export const formatDayViewDate = (date: DateTime<true>) => {
  return date.startOf("day").toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
}

/**
 *
 * @param date DateTime object to format
 * @returns A week level formatted locale string with DATE_MED_WITH_WEEKDAY
 */
export const formatWeekViewDates = (date: DateTime<true>) => {
  const start = date
    .startOf("week", { useLocaleWeeks: true })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const end = date
    .endOf("week", { useLocaleWeeks: true })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  return `${start} - ${end}`
}

/**
 *
 * @param date DateTime object to format
 * @returns A month level formatted locale string with month and year
 */
export const formatMonthViewDate = (date: DateTime<true>) => {
  return `${date.startOf("month").toLocaleString({ month: "long", year: "numeric" })}`
}

/**
 *
 * @param date DateTime object to format
 * @returns A year level formatted locale string with year
 */
export const formatYearViewDate = (date: DateTime<true>) => {
  return `${date.startOf("year").toLocaleString({ year: "numeric" })}`
}

/**
 * Zooms into an date range, in the middle
 * @param leftDate The left date
 * @param rightDate The right date
 * @returns The mid-way date
 */
export function zoomIntoDateRange(
  leftDate: DateTime<true>,
  rightDate: DateTime<true>
): DateTime<true> {
  const mid = DateTime.fromSeconds((leftDate.toSeconds() + rightDate.toSeconds()) / 2)
  if (!mid.isValid) throw new Error(`Invalid datetime ${mid.invalidReason}`)
  return mid
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
  if (end.toSeconds() < dates.at(0)!.toSeconds()) {
    // if out of range
    return [0, 0]
  }
  if (start.toSeconds() > dates.at(-1)!.toSeconds()) {
    // if out of range
    return [dates.length, dates.length]
  }

  let left = 0
  let right = dates.length - 1
  let rangeLow = 0

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (dates[mid].toSeconds() < start.toSeconds()) {
      left = mid + 1
      rangeLow = left
    } else {
      right = mid - 1
    }
  }

  left = 0
  right = dates.length - 1
  let rangeHigh = dates.length

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (dates[mid].toSeconds() <= end.toSeconds()) {
      left = mid + 1
    } else {
      right = mid - 1
      rangeHigh = right + 1
    }
  }

  return [rangeLow, rangeHigh]
}
