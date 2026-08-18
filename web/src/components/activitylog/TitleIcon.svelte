<script lang="ts">
import { SYSTEM_APPLICATIONS_TIDHIGH } from "$/lib/titledb"
import { asset, base } from "$app/paths"

import type { AppletData, TitleData } from "$/lib/types"
import type { ClassValue } from "svelte/elements"

interface Props {
  title?: TitleData
  applet?: AppletData
  alt: string
  size?: "96" | "64" | "50" | "40"
  skipBorder?: boolean
  class?: ClassValue
}

let { title, applet, alt, skipBorder = false, size = "50", class: className }: Props = $props()

let src = $derived.by(() => {
  if (applet !== undefined) {
    return `${base}/icons/${applet.tid.toUpperCase()}.png`
  } else if (title !== undefined) {
    if (title.tid.startsWith(SYSTEM_APPLICATIONS_TIDHIGH))
      return (
        title.iconUrl?.replace(/^https:\/\//, "http://") ?? asset("/icons/0000000000000000.png")
      )

    return (
      title.iconUrl?.replace(/^https:\/\//, "http://") ??
      `https://api.ghseshop.cc/${title.tid}/icon`
    )
  }
})

let isError = $state(false)
function handleError(event: any) {
  if (isError) {
    src = asset("/icons/0000000000000000.png")
    return
  }

  isError = true
  if (applet !== undefined) {
    src = `${base}/icons/${applet.tid.toUpperCase()}.png`
  } else if (title !== undefined) {
    src = `${base}/icons/${title?.tid.toUpperCase()}.png`
  }
}
</script>

{#if skipBorder}
  <img
    {src}
    {alt}
    width={size}
    height={size}
    class={[
      "aspect-square rounded-sm border border-white",
      size === "96" && "h-24 min-h-24 w-24 min-w-24",
      size === "64" && "h-16 min-h-16 w-16 min-w-16",
      size === "50" && "h-12.5 min-h-12.5 w-12.5 min-w-12.5",
      size === "40" && "h-10 min-h-10 w-10 min-w-10"
    ]}
    onerror={handleError} />
{:else}
  <div
    class={[
      "aspect-square h-fit w-fit rounded-xl p-px",
      "bg-linear-to-b from-[#ffffffae] to-gray-400",
      className
    ]}>
    <div class={["rounded-xl p-2.5", "shadow-md/50 shadow-gray-600", "icon-gradient"]}>
      <img
        {src}
        {alt}
        width={size}
        height={size}
        class="aspect-square h-12.5 min-h-12.5 w-12.5 min-w-12.5 rounded-sm border border-white"
        onerror={handleError} />
    </div>
  </div>
{/if}

<style scoped>
.icon-gradient {
  --gradient-color: var(--color-gray-300);

  background:
    linear-gradient(to bottom, #ffffffae 0%, #ffffffae 80%, transparent),
    linear-gradient(
      to right,
      var(--gradient-color) 0.5%,
      transparent 10%,
      transparent 90%,
      var(--gradient-color) 99.5%
    ),
    linear-gradient(
      to bottom,
      var(--gradient-color) 0.5%,
      transparent 10%,
      transparent 90%,
      var(--gradient-color) 99.5%
    );
}
</style>
