<script lang="ts">
import FileUpload from "$components/FileUpload.svelte"

interface Props {
  pldSessionFile: File | null
  pldSummaryFile: File | null
}

let { pldSessionFile = $bindable(null), pldSummaryFile = $bindable(null) }: Props = $props()
</script>

<FileUpload
  message="Drag or Upload your `pld_sessions.csv` file"
  onSuccessfulUpload={async (file: File) => {
    pldSessionFile = file
  }} />

<FileUpload
  message="Drag or Upload your `pld_summary.csv` file"
  onSuccessfulUpload={async (file: File) => {
    pldSummaryFile = file
  }} />
