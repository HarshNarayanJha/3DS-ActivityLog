<script lang="ts">
  import { EntryType, type PlayEntry, PlayEvent, SystemEvent } from "$/lib/types"
  import { formatTimestamp } from "$/lib/utils"

  interface Props {
    playEntry: PlayEntry
  }

  let { playEntry }: Props = $props()

  const { title, applet, entryType, playEvent, systemEvent, timestamp } = playEntry
</script>

<div class="prose h-auto w-full rounded-xl p-4 shadow-xl dark:prose-invert">
  {#if entryType === EntryType.SYSTEM}
    <div>
      SYSTEM

      <p>
        {#if systemEvent === SystemEvent.DSI_START}
          DSI START
        {:else if systemEvent === SystemEvent.DSI_END}
          DSI END
        {:else if systemEvent === SystemEvent.SLEEP_START}
          SLEEP START
        {:else if systemEvent === SystemEvent.SLEEP_END}
          SLEEP END
        {:else if systemEvent === SystemEvent.SYSTEM_CLOCK_CHANGE_START}
          SYSTEM CLOCK CHANGE START
        {:else if systemEvent === SystemEvent.SYSTEM_CLOCK_CHANGE_END}
          SYSTEM CLOCK CHANGE END
        {:else if systemEvent === SystemEvent.UNKNOWN_UPDATER}
          UNKNOWN UPDATE
        {:else if systemEvent === SystemEvent.N3DS_SERVICES_STOPPED}
          N3DS SHUTDOWN
        {:else}
          UNKNOWN
        {/if}
      </p>
    </div>
  {:else}
    {#if entryType === EntryType.APPLICATION}
      <p class="font-mono text-sm">{title!.tid.toUpperCase()}</p>
      <h3 class="mb-0 font-bold">{title!.titleName}</h3>
      <p class="mt-0 mb-0 text-sm">{title!.publisher}</p>
      <span class="font-mono text-xs">{title!.serial} ({title!.region.toUpperCase()})</span>
    {:else if entryType === EntryType.APPLET}
      <p class="font-mono text-sm">{applet!.tid.toUpperCase()}</p>
      <h3 class="mb-0 font-bold">{applet!.appletName}</h3>
      <span class="font-mono text-xs">
        {applet!.serial} ({applet!.regions.join(" ").toUpperCase()})
      </span>
    {/if}

    <div class="not-prose my-4">
      <p>Event</p>

      <p>
        {#if entryType === EntryType.APPLET}
          APPLET
        {:else if entryType === EntryType.APPLICATION}
          APPLICATION
        {:else}
          UNKNOWN
        {/if}
      </p>

      <p>
        {#if playEvent === PlayEvent.OPEN}
          OPEN
        {:else if playEvent === PlayEvent.CLOSE}
          CLOSE
        {:else if playEvent === PlayEvent.RESUME}
          RESUME
        {:else if playEvent === PlayEvent.SUSPEND}
          SUSPEND
        {:else}
          UNKNOWN
        {/if}
      </p>
    </div>
  {/if}
  <time datetime={timestamp.toString()} class="font-mono">{formatTimestamp(timestamp)}</time>
</div>
