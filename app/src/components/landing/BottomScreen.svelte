<script lang="ts">
  import { base } from "$app/paths"
  import TitleIcon from "$components/activitylog/TitleIcon.svelte"
  import type { Snippet } from "svelte"

  interface Props {
    children?: Snippet<[]>
  }
  let { children }: Props = $props()

  const icons = [
    { path: `${base}/icons/game_notes.png` },
    { path: `${base}/icons/browser.png` },
    { path: `${base}/icons/notifications.png` },
    { path: `${base}/icons/friends.png` },
    { path: `${base}/icons/Miiverse_3DS_Icon.svg` }
  ]
</script>

<div
  class="mx-auto aspect-[1.38] h-auto w-full max-w-[515.5px] rounded-xl bg-gray-400 p-3"
  id="bottom-screen"
>
  <div class="mx-auto aspect-[1.38] h-auto w-full bg-gray-100">
    <div class="grid-row-3 grid h-full w-full grid-cols-1">
      <div
        id="bottom-screen-header"
        class="flex h-10 w-full flex-row items-center justify-between gap-2 place-self-start text-black"
      >
        <div
          class="h-full rounded-br-lg border-2 border-s-0 border-t-0 border-white bg-gray-200 px-4 py-1 shadow-sm"
        >
          HS
        </div>
        <div class="flex flex-1 flex-row items-center justify-evenly gap-2">
          {#each icons as ic (ic.path)}
            <img src={ic.path} alt="" width="40" height="40" class="h-10 w-10" />
          {/each}
        </div>
        <div
          class="h-full rounded-bl-lg border-2 border-e-0 border-t-0 border-white bg-gray-300 px-4 py-1 shadow-sm"
        >
          S | L
        </div>
      </div>
      <div
        id="bottom-screen-area"
        class="mx-auto h-auto w-3/4 place-self-center justify-self-center"
      >
        <TitleIcon
          class="mx-auto mb-4 w-max"
          src={`${base}/icons/activity_log.png`}
          alt="Activity Log"
        />
        {@render children?.()}
      </div>
      <div
        id="bottom-screen-footer"
        class="grid h-8 w-full grid-cols-[1fr_3fr] place-self-end text-center text-black"
      >
        <div class="bg-yellow-500 px-4 py-1">Manual</div>
        <div class="bg-yellow-500 px-4 py-1">Open</div>
      </div>
    </div>
  </div>
</div>
