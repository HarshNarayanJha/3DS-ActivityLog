<script lang="ts">
  import { Button } from "bits-ui"
  import type { Snippet } from "svelte"

  interface Props {
    onClick?: () => void
    disabled?: boolean
    children: Snippet<[]>
  }

  let { onClick, disabled = false, children }: Props = $props()
</script>

<Button.Root
  onclickcapture={onClick}
  {disabled}
  {children}
  class="inline-flex h-12 items-center justify-center rounded-input bg-dark
	px-[21px] text-[15px] font-semibold text-background shadow-mini
	hover:bg-dark/95 active:scale-[0.98] active:transition-all disabled:opacity-25 disabled:hover:bg-dark disabled:active:scale-100"
/>
