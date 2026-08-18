<script lang="ts">
import { formatDayViewDate } from "$/lib/utils"
import TitleIcon from "$components/activitylog/TitleIcon.svelte"

import { Duration } from "luxon"

import type { PLDSummaryDataEntry } from "$/lib/types"

interface Props {
  summary: PLDSummaryDataEntry
}

let { summary }: Props = $props()
let {
  title,
  applet,
  summary: { playtimeSeconds, launches, firstPlayed, lastPlayed }
} = $derived(summary)

let playTimeFormatted = $derived(
  Duration.fromDurationLike({ hours: 0, minutes: 0, seconds: playtimeSeconds })
    .normalize()
    .toFormat("hh:mm")
)
let averagePlayTimeFormatted = $derived(
  Duration.fromDurationLike({ hours: 0, minutes: 0, seconds: playtimeSeconds / launches })
    .normalize()
    .toFormat("hh:mm")
)
let firstPlayedFormatted = $derived(formatDayViewDate(firstPlayed))
let lastPlayedFormatted = $derived(formatDayViewDate(lastPlayed))
</script>

<div class="flex h-full w-full flex-col items-center px-16 py-12">
  <div class="my-2 grid w-full grid-cols-[1fr_3fr] content-center items-center">
    <TitleIcon skipBorder={true} {title} {applet} alt="" size="96" />
    <div class="flex flex-col items-center text-center">
      {#if title !== undefined}
        <h3 class="text-2xl">{title.titleName}</h3>
        <h4 class="text-xl">{title.publisher}</h4>
      {:else if applet !== undefined}
        <h3 class="text-2xl">{applet.appletName}</h3>
        <h4 class="text-xl">Nintendo</h4>
      {/if}
    </div>
  </div>

  <div class="my-2 grid w-full grid-cols-2 content-start gap-2 text-xl">
    <span class="place-self-end">Play Time | </span>
    <span>{playTimeFormatted}</span>

    <span class="place-self-end">Times Played | </span>
    <span>{launches}</span>

    <span class="place-self-end">Average Play Time | </span>
    <span>{averagePlayTimeFormatted}</span>

    <span class="place-self-end">First Played | </span>
    <span>{firstPlayedFormatted}</span>

    <span class="place-self-end">Last Played | </span>
    <span>{lastPlayedFormatted}</span>
  </div>
</div>
