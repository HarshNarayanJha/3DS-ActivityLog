<script lang="ts">
  import { SYSTEM_APPLICATIONS } from "$/lib/titledb"
  import type { TitleData } from "$/lib/types"
  import { base } from "$app/paths"
  import TitleIcon from "$components/activitylog/TitleIcon.svelte"
  import type { Snippet } from "svelte"

  interface Props {
    children?: Snippet<[]>
  }
  let { children }: Props = $props()

  const appletIcons = [
    { path: `${base}/icons/game_notes.png` },
    { path: `${base}/icons/friends.png` },
    { path: `${base}/icons/notifications.png` },
    { path: `${base}/icons/browser.png` },
    { path: `${base}/icons/miiverse.png` }
  ]

  const homeScreenTitles: Array<TitleData> = [
    SYSTEM_APPLICATIONS["00021400"], // camera
    SYSTEM_APPLICATIONS["00021000"], // system settings
    SYSTEM_APPLICATIONS["00021200"], // activity log
    SYSTEM_APPLICATIONS["00021700"], // mii maker
    SYSTEM_APPLICATIONS["20021300"], // health and safety
    SYSTEM_APPLICATIONS["00021500"], // sound
    SYSTEM_APPLICATIONS["00021900"] // eshop
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
          {#each appletIcons as ic (ic.path)}
            <img src={ic.path} alt="" width="44" height="44" class="h-11 w-auto object-cover" />
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
        class="mx-auto flex h-full w-full flex-col items-stretch justify-between place-self-center justify-self-center border-2 border-s-0 border-e-0 border-white bg-neutral-300 py-4"
      >
        <div class="mx-auto w-10/12">
          {@render children?.()}
        </div>
        <div
          class="no-scrollbar flex w-full flex-row items-center justify-start gap-3 overflow-scroll px-8"
        >
          {#each homeScreenTitles as title (title.tid)}
            <TitleIcon src={title.iconUrl!} alt={title.titleName} />
          {/each}
        </div>
      </div>
      <div
        id="bottom-screen-footer"
        class="grid h-8 w-full grid-cols-[1fr_3fr] place-self-end text-center text-black"
      >
        <div
          class="border border-s-0 border-e-0 border-b-0 border-neutral-500 bg-gradient-to-b from-neutral-200 from-50% to-neutral-400 px-4 py-1"
        >
          Manual
        </div>
        <div
          class="rounded-tr-2xl border border-b-0 border-neutral-500 bg-gradient-to-b from-neutral-200 from-50% to-neutral-400 px-4 py-1"
        >
          Open
        </div>
      </div>
    </div>
  </div>
</div>
