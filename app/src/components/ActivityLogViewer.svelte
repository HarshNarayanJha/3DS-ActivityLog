<script lang="ts">
  import type { PlayHistory } from "$/lib/types"
  import type { FrequencyType, ListViewType } from "$/lib/ui-types"
  import {
    findIndexRangeByDateRange,
    formatDayViewDate,
    formatMonthViewDate,
    formatWeekViewDates,
    formatYearViewDate,
    zoomIntoRange
  } from "$/lib/utils"
  import type { DateTime } from "luxon"
  import LogEntryCard from "./activitylog/LogEntryCard.svelte"
  import Toolbar from "./activitylog/Toolbar.svelte"
  import N3DSButton from "./ui/N3DSButton.svelte"

  interface Props {
    playHistory: PlayHistory
    dates: DateTime<true>[]
    firstDate: DateTime<true> | null
    lastDate: DateTime<true> | null
    years: number[]
  }

  let { playHistory, dates, firstDate, lastDate, years }: Props = $props()

  let frequency = $state<FrequencyType>("day")
  let viewType = $state<ListViewType>("card")

  // holds the currently visible range [indexStart, indexEnd)
  // initial it's the last day
  const [initialLow, initialHigh] = findIndexRangeByDateRange(
    lastDate!.startOf("day"),
    lastDate!.endOf("day"),
    dates
  )
  const initialSlice: [number, number] = [initialLow, initialHigh]

  let currentSlice: [number, number] = $state(initialSlice)

  function onFrequencyChange(newFreq: FrequencyType) {
    switch (newFreq) {
      case "day": {
        // zoom into the middle of the current range
        // TODO: decide if by index or by date
        const middle = zoomIntoRange(currentSlice[0], currentSlice[1])
        const dayStart = dates.at(middle)!.startOf("day")
        const dayEnd = dates.at(middle)!.endOf("day")
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(dayStart, dayEnd, dates)
        currentSlice = [middle, middle]
        break
      }
      case "week": {
        const middle = zoomIntoRange(currentSlice[0], currentSlice[1])
        const weekStart = dates.at(middle)!.startOf("week", { useLocaleWeeks: true })
        const weekEnd = dates.at(middle)!.endOf("week", { useLocaleWeeks: true })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(weekStart, weekEnd, dates)
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "month": {
        const middle = zoomIntoRange(currentSlice[0], currentSlice[1])
        const monthStart = dates.at(middle)!.startOf("month")
        const monthEnd = dates.at(middle)!.endOf("month")
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(monthStart, monthEnd, dates)
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "year": {
        const middle = zoomIntoRange(currentSlice[0], currentSlice[1])
        const yearStart = dates.at(middle)!.startOf("year", { useLocaleWeeks: true })
        const yearEnd = dates.at(middle)!.endOf("year")
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(yearStart, yearEnd, dates)
        currentSlice = [rangeLow, rangeHigh]
        break
      }
    }
  }

  function onViewChange(newView: ListViewType) {}

  function handleClickPrevSlice() {
    switch (frequency) {
      case "day": {
        // change to next day
        const currentDay = dates.at(currentSlice[0])!
        const prevDay = currentDay.minus({ days: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          prevDay.startOf("day"),
          prevDay.plus({ days: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "week": {
        // change to next week
        const currentWeek = dates.at(currentSlice[0])!
        const prevWeek = currentWeek.minus({ weeks: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          prevWeek.startOf("week"),
          prevWeek.plus({ weeks: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "month": {
        // change to next month
        const currentMonth = dates.at(currentSlice[0])!
        const prevMonth = currentMonth.minus({ months: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          prevMonth.startOf("month"),
          prevMonth.plus({ months: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "year": {
        // change to next year
        const currentYear = dates.at(currentSlice[0])!
        const prevYear = currentYear.minus({ years: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          prevYear.startOf("year"),
          prevYear.plus({ years: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
    }
  }

  function handleClickNextSlice() {
    switch (frequency) {
      case "day": {
        // change to next day
        const currentDay = dates.at(currentSlice[1])!
        const nextDay = currentDay.plus({ days: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          nextDay.startOf("day"),
          nextDay.plus({ days: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "week": {
        // change to next week
        const currentWeek = dates.at(currentSlice[1])!
        const nextWeek = currentWeek.plus({ weeks: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          nextWeek.startOf("week"),
          nextWeek.plus({ weeks: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "month": {
        // change to next month
        const currentMonth = dates.at(currentSlice[1])!
        const nextMonth = currentMonth.plus({ months: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          nextMonth.startOf("month"),
          nextMonth.plus({ months: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
      case "year": {
        // change to next year
        const currentYear = dates.at(currentSlice[1])!
        const nextYear = currentYear.plus({ years: 1 })
        const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
          nextYear.startOf("year"),
          nextYear.plus({ years: 1 }),
          dates
        )
        currentSlice = [rangeLow, rangeHigh]
        break
      }
    }
  }

  $inspect(years, frequency, viewType, firstDate, lastDate, currentSlice).with(console.log)
</script>

{#if playHistory === null}{:else}{/if}

<div class="mx-auto h-auto w-full max-w-4xl space-y-8">
  <Toolbar bind:frequency bind:viewType {onFrequencyChange} {onViewChange} />

  <div class="flex w-full flex-row items-center justify-between">
    <N3DSButton onclick={handleClickPrevSlice} disabled={currentSlice[0] === 0}>
      &LeftArrow;
    </N3DSButton>
    <div>
      {#if frequency === "day"}
        {formatDayViewDate(dates.at(currentSlice[0])!)}
      {:else if frequency === "week"}
        {formatWeekViewDates(dates.at(currentSlice[0])!, dates.at(currentSlice[1])!)}
      {:else if frequency === "month"}
        {formatMonthViewDate(dates.at(currentSlice[0])!)}
      {:else if frequency === "year"}
        {formatYearViewDate(dates.at(currentSlice[0])!)}
      {/if}
    </div>
    <N3DSButton onclick={handleClickNextSlice} disabled={currentSlice[1] === dates.length - 1}>
      &RightArrow;
    </N3DSButton>
  </div>
  {#each playHistory.entries().toArray().slice(currentSlice[0], currentSlice[1]) as [r, entry] (r)}
    <LogEntryCard playEntry={entry} />
  {/each}
</div>
