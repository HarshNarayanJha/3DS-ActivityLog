<script lang="ts">
  import { EntryType, type PlayHistory } from "$/lib/types"
  import type { FrequencyType, ListViewType } from "$/lib/ui-types"
  import {
    findIndexRangeByDateRange,
    formatDayViewDate,
    formatMonthViewDate,
    formatWeekViewDates,
    formatYearViewDate,
    zoomIntoDateRange
  } from "$/lib/utils"
  import { DateTime, type DateTimeUnit } from "luxon"
  import LogEntryCard from "./activitylog/LogEntryCard.svelte"
  import Toolbar from "./activitylog/Toolbar.svelte"
  import N3DSButton from "./ui/N3DSButton.svelte"
  import RangedCardsList from "./activitylog/RangedCardsList.svelte"

  interface Props {
    playHistory: PlayHistory
    dates: DateTime<true>[]
    firstDate: DateTime<true>
    lastDate: DateTime<true>
    years: number[]
  }

  let { playHistory, dates, firstDate, lastDate, years }: Props = $props()

  let frequency = $state<FrequencyType>("day")
  let viewType = $state<ListViewType>("card")

  // svelte-ignore state_referenced_locally
  console.log(
    `Initializing frequency to ${frequency} and viewType to ${viewType}. Last day is ${lastDate.toString()}`
  )

  // holds the currently visible range [indexStart, indexEnd)
  // initial is the last day
  const [initialLow, initialHigh] = findIndexRangeByDateRange(
    lastDate.startOf("day"),
    lastDate.endOf("day"),
    dates
  )
  const initialSlice: [number, number] = [initialLow, initialHigh]

  console.log(`Setting initial slice to ${initialSlice} to cover lastDay`)

  let currentSlice: [number, number] = $state(initialSlice)
  let currentSliceDate: [DateTime<true>, DateTime<true>] = $state([
    dates.at(initialLow)!,
    dates.at(initialHigh - 1)!
  ])

  let currentSliceDisplay = $derived.by(() => {
    switch (frequency) {
      case "day":
        return formatDayViewDate(currentSliceDate[0])
      case "week":
        return formatWeekViewDates(currentSliceDate[0])
      case "month":
        return formatMonthViewDate(currentSliceDate[0])
      case "year":
        return formatYearViewDate(currentSliceDate[0])
    }
  })

  function onFrequencyChange(newFreq: FrequencyType) {
    const middle = zoomIntoDateRange(currentSliceDate[0], currentSliceDate[1])
    setCurrentSlice(middle)
  }

  function onViewChange(newView: ListViewType) {}

  function setCurrentSlice(start: DateTime<true>, end?: DateTime<true>) {
    if (end === undefined) {
      end = start
    }

    let unit: DateTimeUnit

    switch (frequency) {
      case "day":
        unit = "day"
        break
      case "week":
        unit = "week"
        break
      case "month":
        unit = "month"
        break
      case "year":
        unit = "year"
        break
    }

    const [rangeLow, rangeHigh] = findIndexRangeByDateRange(
      start.startOf(unit, { useLocaleWeeks: true }),
      end.endOf(unit, { useLocaleWeeks: true }),
      dates
    )

    console.log(`Setting range to ${[rangeLow, rangeHigh]} for previous day`)
    if (rangeLow === rangeHigh) {
      console.log("Both indices are equal, means it has no data on that day")
      currentSliceDate = [
        start.startOf(unit, { useLocaleWeeks: true }),
        end.endOf(unit, { useLocaleWeeks: true })
      ]
    } else {
      currentSliceDate = [dates.at(rangeLow)!, dates.at(rangeHigh - 1)!]
    }

    currentSlice = [rangeLow, rangeHigh]
  }

  function handleClickToday() {
    console.log("Today Clicked")
    const today = DateTime.now()
    setCurrentSlice(today)
  }

  function handleClickPrevSlice(nonEmpty: boolean = false) {
    console.log(`Handling prev slice click with nonEmpty=${nonEmpty}`)
    switch (frequency) {
      case "day": {
        // change to prev day
        console.log("Prev slice click for day view")
        let prevDay

        if (nonEmpty) {
          if (currentSlice[0] > 0) {
            prevDay = dates.at(currentSlice[0] - 1)!
            console.log(`Previous Non empty Day is ${prevDay.toString()}`)
          } else {
            console.log("Can't go back anymore")
            break
          }
        } else {
          const currentDay = currentSliceDate[0]
          prevDay = currentDay.minus({ hours: 24 })
          console.log(`Previous Day is ${prevDay.toString()}`)
        }

        setCurrentSlice(prevDay)
        break
      }
      case "week": {
        // change to prev week
        console.log("Prev slice click for week view")
        let prevWeek

        if (nonEmpty) {
          if (currentSlice[0] > 0) {
            prevWeek = dates.at(currentSlice[0] - 1)!
            console.log(`Previous Non empty week is ${prevWeek.toString()}`)
          } else {
            console.log("Can't go back anymore")
            break
          }
        } else {
          const currentWeek = currentSliceDate[0]
          prevWeek = currentWeek.minus({ days: 7 })
          console.log(`Previous week is ${prevWeek.toString()}`)
        }

        setCurrentSlice(prevWeek)
        break
      }
      case "month": {
        // change to prev month
        console.log("Prev slice click for month view")
        let prevMonth

        if (nonEmpty) {
          if (currentSlice[0] > 0) {
            prevMonth = dates.at(currentSlice[0] - 1)!
            console.log(`Previous Non empty month is ${prevMonth.toString()}`)
          } else {
            console.log("Can't go back anymore")
            break
          }
        } else {
          const currentMonth = currentSliceDate[0]
          prevMonth = currentMonth.minus({ month: 1 })
          console.log(`Previous month is ${prevMonth.toString()}`)
        }

        setCurrentSlice(prevMonth)
        break
      }
      case "year": {
        // change to prev year
        console.log("Prev slice click for year view")
        let prevYear

        if (nonEmpty) {
          if (currentSlice[0] > 0) {
            prevYear = dates.at(currentSlice[0] - 1)!
            console.log(`Previous Non empty year is ${prevYear.toString()}`)
          } else {
            console.log("Can't go back anymore")
            break
          }
        } else {
          const currentYear = currentSliceDate[0]
          prevYear = currentYear.minus({ year: 1 })
          console.log(`Previous year is ${prevYear.toString()}`)
        }

        setCurrentSlice(prevYear)
        break
      }
    }
  }

  function handleClickNextSlice(nonEmpty: boolean = false) {
    console.log(`Handling next slice click with nonEmpty=${nonEmpty}`)
    switch (frequency) {
      case "day": {
        // change to next day
        console.log("Next slice click for day view")
        let nextDay

        if (nonEmpty) {
          if (currentSlice[1] < dates.length) {
            nextDay = dates.at(currentSlice[1] + 1)!
            console.log(`Next Non empty Day is ${nextDay.toString()}`)
          } else {
            console.log("Can't go forward anymore")
            break
          }
        } else {
          const currentDay = currentSliceDate[1]
          nextDay = currentDay.plus({ hours: 24 })
          console.log(`Next Day is ${nextDay.toString()}`)
        }

        setCurrentSlice(nextDay)
        break
      }
      case "week": {
        // change to next week
        console.log("Next slice click for week view")
        let nextWeek

        if (nonEmpty) {
          if (currentSlice[1] < dates.length) {
            nextWeek = dates.at(currentSlice[1] + 1)!
            console.log(`Next Non empty week is ${nextWeek.toString()}`)
          } else {
            console.log("Can't go forward anymore")
            break
          }
        } else {
          const currentWeek = currentSliceDate[1]
          nextWeek = currentWeek.plus({ days: 7 })
          console.log(`Next Week is ${nextWeek.toString()}`)
        }

        setCurrentSlice(nextWeek)
        break
      }
      case "month": {
        // change to next month
        console.log("Next slice click for month view")
        let nextMonth

        if (nonEmpty) {
          if (currentSlice[1] < dates.length) {
            nextMonth = dates.at(currentSlice[1] + 1)!
            console.log(`Next Non empty month is ${nextMonth.toString()}`)
          } else {
            console.log("Can't go forward anymore")
            break
          }
        } else {
          const currentMonth = currentSliceDate[1]
          nextMonth = currentMonth.plus({ months: 1 })
          console.log(`Next Month is ${nextMonth.toString()}`)
        }

        setCurrentSlice(nextMonth)
        break
      }
      case "year": {
        // change to next year
        console.log("Next slice click for year view")
        let nextYear

        if (nonEmpty) {
          if (currentSlice[1] < dates.length) {
            nextYear = dates.at(currentSlice[1] + 1)!
            console.log(`Next Non empty year is ${nextYear.toString()}`)
          } else {
            console.log("Can't go forward anymore")
            break
          }
        } else {
          const currentYear = currentSliceDate[1]
          nextYear = currentYear.plus({ year: 1 })
          console.log(`Next year is ${nextYear.toString()}`)
        }

        setCurrentSlice(nextYear)
        break
      }
    }
  }

  $inspect(years, frequency, viewType, firstDate, lastDate, currentSlice, currentSliceDate).with(
    console.log
  )
