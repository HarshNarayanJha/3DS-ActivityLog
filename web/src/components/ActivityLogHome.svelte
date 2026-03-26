<script lang="ts">
  import { DateTime, Duration } from "luxon"
  import BottomScreen from "./landing/BottomScreen.svelte"
  import TopScreen from "./landing/TopScreen.svelte"
  import ActivityHomeCard from "./ui/ActivityHomeCard.svelte"
  import { resolve } from "$app/paths"
  import type { PlayStats } from "$/lib/types"

  interface Props {
    playStats: PlayStats
  }

  let { playStats }: Props = $props()

  let today = DateTime.now().toFormat("cccc, MMMM d, yyyy")
  let { totalTitles, totalPlayTime, titles } = $derived(playStats)
  let totalPlayTimeHuman = $derived(
    Duration.fromDurationLike({ seconds: totalPlayTime })
      .rescale()
      .toHuman({ showZeros: false, unitDisplay: "narrow" })
  )

  $inspect(playStats)
</script>

<TopScreen>
  <div class="mx-auto flex aspect-[1.63] h-auto w-full flex-col bg-gray-50 p-4 text-neutral-800">
    <div class="self-end py-2">
      <h2 class="text-3xl font-semibold text-emerald-600">Activity Log</h2>
    </div>
    <hr class="my-4 h-px w-full bg-gray-200" />

    <div class="flex flex-col items-center">
      <h4 class="me-8 mb-8 self-end text-2xl">{today}</h4>
      <p class="mb-8 text-2xl">Player's Records</p>

      <p class="text-xl">Titles Played</p>
      <p class="text-2xl">{totalTitles}</p>

      <p class="text-xl">Time Played</p>
      <p class="text-2xl">{totalPlayTimeHuman}</p>
    </div>
  </div>
</TopScreen>

<BottomScreen>
  <div class="mx-auto aspect-[1.38] h-auto w-full bg-gray-200 text-neutral-800">
    <div class="flex h-full w-full flex-col items-center p-4">
      <ActivityHomeCard class="self-start">
        <a href={resolve("/records")}>
          <div
            class="grid h-full w-full grid-cols-[1fr_3fr] items-center justify-items-center gap-8"
          >
            <span id="icon" class="h-20 w-20 bg-green-500">Icon</span>
            <span class="text-center text-3xl font-medium"> Daily <br /> Records </span>
          </div>
        </a>
      </ActivityHomeCard>

      <ActivityHomeCard class="self-end">
        <a href={resolve("/library")}>
          <div
            class="grid h-full w-full grid-cols-[1fr_3fr] items-center justify-items-center gap-8"
          >
            <span id="icon" class="h-20 w-20 bg-green-500">Icon</span>
            <span class="text-center text-3xl font-medium"> Software <br /> Library </span>
          </div>
        </a>
      </ActivityHomeCard>
    </div>
  </div>
</BottomScreen>
