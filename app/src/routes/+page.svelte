<script lang="ts">
  import { PlayHistoryParser } from "$/lib/parser"
  import FileUpload from "$components/FileUpload.svelte"
  import BottomScreen from "$components/landing/BottomScreen.svelte"
  import TopScreen from "$components/landing/TopScreen.svelte"
  import { globalState as gState } from "$/lib/global.svelte"
  import { stats } from "$/lib/3dsdbapi"
  import ActivityLogViewer from "$components/ActivityLogViewer.svelte"
  import { tick } from "svelte"

  let csvFile = $state<File | null>(null)
  let isLoading = $state(false)

  const onUpload = async (file: File) => {
    isLoading = true
    await tick()

    csvFile = file
    const parser = new PlayHistoryParser()

    try {
      const contents = await csvFile.text()
      gState.playHistory = await parser.parse(contents)
      console.log(stats)
      // console.log(
      //   gState.dates
      //     .entries()
      //     .map(([x, v]) => [x, v.toString()])
      //     .toArray()
      // )

      if (gState.playHistory === null) {
        console.error("Error Parsing PlayHistory")
        csvFile = null
      }

      console.log(`${gState.playHistory.size} Play Entries parsed`)
    } catch (error) {
      console.error(error)
      gState.reset()
      csvFile = null
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    isLoading = false
  }
</script>

<div class="grid min-h-[70svh] w-full grid-cols-1 gap-4 px-16 py-24">
  {#if isLoading || csvFile === null || gState.playHistory === null}
    <TopScreen {isLoading} />
    <BottomScreen {isLoading}>
      <FileUpload onSuccessfulUpload={onUpload} />
    </BottomScreen>
  {:else}
    <ActivityLogViewer
      playHistory={gState.playHistory}
      dates={gState.dates}
      firstDate={gState.firstDate!}
      lastDate={gState.lastDate!}
      years={gState.years}
    />
  {/if}
</div>
