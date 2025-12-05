<script lang="ts">
  import "$/app.css"
  import Navbar from "$components/Navbar.svelte"
  import MusicManager from "$components/MusicManager.svelte"
  import { ModeWatcher } from "mode-watcher"

  let { children } = $props()

  export const ssr = false
</script>

<ModeWatcher />
<Navbar />
<div class="min-h-svh w-full">
  {@render children()}
  <MusicManager autoplay={false} />
</div>
