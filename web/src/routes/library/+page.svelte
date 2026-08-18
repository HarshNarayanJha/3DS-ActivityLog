<script lang="ts">
import { globalState as gState } from "$/lib/global.svelte"
import { goto } from "$app/navigation"
import { resolve } from "$app/paths"
import BottomScreen from "$components/landing/BottomScreen.svelte"
import TopScreen from "$components/landing/TopScreen.svelte"
import TitleGrid from "$components/titlelibrary/TitleGrid.svelte"
import TitleStatsCard from "$components/titlelibrary/TitleStatsCard.svelte"

import type { PLDSummaryDataEntry } from "$/lib/types"

$effect(() => {
  if (gState.pldSummaries === null) {
    goto(resolve("/"))
  }
})

const sortBy = $state<"playtime" | "launches" | "avg" | "firstPlayed" | "lastPlayed">("playtime")

let sortedSummaries = $derived.by(() => {
  const out = new Map<string, PLDSummaryDataEntry>()
  const summaries = gState.pldSummaries
    ?.values()
    .toArray()
    .sort((a, b) => {
      switch (sortBy) {
        case "playtime":
          return b.summary.playtimeSeconds - a.summary.playtimeSeconds
        case "launches":
          return b.summary.launches - a.summary.launches
        case "avg":
          return (
            b.summary.playtimeSeconds / b.summary.launches -
            a.summary.playtimeSeconds / a.summary.launches
          )
        case "firstPlayed":
          return b.summary.firstPlayed.toSeconds() - a.summary.firstPlayed.toSeconds()
        case "lastPlayed":
          return b.summary.lastPlayed.toSeconds() - a.summary.lastPlayed.toSeconds()
      }
    })

  if (summaries !== undefined) {
    for (const summary of summaries) {
      out.set(summary.summary.tid, summary)
    }
  }

  return out
})

let selectedTitle = $derived(sortedSummaries.keys().toArray()[0])

$inspect(selectedTitle)
</script>

<svelte:head>
  <title>Title Library | 3DS Activity Log</title>
  <meta name="description" content="3DS Activity Log Title Library" />
</svelte:head>

<div class="grid min-h-[70svh] w-full grid-cols-1 gap-4 px-16 py-24">
  <TopScreen>
    <div class="mx-auto aspect-[1.63] h-auto w-full bg-gray-50 text-neutral-800">
      {#if selectedTitle && sortedSummaries.has(selectedTitle)}
        <TitleStatsCard summary={sortedSummaries.get(selectedTitle)!} />
      {/if}
    </div>
  </TopScreen>

  <BottomScreen>
    <div class="mx-auto aspect-[1.38] h-auto w-full bg-gray-200 text-neutral-800">
      <TitleGrid titles={sortedSummaries} bind:selectedTitle />
    </div>
  </BottomScreen>
</div>
