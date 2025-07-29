<script lang="ts">
  import FileUpload from "$components/FileUpload.svelte"
  import Landing from "$components/Landing.svelte"

  let csvFile = $state<File | null>(null)

  const onUpload = (file: File) => {
    csvFile = file
  }
</script>

<div class="grid min-h-[70svh] w-full place-content-center gap-8">
  {#if csvFile === null}
    <Landing />
    <FileUpload onSuccessfulUpload={onUpload} />
  {:else}
    <div class="text-center">
      <h2>CSV File Uploaded</h2>
      <p>File name: {csvFile.name}</p>
      <p>File size: {csvFile.size} bytes</p>
    </div>
  {/if}
</div>
