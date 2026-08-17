<script lang="ts">
import { Button } from "bits-ui"
import type { Snippet } from "svelte"

interface Props {
  children: Snippet
  variant?: "default" | "primary" | "destructive"
  class?: string
  [key: string]: any
}

let { children, variant = "default", class: className = "", ...rest }: Props = $props()

const variants = {
  default:
    "bg-gradient-to-b from-white to-muted border-border text-foreground shadow-btn active:shadow-btn-active active:translate-y-[4px]",
  primary:
    "bg-gradient-to-b from-accent to-[#009bb5] border-[#008299] text-white shadow-[0_4px_0_#008299,inset_0_2px_2px_rgba(255,255,255,0.6)] active:shadow-[0_0px_0_#008299,inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[4px]",
  destructive:
    "bg-gradient-to-b from-destructive to-[#cc2f26] border-[#99231c] text-white shadow-[0_4px_0_#99231c,inset_0_2px_2px_rgba(255,255,255,0.6)] active:shadow-[0_0px_0_#99231c] active:translate-y-[4px]"
}
</script>

<Button.Root
  class="focus-override relative inline-flex items-center justify-center rounded-button border-[3px] px-6 py-2.5 text-sm font-bold tracking-wide transition-all select-none focus-visible:ring-4 focus-visible:ring-accent/50 {variants[
    variant
  ]} {className}"
  {...rest}
>
  {@render children()}
</Button.Root>
