<script lang="ts">
  import type { PlayHistory } from "$/lib/types"
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
        return formatWeekViewDates(currentSliceDate[0], currentSliceDate[1])
      case "month":
        return formatMonthViewDate(currentSliceDate[0])
      case "year":
        return formatYearViewDate(currentSliceDate[0])
    }
  })

  function onFrequencyChange(newFreq: FrequencyType) {
    const middle = zoomIntoDateRange(currentSliceDate[0], currentSliceDate[1])
    setCurrentSlice(middle)

    // switch (newFreq) {
    //   case "day": {
    //     // zoom into the middle of the current date range
    //     const middle = zoomIntoDateRange(currentSliceDate[0], currentSliceDate[1])
    //     setCurrentSlice(middle)
    //     break
    //   }
    //   case "week": {
    //     const middle = zoomIntoDateRange(currentSliceDate[0], currentSliceDate[1])
    //     setCurrentSlice(middle)
    //     break
    //   }
    //   case "month": {
    //     const middle = zoomIntoDateRange(currentSlice[0], currentSlice[1])
    //     const monthStart = dates.at(middle)!.startOf("month")
    //     const monthEnd = dates.at(middle)!.endOf("month")
    //     const [rangeLow, rangeHigh] = findIndexRangeByDateRange(monthStart, monthEnd, dates)
    //     currentSlice = [rangeLow, rangeHigh]
    //     currentSliceDate = [dates.at(rangeLow)!, dates.at(rangeHigh - 1)!]
    //     break
    //   }
    //   case "year": {
    //     const middle = zoomIntoDateRange(currentSlice[0], currentSlice[1])
    //     const yearStart = dates.at(middle)!.startOf("year", { useLocaleWeeks: true })
    //     const yearEnd = dates.at(middle)!.endOf("year")
    //     const [rangeLow, rangeHigh] = findIndexRangeByDateRange(yearStart, yearEnd, dates)
    //     currentSlice = [rangeLow, rangeHigh]
    //     currentSliceDate = [dates.at(rangeLow)!, dates.at(rangeHigh - 1)!]
    //     break
    //   }
    // }
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
  </div>
{/if}
