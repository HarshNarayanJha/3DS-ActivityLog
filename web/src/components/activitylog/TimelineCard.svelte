<script lang="ts">
  import { HOME_MENU_TID } from "$/lib/titledb"
  import { EntryType, PlayEvent, SystemEvent, type PlayEntry } from "$/lib/types"
  import { formatTimestamp } from "$/lib/utils"
  import LogEntryCard from "./LogEntryCard.svelte"
  import TitleIcon from "./TitleIcon.svelte"

  interface Props {
    entry: PlayEntry
  }

  let { entry }: Props = $props()

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

<div
  class="mx-auto my-8 prose h-auto w-full rounded-xl p-1 shadow-xl dark:prose-invert"
  data-tid={entry.title?.tid.toUpperCase()}
>
  <div class="group flex w-full flex-col items-center justify-between gap-1">
    {#if isHomeMenuOpen(entry)}
      <p>Home Menu Launched</p>
    {:else if isShutdown(entry)}
      <p>3DS Stopped</p>
    {:else if isSystemSleepStart(entry)}
      <p>3DS put to sleep</p>
    {:else if isSystemSleepEnd(entry)}
      <p>3DS woke from sleep</p>
    {:else if isAppletLaunch(entry)}
      <p>
        {entry.applet?.appletName} Launched
      </p>
    {:else if isAppletSuspend(entry)}
      <p>
        {entry.applet?.appletName} Suspend
      </p>
    {:else if isAppletResume(entry)}
      <p>
        {entry.applet?.appletName} Resumed
      </p>
    {:else if isAppletClose(entry)}
      <p>
        {entry.applet?.appletName} Closed
      </p>
    {:else if isApplicationLaunch(entry)}
      <div class="flex flex-row items-center gap-2">
        <TitleIcon title={entry.title!} alt="" class="not-prose" size="40" skipBorder />
        <p>
          {entry.title?.titleName} Launched
        </p>
      </div>
    {:else if isApplicationSuspend(entry)}
      <div class="flex flex-row items-center gap-2">
        <TitleIcon title={entry.title!} alt="" class="not-prose" size="40" skipBorder />
        <p>
          {entry.title?.titleName} Suspended
        </p>
      </div>
    {:else if isApplicationResume(entry)}
      <div class="flex flex-row items-center gap-2">
        <TitleIcon title={entry.title!} alt="" class="not-prose" size="40" skipBorder />
        <p>
          {entry.title?.titleName} Resumed
        </p>
      </div>
    {:else if isApplicationClose(entry)}
      <div class="flex flex-row items-center gap-2">
        <TitleIcon title={entry.title!} alt="" class="not-prose" size="40" skipBorder />
        <p>
          {entry.title?.titleName} Closed
        </p>
      </div>
    {:else}
      <div>
        <LogEntryCard playEntry={entry} />
      </div>
    {/if}
    <code class="self-end opacity-0 group-hover:opacity-50">
      {formatTimestamp(entry.timestamp)}
    </code>
  </div>
</div>
