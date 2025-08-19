<script lang="ts">
  import type { PlayEntry } from "$/lib/types"

  interface Props {
    entry: PlayEntry
  }

  let { entries }: Props = $props()
</script>
