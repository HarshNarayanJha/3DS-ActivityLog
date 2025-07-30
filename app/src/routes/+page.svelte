<script lang="ts">
  import { PlayHistoryParser } from "$/lib/parser"
  import FileUpload from "$components/FileUpload.svelte"
  import BottomScreen from "$components/landing/BottomScreen.svelte"
  import TopScreen from "$components/landing/TopScreen.svelte"
  import LogEntryCard from "$components/LogEntryCard.svelte"
  import { globalState as gState } from "$/lib/global.svelte"
  import { EntryType } from "$/lib/types"

  let csvFile = $state<File | null>(null)

  const onUpload = async (file: File) => {
    csvFile = file
    const parser = new PlayHistoryParser()

    try {
      const contents = await csvFile.text()
      gState.playHistory = parser.parse(contents)

      if (gState.playHistory === null) {
        console.error("Error Parsing PlayHistory")
        csvFile = null
      }

      console.log(`${gState.playHistory.size} Entries parsed`)
    } catch (error) {
      console.error(error)
      gState.playHistory = null
      csvFile = null
    }
  }
</script>

<div class="grid min-h-[70svh] w-full grid-cols-1 place-content-center gap-4 px-16 py-24">
  {#if csvFile === null || gState.playHistory === null}
    <TopScreen />
    <BottomScreen>
      <FileUpload onSuccessfulUpload={onUpload} />
    </BottomScreen>
    <!-- <Landing /> -->
  {:else}
    <div class="mx-auto h-auto w-full max-w-4xl space-y-8">
      {#each gState.playHistory.entries().take(100) as [r, entry] (r)}
        <LogEntryCard playEntry={entry} />
      {/each}
    </div>
  {/if}
</div>