</script>

{#if playHistory === null}
  <div>No Play History. Go play some games.</div>
{:else}
  <div class="mx-auto h-auto w-full max-w-4xl space-y-8">
    <Toolbar
      bind:frequency
      bind:viewType
      {onFrequencyChange}
      {onViewChange}
      onClickToday={handleClickToday}
    />

    <div class="flex w-full flex-row items-center justify-between">
      <N3DSButton onClick={() => handleClickPrevSlice()}>&LeftArrow;</N3DSButton>
      <div>
        {currentSliceDisplay}
      </div>
      <N3DSButton onClick={() => handleClickNextSlice()}>&RightArrow;</N3DSButton>
    </div>
    {#if viewType === "card"}
      {@const entries = playHistory
        .entries()
        .toArray()
        .slice(currentSlice[0], currentSlice[1])
        .filter(([r, entry]) => entry.entryType === EntryType.APPLICATION)}
      <RangedCardsList {entries} rangeHash={`${currentSlice[0]}-${currentSlice[1]}`} />
    {:else if viewType === "timeline"}
      {#each playHistory
        .entries()
        .toArray()
        .slice(currentSlice[0], currentSlice[1]) as [r, entry] (r)}
        <div>
          <span class="font-mono text-muted-foreground">{r - 1}</span>
          <LogEntryCard playEntry={entry} />
        </div>
      {:else}
        <div>No Data</div>
      {/each}
    {/if}
  </div>
{/if}
