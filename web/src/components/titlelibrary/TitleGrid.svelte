<script lang="ts">
import TitleIcon from "$components/activitylog/TitleIcon.svelte"

import type { PLDSummaryDataEntry } from "$/lib/types"

interface Props {
  titles: Map<string, PLDSummaryDataEntry>
  selectedTitle: string | undefined
}

let { titles, selectedTitle = $bindable() }: Props = $props()
</script>

<div class="grid w-auto grid-flow-col grid-rows-4 gap-x-4 gap-y-0 overflow-x-scroll px-4 py-2">
  {#each titles as [tid, entry] (tid)}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class={["rounded-md p-2", selectedTitle === tid && "bg-emerald-500 "]}
      onclick={() => {
        selectedTitle = tid
      }}>
      <TitleIcon skipBorder={true} title={entry.title} applet={entry.applet} alt="" size="64" />
    </div>
  {:else}
    <p>Your Title Library is empty.</p>
    <p>Go play some games</p>
  {/each}
</div>
