<script lang="ts">
  import { PlayHistoryParser } from "$/lib/parser"
  import type { PlayHistory } from "$/lib/types"
  import FileUpload from "$components/FileUpload.svelte"
  import BottomScreen from "$components/landing/BottomScreen.svelte"
  import TopScreen from "$components/landing/TopScreen.svelte"

  let csvFile = $state<File | null>(null)

  let playHistory = $state<PlayHistory | null>(null)

  const onUpload = async (file: File) => {
    csvFile = file
    const parser = new PlayHistoryParser()

    try {
      const contents = await csvFile.text()
      playHistory = parser.parse(contents)

      if (playHistory === null) {
        console.error("Error Parsing PlayHistory")
        csvFile = null
      }

      console.log(`${playHistory.size} Entries parsed`)
    } catch (error) {
      console.error(error)
      playHistory = null
      csvFile = null
    }
  }
</script>

<div class="grid min-h-[70svh] w-full grid-cols-1 place-content-center gap-4 px-16 py-24">
  {#if csvFile === null || playHistory === null}
    <TopScreen />
    <BottomScreen>
      <FileUpload onSuccessfulUpload={onUpload} />
    </BottomScreen>
    <!-- <Landing /> -->
  {:else}
    <div class="text-center">
      <h2>History Parsed</h2>
      <p>Num Entries: {playHistory.size}</p>
    </div>
  {/if}
</div>
