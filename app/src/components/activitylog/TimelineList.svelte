<script lang="ts">
  import type { PlayEntry } from "$/lib/types"
  import TimelineCard from "./TimelineCard.svelte"

  interface Props {
    entries: Array<[number, PlayEntry]>
    rangeHash: string
  }

  let { entries, rangeHash }: Props = $props()
</script>

<div class="mx-auto">
  {#each entries as [r, entry] (r)}
    <TimelineCard {entry} />
  {:else}
    <div>No Data</div>
  {/each}
</div>
