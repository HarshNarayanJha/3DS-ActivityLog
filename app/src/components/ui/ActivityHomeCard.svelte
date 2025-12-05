<script lang="ts">
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  interface Props {
    children: Snippet<[]>
    class?: ClassValue
  }

  let { children, class: className }: Props = $props()
</script>

<div
  class={[
    "m-2 h-full w-[90%] rounded-xl bg-gray-100 p-4 shadow-md transition-shadow hover:shadow-lg",
    className
  ]}
>
  {@render children?.()}
</div>
