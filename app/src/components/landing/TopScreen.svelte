<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    children?: Snippet<[]>
  }

  let { children }: Props = $props()
</script>

<div
  class="mx-auto aspect-[1.63] h-auto w-full max-w-[648px] rounded-xl bg-gray-400 p-3"
  id="top-screen"
>
  {@render children?.()}
</div>
