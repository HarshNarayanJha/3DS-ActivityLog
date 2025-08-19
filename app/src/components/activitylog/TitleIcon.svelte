<script lang="ts">
  import { base } from "$app/paths"
  import type { ClassValue } from "svelte/elements"

  interface Props {
    src: string
    tid: string
    alt: string
    class?: ClassValue
  }

  let { src, tid, alt, class: className }: Props = $props()

  let isError = $state(false)

  function handleError(event: any) {
    if (isError) return

    isError = true
    event.target.src = `${base}/icons/${tid.toUpperCase()}.png`
  }
</script>

<div
  class={[
    "aspect-square h-fit w-fit rounded-xl p-0.25",
    "bg-gradient-to-b from-[#ffffffae] to-gray-400",
    className
  ]}
>
  <div class={["rounded-xl p-2.5", "shadow-md/50 shadow-gray-600", "icon-gradient"]}>
    <img
      {src}
      {alt}
      width="50"
      height="50"
      class="aspect-square h-[50px] min-h-[50px] w-[50px] min-w-[50px] rounded-sm border border-white"
      onerror={handleError}
    />
  </div>
</div>

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
