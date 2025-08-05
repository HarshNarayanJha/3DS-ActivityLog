<script lang="ts">
  import { EntryType, PlayEvent, type PlayEntry, type TitleData, type TitleInfo } from "$/lib/types"
  import { error } from "@sveltejs/kit"
  import ActivityCard from "./ActivityCard.svelte"
  import { Duration } from "luxon"

  interface Props {
    entries: Array<[number, PlayEntry]>
    rangeHash: string
  }

  let { entries, rangeHash }: Props = $props()

  let groupedTitles: Array<TitleInfo> = $derived.by(() => {
    const cache: Record<
      string,
      {
        launchTimestamp: number | null
        playTime: number
        suspendTimestamp: number | null
        titleData: TitleData
        openCount: number
        closeCount: number
        suspendCount: number
        resumeCount: number
      }
    > = {}

    for (let [r, entry] of entries) {
      if (entry.entryType === EntryType.SYSTEM || entry.entryType === EntryType.APPLET) {
        error(500, "Activity Card is only used for Applications")
      }

      if (entry.title === undefined) {
        error(500, "Play Data is required")
      }

      switch (entry.playEvent) {
        case PlayEvent.OPEN:
          if (cache[entry.title!.tid] === undefined) {
            cache[entry.title!.tid] = {
              launchTimestamp: entry.timestamp,
              titleData: entry.title!,
              playTime: 0,
              suspendTimestamp: null,
              openCount: 1,
              closeCount: 0,
              suspendCount: 0,
              resumeCount: 0
            }
          } else {
            cache[entry.title!.tid].launchTimestamp = entry.timestamp
            cache[entry.title!.tid].openCount += 1
          }
          break

        case PlayEvent.CLOSE:
          if (cache[entry.title!.tid] === undefined) {
            console.warn("Close event without an open event first. Ignoring", entry)
            continue
          }

          cache[entry.title!.tid].playTime +=
            entry.timestamp - (cache[entry.title!.tid].launchTimestamp ?? entry.timestamp)
          cache[entry.title!.tid].launchTimestamp = null
          cache[entry.title!.tid].closeCount += 1
          break

        case PlayEvent.SUSPEND:
          if (cache[entry.title!.tid] === undefined) {
            console.warn("Suspend event without an open event first. Ignoring", entry)
            continue
          }

          cache[entry.title!.tid].playTime +=
            entry.timestamp - (cache[entry.title!.tid].launchTimestamp ?? entry.timestamp)
          cache[entry.title!.tid].launchTimestamp = null
          cache[entry.title!.tid].suspendTimestamp = entry.timestamp
          cache[entry.title!.tid].suspendCount += 1
          break

        case PlayEvent.RESUME:
          if (cache[entry.title!.tid] === undefined) {
            console.warn("Resume event without an open event first", entry)
            continue
          }
          if (cache[entry.title!.tid].suspendTimestamp === null) {
            console.warn("Resume event without an suspend event first", entry)
            continue
          }

          cache[entry.title!.tid].suspendTimestamp = null
          cache[entry.title!.tid].resumeCount += 1
          break
      }
    }

    console.log(cache)

    return Object.entries(cache)
      .sort(([tida, a], [tidb, b]) => b.playTime - a.playTime)
      .map(([tid, info]) => {
        if (info.openCount != info.closeCount) {
          console.warn("Open and close count mismatch", info)
        }

        if (info.suspendCount < info.resumeCount) {
          console.warn("Suspend and resume count mismatch", info)
        }

        return { title: info.titleData, playTime: info.playTime, key: `${rangeHash}-${tid}` }
      })
  })

  let totalPlayTime = $derived(groupedTitles.reduce((a, i) => a + i.playTime, 0))

  $inspect(groupedTitles).with(console.log)
</script>

<div class="flex w-full flex-row items-center justify-between">
  <span class="font-bold">Total Play Time</span>
  <span class="font-bold">{Duration.fromObject({ seconds: totalPlayTime }).toFormat("hh:mm")}</span>
</div>

{#each groupedTitles as info (info.key)}
  <div>
    <ActivityCard titleInfo={info} />
  </div>
{:else}
  <div>No Data</div>
{/each}
