<script lang="ts">
  import BottomScreen from "$components/landing/BottomScreen.svelte"
  import TopScreen from "$components/landing/TopScreen.svelte"
  import { globalState as gState } from "$/lib/global.svelte"
  import TitleGrid from "$components/titlelibrary/TitleGrid.svelte"
  import { goto } from "$app/navigation"
  import { resolve } from "$app/paths"
  import { browser } from "$app/environment"
  import TitleStatsCard from "$components/titlelibrary/TitleStatsCard.svelte"
  import type { TitleStats } from "$/lib/types"

  if (browser) {
    if (gState.playStats === null) {
      goto(resolve("/"))
    }
  }

  let selectedTitle = $state(gState.playStats?.titles.keys().toArray()[0])

  $inspect(selectedTitle)
</script>

<svelte:head>
  <title>Title Library | 3DS Activity Log</title>
  <meta name="description" content="3DS Activity Log Title Library" />
</svelte:head>

<div class="grid min-h-[70svh] w-full grid-cols-1 gap-4 px-16 py-24">
  <TopScreen>
    <div class="mx-auto aspect-[1.63] h-auto w-full bg-gray-50">
      {#if selectedTitle && gState.playStats && gState.playStats.titles.has(selectedTitle)}
        <TitleStatsCard titleStats={gState.playStats?.titles.get(selectedTitle!)!} />
      {/if}
    </div>
  </TopScreen>

  <BottomScreen>
    <div class="mx-auto aspect-[1.38] h-auto w-full bg-gray-200">
      <TitleGrid titles={gState.playStats?.titles ?? new Map()} bind:selectedTitle />
    </div>
  </BottomScreen>
</div>
