<script lang="ts">
  import { PlayHistoryParser } from "$/lib/parser"
  import FileUpload from "$components/FileUpload.svelte"
  import { globalState as gState } from "$/lib/global.svelte"
  import { stats } from "$/lib/3dsdbapi"
  import { tick } from "svelte"
  import { MUSIC_MAP } from "$/lib/ui-types"
  import TopHomeScreen from "$components/landing/TopHomeScreen.svelte"
  import BottomHomeScreen from "$components/landing/BottomHomeScreen.svelte"
  import ActivityLogHome from "$components/ActivityLogHome.svelte"

  let csvFile = $state<File | null>(null)
  let isLoading = $state(false)

  let showFile3DS = $derived(isLoading || !gState.isStable)
  gState.audioSrc = MUSIC_MAP.HOME

  const onUpload = async (file: File) => {
    isLoading = true
    await tick()

    csvFile = file
    const parser = new PlayHistoryParser()

    try {
      const contents = await csvFile.text()
      gState.playHistory = await parser.parse(contents)
      gState.buildPlayStats()
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
        gState.audioSrc = MUSIC_MAP.HOME
      }

      if (gState.playStats === null) {
        console.error("Error Parsing PlayStats")
        csvFile = null
        gState.audioSrc = MUSIC_MAP.HOME
      }

      console.log(`${gState.playHistory.size} Play Entries parsed`)
      console.log(`${gState.playStats?.totalTitles} total title stats`)
    } catch (error) {
      console.error(error)
      gState.reset()
      csvFile = null
      gState.audioSrc = MUSIC_MAP.HOME
    }

    gState.audioSrc = MUSIC_MAP.ACTIVITY_LOG
    await new Promise((resolve) => setTimeout(resolve, 2000))
    isLoading = false
  }
</script>

<svelte:head>
  {#if showFile3DS}
    <title>Activity Upload | 3DS Activity Log</title>
    <meta name="description" content="Upload your 3DS Activity Log File" />
  {:else}
    <title>Activity Log Home | 3DS Activity Log</title>
    <meta name="description" content="3DS Activity Log Home" />
  {/if}
</svelte:head>

<div class="grid min-h-[70svh] w-full grid-cols-1 gap-4 px-16 py-24">
  {#if showFile3DS}
    <TopHomeScreen {isLoading} />
    <BottomHomeScreen {isLoading}>
      <FileUpload onSuccessfulUpload={onUpload} />
    </BottomHomeScreen>
  {:else}
    <ActivityLogHome playStats={gState.playStats!} />
    <!-- <ActivityLogViewer
      playHistory={gState.playHistory!}
      dates={gState.dates}
      firstDate={gState.firstDate!}
      lastDate={gState.lastDate!}
      years={gState.years}
    /> -->
  {/if}
</div>
