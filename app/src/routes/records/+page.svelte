<script lang="ts">
  import ActivityLogViewer from "$components/ActivityLogViewer.svelte"
  import { globalState as gState } from "$/lib/global.svelte"
  import { browser } from "$app/environment"
  import { goto } from "$app/navigation"
  import { resolve } from "$app/paths"

  if (browser) {
    if (gState.playStats === null) {
      goto(resolve("/"))
    }
  }
</script>

<svelte:head></svelte:head>

<div class="grid min-h-[70svh] w-full grid-cols-1 gap-4 px-16 py-24">
  <ActivityLogViewer
    playHistory={gState.playHistory!}
    dates={gState.dates}
    firstDate={gState.firstDate!}
    lastDate={gState.lastDate!}
    years={gState.years}
  />
</div>
