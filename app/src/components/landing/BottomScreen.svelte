<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    children?: Snippet<[]>
  }

  let { children }: Props = $props()
</script>

<div
  class="mx-auto aspect-[1.38] h-auto max-h-[374px] w-full max-w-[515.5px] rounded-xl bg-gray-400 p-3"
  id="bottom-screen"
>
  {@render children?.()}
</div>
