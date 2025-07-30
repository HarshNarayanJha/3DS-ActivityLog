<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    children?: Snippet<[]>
  }
  let { children }: Props = $props()
</script>

<div
  class="mx-auto aspect-[16/9] h-auto w-full max-w-[40rem] rounded-xl bg-gray-400 p-3"
  id="bottom-screen"
>
  <div class="mx-auto aspect-[16/9] h-auto w-full bg-gray-50">
    <div class="grid-row-3 grid h-full w-full grid-cols-1">
      <div
        id="bottom-screen-header"
        class="flex h-8 w-full flex-row items-center justify-between gap-2 place-self-start text-black"
      >
        <div class="h-full rounded-br-3xl bg-yellow-500 px-4 py-1">L Y</div>
        <div class="h-full rounded-bl-3xl bg-yellow-500 px-4 py-1">R Y</div>
      </div>
      <div
        id="bottom-screen-area"
        class="mx-auto h-auto w-3/4 place-self-center justify-self-center"
      >
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
