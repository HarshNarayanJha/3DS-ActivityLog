<script lang="ts">
  import type { PlayHistory } from "$/lib/types"
  import { formatTimestamp, parseTimestamp } from "$/lib/utils"
  import { Slider } from "bits-ui"
  import { parse } from "svelte/compiler"

  interface Props {
    playHistory: PlayHistory
  }

  let { playHistory }: Props = $props()

  let years = $derived.by(() => {
    const s = new Set<number>()
    playHistory.forEach((h) => {
      s.add(new Date(parseTimestamp(h.timestamp).getUTCFullYear(), 0, 1).getTime() / 1000)
    })

    return s
  })

  let dates = $derived.by(() => {
    const s: Date[] = []
    playHistory.forEach((h) => {
      s.push(parseTimestamp(h.timestamp))
    })

    return s
  })

  let firstDate = $derived(dates.at(0))
  let lastDate = $derived(dates.at(-1))

  let value = $state((lastDate?.getTime() ?? 0) / 1000)

  $inspect(years, firstDate, lastDate, value).with(console.log)
</script>

<div class="w-full max-w-full">
  <Slider.Root
    type="single"
    step={60}
    min={(firstDate?.getTime() ?? 0) / 1000}
    max={(lastDate?.getTime() ?? 0) / 1000}
    bind:value
    class="relative flex w-full touch-none items-center select-none"
    trackPadding={0}
  >
    <span class="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-dark-10">
      <Slider.Range class="absolute h-full bg-foreground" />
    </span>
    <Slider.Thumb
      index={0}
      class="z-5 block size-[25px] cursor-pointer rounded-full border border-border-input bg-background shadow-sm transition-colors hover:border-dark-40 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:scale-[0.98] data-active:border-dark-40 dark:bg-foreground dark:shadow-card"
    />
    {#each Array.from(years).entries() as [index, value] (index)}
      <Slider.Tick {index} class="z-1 h-2 w-px bg-background dark:bg-background" />
      <Slider.TickLabel
        {index}
        class="mb-5 text-sm leading-none font-medium text-muted-foreground data-selected:text-foreground"
      >
        {parseTimestamp(value).getUTCFullYear()}
      </Slider.TickLabel>
    {/each}
  </Slider.Root>
</div>
