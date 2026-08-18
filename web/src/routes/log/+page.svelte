<script lang="ts">
import { globalState, globalState as gState } from "$/lib/global.svelte"
import { MUSIC_MAP } from "$/lib/ui-types"
import { goto } from "$app/navigation"
import { resolve } from "$app/paths"
import ActivityLogHome from "$components/ActivityLogHome.svelte"
import BottomScreen from "$components/landing/BottomScreen.svelte"
import TopScreen from "$components/landing/TopScreen.svelte"

import { DateTime, Duration } from "luxon"

$effect(() => {
  if (!gState.isStable) {
    goto(resolve("/"))
  }
})

gState.audioSrc = MUSIC_MAP.ACTIVITY_LOG

let today = DateTime.now().toFormat("cccc, MMMM d, yyyy")
let { totalTitles, totalPlayTimeSeconds, titles } = $derived(globalState.playStats)

let totalPlayTimeHuman = $derived(
  Duration.fromDurationLike({ seconds: totalPlayTimeSeconds })
    .rescale()
    .toHuman({ showZeros: false, unitDisplay: "narrow" })
)

$inspect(globalState.playStats).with(console.log)
</script>

<svelte:head>
  <title>Activity Log Home | 3DS Activity Log</title>
  <meta name="description" content="3DS Activity Log Home" />
</svelte:head>

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
  <ActivityLogHome />
</BottomScreen>
