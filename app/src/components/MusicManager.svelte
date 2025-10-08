<script lang="ts">
  import { globalState as gState } from "$/lib/global.svelte"
  import { onMount } from "svelte"
  import N3DSButton from "./ui/N3DSButton.svelte"

  interface Props {
    autoplay: boolean
  }

  let { autoplay = true }: Props = $props()

  let player: HTMLAudioElement | null = $state(null)

  let playing = $state(true)
  let src = $derived(gState.audioSrc)
  let loop = $state<boolean>(true)

  const play = () => {
    player?.play()
    playing = true
  }

  const pause = () => {
    player?.pause()
    playing = false
  }
  const toggle = () => {
    if (player?.paused) {
      play()
    } else {
      pause()
    }
  }

  onMount(() => {
    // TODO: Chrome and others don't allow autoplay without user interaction first
    document.addEventListener("click", () => {
      play()
    })

    setTimeout(play, 2000)
  })
</script>

<audio bind:this={player} {src} {autoplay} {loop}></audio>

<div class="sticky bottom-0 p-8 text-end">
  <N3DSButton onClick={toggle}>{playing ? "Pause" : "Play"}</N3DSButton>
</div>
