<script lang="ts">
  import type { ButtonRootProps } from "bits-ui"
  import { Button } from "bits-ui"

  let props: ButtonRootProps = $props()
</script>

<Button.Root
  {...props}
  class="inline-flex h-12 items-center justify-center rounded-input bg-dark
	px-[21px] text-[15px] font-semibold text-background shadow-mini
	hover:bg-dark/95 active:scale-[0.98] active:transition-all disabled:opacity-25 disabled:hover:bg-dark disabled:active:scale-100"
></Button.Root>
