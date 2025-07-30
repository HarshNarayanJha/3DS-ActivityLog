<script lang="ts">
  import FileUpload from "$components/FileUpload.svelte"
  import Landing from "$components/Landing.svelte"
  import BottomScreen from "$components/landing/BottomScreen.svelte"
  import TopScreen from "$components/landing/TopScreen.svelte"

  let csvFile = $state<File | null>(null)

  const onUpload = (file: File) => {
    csvFile = file
  }
</script>

<div class="grid min-h-[70svh] w-full grid-cols-1 place-content-center gap-4 px-16 py-24">
  {#if csvFile === null}
    <TopScreen />
    <BottomScreen>
      <FileUpload onSuccessfulUpload={onUpload} />
    </BottomScreen>
    <!-- <Landing /> -->
  {:else}
    <div class="text-center">
      <h2>CSV File Uploaded</h2>
      <p>File name: {csvFile.name}</p>
      <p>File size: {csvFile.size} bytes</p>
    </div>
  {/if}
</div>
