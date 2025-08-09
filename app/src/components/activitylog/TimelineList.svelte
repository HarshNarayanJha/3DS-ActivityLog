<script lang="ts">
  import { HOME_MENU_TID } from "$/lib/titledb"
  import { EntryType, PlayEvent, SystemEvent, type PlayEntry } from "$/lib/types"
  import { formatTimestamp, parseTimestamp } from "$/lib/utils"
  import LogEntryCard from "./LogEntryCard.svelte"

  interface Props {
    entries: Array<[number, PlayEntry]>
    rangeHash: string
  }

  let { entries, rangeHash }: Props = $props()

  const isHomeMenuOpen = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLET &&
    entry.applet?.tid === HOME_MENU_TID &&
    entry.playEvent === PlayEvent.OPEN

  const isShutdown = (entry: PlayEntry) =>
    entry.entryType === EntryType.SYSTEM && entry.systemEvent === SystemEvent.N3DS_SERVICES_STOPPED

  const isAppletLaunch = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLET && entry.playEvent === PlayEvent.OPEN

  const isAppletSuspend = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLET && entry.playEvent === PlayEvent.SUSPEND

  const isAppletResume = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLET && entry.playEvent === PlayEvent.RESUME

  const isAppletClose = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLET && entry.playEvent === PlayEvent.CLOSE

  const isApplicationLaunch = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLICATION && entry.playEvent === PlayEvent.OPEN

  const isApplicationSuspend = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLICATION && entry.playEvent === PlayEvent.SUSPEND

  const isApplicationResume = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLICATION && entry.playEvent === PlayEvent.RESUME

  const isApplicationClose = (entry: PlayEntry) =>
    entry.entryType === EntryType.APPLICATION && entry.playEvent === PlayEvent.CLOSE

  const isSystemSleepStart = (entry: PlayEntry) =>
    entry.entryType === EntryType.SYSTEM && entry.systemEvent === SystemEvent.SLEEP_START

  const isSystemSleepEnd = (entry: PlayEntry) =>
    entry.entryType === EntryType.SYSTEM && entry.systemEvent === SystemEvent.SLEEP_END
</script>

<div class="mx-auto text-center">
  {#each entries as [r, entry] (r)}
    {#if isHomeMenuOpen(entry)}
      <p class="mx-auto p-4">Home Menu launched at {formatTimestamp(entry.timestamp)}</p>
    {:else if isShutdown(entry)}
      <p class="mx-auto p-4">3DS Stopped at {formatTimestamp(entry.timestamp)}</p>
    {:else if isSystemSleepStart(entry)}
      <p class="mx-auto p-4">3DS put to sleep at {formatTimestamp(entry.timestamp)}</p>
    {:else if isSystemSleepEnd(entry)}
      <p class="mx-auto p-4">3DS woke from sleep at {formatTimestamp(entry.timestamp)}</p>
    {:else if isAppletLaunch(entry)}
      <p class="mx-auto p-4">
        {entry.applet?.appletName} Launched at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isAppletSuspend(entry)}
      <p class="mx-auto p-4">
        {entry.applet?.appletName} Suspend at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isAppletResume(entry)}
      <p class="mx-auto p-4">
        {entry.applet?.appletName} Resumed at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isAppletClose(entry)}
      <p class="mx-auto p-4">
        {entry.applet?.appletName} Closed at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isApplicationLaunch(entry)}
      <p class="mx-auto p-4">
        {entry.title?.titleName} Launched at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isApplicationSuspend(entry)}
      <p class="mx-auto p-4">
        {entry.title?.titleName} Suspend at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isApplicationResume(entry)}
      <p class="mx-auto p-4">
        {entry.title?.titleName} Resumed at {formatTimestamp(entry.timestamp)}
      </p>
    {:else if isApplicationClose(entry)}
      <p class="mx-auto p-4">
        {entry.title?.titleName} Closed at {formatTimestamp(entry.timestamp)}
      </p>
    {:else}
      <div>
        <span class="font-mono text-muted-foreground">{r - 1}</span>
        <LogEntryCard playEntry={entry} />
      </div>
    {/if}
  {:else}
    <div>No Data</div>
  {/each}
</div>
