<script lang="ts">
  import Dropzone from "svelte-file-dropzone"

  interface Props {
    onSuccessfulUpload: (file: File) => void
  }

  let { onSuccessfulUpload }: Props = $props()

  let file = $state<File | null>(null)

  function handleFilesSelect(e: CustomEvent<any>) {
    const { acceptedFiles } = e.detail
    if (acceptedFiles && acceptedFiles[0]) {
      file = acceptedFiles[0] as File
      onSuccessfulUpload(file)
    }
  }
</script>

<div class="space-y-2">
  <Dropzone
    on:drop={handleFilesSelect}
    accept=".csv"
    multiple={false}
    disableDefaultStyles
    containerClasses="text-center transition-[border] flex flex-1 flex-col items-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100 p-12 text-gray-500 outline-0 hover:border-blue-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-500 dark:focus:border-blue-400"
  >
    {#if file === null}
      <b> Drag or upload your PlayHistory.csv file </b>
    {:else}
      File selected: <b>{file.name}</b>
    {/if}
  </Dropzone>
</div>
