<script lang="ts">
import Dropzone from "svelte-file-dropzone"

interface Props {
  message: string
  onSuccessfulUpload: (file: File) => Promise<void>
}

let { message, onSuccessfulUpload }: Props = $props()

let file = $state<File | null>(null)

async function handleFilesSelect(e: CustomEvent<any>) {
  const { acceptedFiles } = e.detail
  if (acceptedFiles && acceptedFiles[0]) {
    file = acceptedFiles[0] as File
    await onSuccessfulUpload(file)
  }
}
</script>

<div class="space-y-2">
  <Dropzone
    on:drop={handleFilesSelect}
    accept=".csv"
    multiple={false}
    disableDefaultStyles
    containerClasses="text-center transition-[border] flex flex-1 flex-col items-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-sm text-gray-500 outline-0 hover:border-blue-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-500 dark:focus:border-blue-400">
    {#if file === null}
      <b> {message} </b>
    {:else}
      <span>
        File selected: <b>{file.name}</b>
      </span>
    {/if}
  </Dropzone>
</div>
