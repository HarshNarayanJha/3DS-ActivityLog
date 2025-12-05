<script lang="ts">
  import type { TitleStats } from "$/lib/types"
  import { formatDayViewDate } from "$/lib/utils"
  import TitleIcon from "$components/activitylog/TitleIcon.svelte"
  import { Duration } from "luxon"

  interface Props {
    titleStats: TitleStats
  }

  let { titleStats }: Props = $props()
  let { title, timesPlayed, playTime, lastPlayed, averagePlayTime, firstPlayed } =
    $derived(titleStats)

  let playTimeFormat = $derived(
    Duration.fromDurationLike({ hours: 0, minutes: 0, seconds: playTime })
      .normalize()
      .toFormat("h:m")
  )
  let averagePlayTimeFormat = $derived(
    Duration.fromDurationLike({ hours: 0, minutes: 0, seconds: averagePlayTime })
      .normalize()
      .toFormat("h:m")
  )
  let firstPlayedFormat = $derived(formatDayViewDate(firstPlayed))
  let lastPlayedFormat = $derived(formatDayViewDate(lastPlayed))
</script>

<div class="flex h-full w-full flex-col items-center px-16 py-12">
  <div class="my-2 grid w-full grid-cols-[1fr_3fr] content-center items-center">
    <TitleIcon skipBorder={true} title={titleStats.title} alt="" size="96" />
    <div class="flex flex-col items-center text-center">
      <h3 class="text-2xl">{title.titleName}</h3>
      <h4 class="text-xl">{title.publisher}</h4>
    </div>
  </div>

  <div class="my-2 grid w-full grid-cols-2 content-start gap-2 text-xl">
    <span class="place-self-end">Play Time | </span>
    <span>{playTimeFormat}</span>

    <span class="place-self-end">Times Played | </span>
    <span>{timesPlayed}</span>

    <span class="place-self-end">Average Play Time | </span>
    <span>{averagePlayTimeFormat}</span>

    <span class="place-self-end">First Played | </span>
    <span>{firstPlayedFormat}</span>

    <span class="place-self-end">Last Played | </span>
    <span>{lastPlayedFormat}</span>
  </div>
</div>
