<script lang="ts">
interface Props {
  time?: string
  date?: string
  playCoins?: number
  batteryLevel?: 1 | 2 | 3 | 4
  internet?: "Internet" | "StreetPass" | "None"
}

let {
  time = "12:00",
  date = "1/1",
  playCoins = 0,
  batteryLevel = 4,
  internet = "Internet"
}: Props = $props()
</script>

<div
  class="flex h-8 w-full items-center justify-between border-b border-black/5 bg-black/10 px-2 font-sans text-xs font-bold text-foreground shadow-sm backdrop-blur-sm"
>
  <div class="flex items-center gap-2">
    {#if internet !== "None"}
      <div class="flex h-4 items-end gap-0.5">
        <div class="h-2 w-1.5 rounded-sm bg-accent"></div>
        <div class="h-3 w-1.5 rounded-sm bg-accent"></div>
        <div class="h-4 w-1.5 rounded-sm bg-accent"></div>
      </div>
      <span
        class="rounded-full bg-accent px-2 py-0.5 text-xxs tracking-wider text-white uppercase shadow-inner"
      >
        {internet}
      </span>
    {/if}
  </div>

  <div class="flex items-center gap-4">
    <div class="flex items-center gap-1 text-yellow-500 drop-shadow-sm">
      <div
        class="flex h-4 w-4 items-center justify-center rounded-full border border-yellow-600 bg-yellow-400 shadow-inner"
      >
        <span class="text-[8px] text-white">C</span>
      </div>
      <span>{playCoins}</span>
    </div>

    <div class="flex flex-col items-center leading-none">
      <span class="text-[10px] text-foreground-alt">{date}</span>
      <span class="text-sm">{time}</span>
    </div>
  </div>

  <div class="flex items-center gap-1">
    <div class="relative h-3 w-6 rounded-[3px] border-2 border-border p-[1px]">
      <div
        class="h-full rounded-sm bg-accent transition-all"
        style="width: {batteryLevel * 25}%"
      ></div>
      <div class="absolute top-0.5 -right-1.5 h-1.5 w-1 rounded-r-sm bg-border"></div>
    </div>
  </div>
</div>
