<script lang="ts">
  import "$/app.css"
  import Navbar from "$components/Navbar.svelte"
  import { ModeWatcher } from "mode-watcher"

  let { children } = $props()
</script>

<ModeWatcher />
<Navbar />
<div class="min-h-svh w-full">
  {@render children()}
</div>
