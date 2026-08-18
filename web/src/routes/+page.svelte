<script lang="ts">
import { globalState as gState } from "$/lib/global.svelte"
import { PLDParser } from "$/lib/pldparser"
import { MUSIC_MAP } from "$/lib/ui-types"
import { goto } from "$app/navigation"
import { resolve } from "$app/paths"
import BottomHomeScreen from "$components/landing/BottomHomeScreen.svelte"
import TopHomeScreen from "$components/landing/TopHomeScreen.svelte"
import Uploader from "$components/landing/Uploader.svelte"

gState.audioSrc = MUSIC_MAP.HOME

let isLoading = $state(false)

let pldSessionFile: File | null = $state(null)
let pldSummaryFile: File | null = $state(null)

const openClicked = async () => {
  if (pldSessionFile === null || pldSummaryFile === null) {
    console.error("pldSessionFile or pldSummaryFile is null")
    return
  }

  isLoading = true

  try {
    const parser = new PLDParser()
    gState.pldSessions = await parser.parseSession(await pldSessionFile.text())
    gState.pldSummaries = await parser.parseSummary(await pldSummaryFile.text())

    console.log(`${gState.pldSessions?.size} total sessions parsed`)
    console.log(`${gState.pldSummaries?.size} total summaries parsed`)

    if (gState.pldSessions === null) {
      throw new Error("Error Parsing PLD Sessions")
    }

    if (gState.pldSummaries === null) {
      throw new Error("Error Parsing PLD Summaries")
    }

    gState.audioSrc = null
    await new Promise((resolve) => setTimeout(resolve, 2000))
    goto(resolve("/log"))
  } catch (error) {
    console.error(error)
    gState.reset()
  } finally {
    isLoading = false
  }
}

$inspect(gState.pldSessions).with(console.log)
$inspect(gState.pldSummaries).with(console.log)
</script>

<svelte:head>
  <title>Activity Upload | 3DS Activity Log</title>
  <meta name="description" content="Upload your 3DS Activity Log File" />
</svelte:head>

<div class="grid min-h-[70svh] w-full grid-cols-1 gap-4 px-16 py-24">
  <TopHomeScreen {isLoading} />

  <BottomHomeScreen
    {isLoading}
    openEnabled={pldSessionFile !== null && pldSummaryFile !== null}
    onOpenClicked={openClicked}>
    <Uploader bind:pldSessionFile bind:pldSummaryFile />
  </BottomHomeScreen>
</div>
