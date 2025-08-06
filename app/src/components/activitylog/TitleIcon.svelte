<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  interface Props {
    src: string
    alt: string
    class?: ClassValue
  }

  let { src, alt, class: className }: Props = $props()
</script>

<div
  class={[
    "h-fit w-fit rounded-lg p-2.5",
    "shadow-md/50 shadow-gray-600",
    "icon-gradient",
    className
  ]}
>
  <img
    {src}
    {alt}
    width="50"
    height="50"
    class="h-[50px] w-[50px] rounded-sm border border-white"
  />
</div>

<style scoped>
  .icon-gradient {
    --gradient-color: var(--color-gray-400);

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
