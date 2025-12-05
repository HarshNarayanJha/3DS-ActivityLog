<script lang="ts">
  import { SYSTEM_APPLICATIONS_TIDHIGH } from "$/lib/titledb"
  import type { TitleData } from "$/lib/types"
  import { base, resolve } from "$app/paths"
  import type { ClassValue } from "svelte/elements"

  interface Props {
    title: TitleData
    alt: string
    size?: "50" | "40"
    skipBorder?: boolean
    class?: ClassValue
  }

  let { title, alt, skipBorder = false, size = "50", class: className }: Props = $props()

  let src = $derived.by(() => {
    if (title.tid.startsWith(SYSTEM_APPLICATIONS_TIDHIGH))
      return title.iconUrl ?? resolve("/icons/0000000000000000.png")

    return `https://api.ghseshop.cc/${title.tid}/icon`
  })

  let isError = $state(false)
  function handleError(event: any) {
    if (isError) {
      event.target.src = resolve("/icons/0000000000000000.png")
      return
    }

    isError = true
    event.target.src = `${base}/icons/${title.tid.toUpperCase()}.png`
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
      size === "50" && "h-[50px] min-h-[50px] w-[50px] min-w-[50px]",
      size === "40" && "h-[40px] min-h-[40px] w-[40px] min-w-[40px]"
    ]}
    onerror={handleError}
  />
{:else}
  <div
    class={[
      "aspect-square h-fit w-fit rounded-xl p-px",
      "bg-linear-to-b from-[#ffffffae] to-gray-400",
      className
    ]}
  >
    <div class={["rounded-xl p-2.5", "shadow-md/50 shadow-gray-600", "icon-gradient"]}>
      <img
        {src}
        {alt}
        width={size}
        height={size}
        class="aspect-square h-[50px] min-h-[50px] w-[50px] min-w-[50px] rounded-sm border border-white"
        onerror={handleError}
      />
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
