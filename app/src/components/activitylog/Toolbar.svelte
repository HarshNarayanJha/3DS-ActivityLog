<script lang="ts">
  import type { FrequencyChoice, FrequencyType, ListViewChoice, ListViewType } from "$/lib/ui-types"
  import N3DSButton from "$components/ui/N3DSButton.svelte"
  import { Toolbar } from "bits-ui"

  interface Props {
    frequency: FrequencyType
    viewType: ListViewType
    onFrequencyChange?: (newFreq: FrequencyType) => void
    onViewChange?: (newView: ListViewType) => void
    onClickToday: () => void
  }

  let {
    frequency = $bindable("day"),
    viewType = $bindable("card"),
    onFrequencyChange,
    onViewChange,
    onClickToday
  }: Props = $props()

  const frequencies: FrequencyChoice[] = [
    { value: "year", ariaLabel: "Yearly", label: "Y" },
    { value: "month", ariaLabel: "Monthly", label: "M" },
    { value: "week", ariaLabel: "Weekly", label: "W" },
    { value: "day", ariaLabel: "Daily", label: "D" }
  ]

  const viewTypes: ListViewChoice[] = [
    { value: "card", ariaLabel: "Card View", label: "C" },
    { value: "timeline", ariaLabel: "Timeline View", label: "T" }
  ]

  const getFrequency = () => frequency
  const setFrequency = (value: string) => {
    if (value) frequency = value as FrequencyType
  }

  const getViewType = () => viewType
  const setViewType = (value: string) => {
    if (value) viewType = value as ListViewType
  }

  const handleFrequencyChange = (value: string) => {
    if (value) onFrequencyChange?.(value as FrequencyType)
  }

  const handleViewTypeChange = (value: string) => {
    if (value) onViewChange?.(value as ListViewType)
  }
</script>

<div class="grid w-full grid-cols-3 items-center justify-items-center">
  <Toolbar.Root
    class="flex h-12 min-w-max items-center justify-center justify-self-start rounded-10px border border-border bg-background-alt px-[4px] py-1 shadow-mini"
  >
    <Toolbar.Group
      bind:value={getFrequency, setFrequency}
      type="single"
      class="flex items-center gap-x-0.5"
      onValueChange={handleFrequencyChange}
    >
      {#each frequencies as { value, label, ariaLabel } (value)}
        <Toolbar.GroupItem
          aria-label={ariaLabel}
          {value}
          class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-[0.98] active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
        >
          {label}
        </Toolbar.GroupItem>
      {/each}
    </Toolbar.Group>
  </Toolbar.Root>

  <N3DSButton onClick={onClickToday}>Today</N3DSButton>

  <Toolbar.Root
    class="flex h-12 min-w-max items-center justify-center justify-self-end rounded-10px border border-border bg-background-alt px-[4px] py-1 shadow-mini"
  >
    <Toolbar.Group
      bind:value={getViewType, setViewType}
      type="single"
      class="flex items-center gap-x-0.5"
      onValueChange={handleViewTypeChange}
    >
      {#each viewTypes as { value, label, ariaLabel } (value)}
        <Toolbar.GroupItem
          aria-label={ariaLabel}
          {value}
          class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-[0.98] active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
        >
          {label}
        </Toolbar.GroupItem>
      {/each}
    </Toolbar.Group>
  </Toolbar.Root>
</div>
