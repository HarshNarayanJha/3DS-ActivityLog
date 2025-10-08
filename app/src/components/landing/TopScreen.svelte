<script lang="ts">
  import { asset } from "$app/paths"
  import { fade } from "svelte/transition"

  interface Props {
    isLoading: boolean
  }

  let { isLoading }: Props = $props()

  let networkMode = $state<"streetpass" | "enabled" | "internet">("enabled")

  let networkModeClass = $derived.by(() => {
    switch (networkMode) {
      case "enabled":
        return "bg-gradient-to-b from-gray-300 to-gray-200 text-gray-600 border-2 border-white"
      case "streetpass":
        return "bg-gradient-to-b from-green-500 to-green-400 text-white border-2 border-white"
      case "internet":
        return "bg-gradient-to-b from-sky-500 to-sky-400 text-white border-2 border-white"
    }
  })

  let networkModeText = $derived.by(() => {
    switch (networkMode) {
      case "enabled":
        return "Enabled"
      case "streetpass":
        return "StreetPass"
      case "internet":
        return "Internet"
    }
  })

  function changeNetworkMode() {
    const chance = Math.random()
    if (chance > 2 / 3) {
      networkMode = "internet"
    } else if (chance > 1 / 3) {
      networkMode = "streetpass"
    } else {
      networkMode = "enabled"
    }
  }

  let networkInterval: number | null = null

  $effect(() => {
    networkInterval = setInterval(() => changeNetworkMode(), 3000)

    return () => clearInterval(networkInterval!)
  })
</script>

<div
  class="mx-auto aspect-[1.63] h-auto w-full max-w-[648px] rounded-xl bg-gray-400 p-3"
  id="top-screen"
>
  {#if isLoading}
    <div class="aspect-[1.63] h-full w-full bg-black" in:fade={{ duration: 500 }}>
      <div class="grid h-full w-full grid-cols-1 place-content-center">
        <h3 class="text-center text-5xl" in:fade|global={{ delay: 300 }}>New Nintendo 3DS XL</h3>
      </div>
    </div>
  {:else}
    <div class="mx-auto aspect-[1.63] h-auto w-full bg-gray-50">
      <div class="grid-row-3 grid h-full w-full grid-cols-1">
        <div
          id="top-screen-statusbar"
          class="flex h-8 w-full flex-row items-center justify-between gap-4 place-self-start px-4 py-2 text-lg text-black"
        >
          <div class="flex flex-row items-center gap-4">
            <div></div>
            <button
              class={["w-40 rounded-lg px-4 py-0 font-medium", networkModeClass]}
              type="button"
            >
              {networkModeText}
            </button>
            <p class="font-medium">0</p>
            <div class="flex items-center gap-1">
              <div class="h-3 w-1 bg-black"></div>
              <div class="h-3 w-1 bg-black"></div>
              <div class="h-3 w-1 bg-black"></div>
            </div>
          </div>
          <div class="flex flex-row items-center gap-4">
            <p class="font-medium">
              <span> 7 </span>
              <span> / </span>
              <span> 30 </span>
              <span> (Wed) </span>
            </p>
            <p class="font-medium">
              <span>9</span>
              <span class="animate-caret-blink duration-1000 ease-linear">:</span>
              <span>15</span>
            </p>
            <div class="flex gap-0.5 rounded-md bg-gray-800 p-1 py-0.5">
              <div class="h-3 w-1 bg-transparent"></div>
              <div class="h-3 w-1 bg-blue-500"></div>
              <div class="h-3 w-1 bg-blue-500"></div>
              <div class="h-3 w-1 bg-blue-500"></div>
            </div>
          </div>
        </div>
        <div
          id="top-screen-area"
          class="mx-auto flex h-auto w-3/4 flex-col gap-4 place-self-center justify-self-center"
        >
          <div class="flex items-center justify-center gap-2">
            <!-- <h3 class="text-4xl font-bold text-emerald-400">Activity Log</h3> -->
            <img
              src={`${asset("/icons/Activity_Log_Logo.svg")}`}
              alt=""
              class="h-auto w-max animate-sway drop-shadow-xl"
              width="468"
            />
          </div>
        </div>
        <div
          id="top-screen-footer"
          class="flex h-10 w-full flex-row items-end justify-between place-self-end text-sm text-black"
        >
          <div class="flex flex-row items-center gap-2 rounded-tr-3xl bg-gray-200 px-4 py-1">
            <div class="h-6 w-6 rounded-full border-2 border-black text-center align-middle">Y</div>
          </div>
          <div class="flex flex-row items-center gap-2 rounded-tl-3xl bg-gray-200 px-4 py-1">
            <div class="h-6 w-6 rounded-sm border-2 border-black text-center align-middle">L</div>
            +
            <div class="h-6 w-6 rounded-sm border-2 border-black text-center align-middle">R</div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
