<script lang="ts">
  import { SYSTEM_APPLICATIONS_TIDHIGH } from "$/lib/titledb"
  import { type TitleInfo } from "$/lib/types"
  import { Duration } from "luxon"
  import TitleIcon from "./TitleIcon.svelte"

  interface Props {
    titleInfo: TitleInfo
  }

  let { titleInfo }: Props = $props()

  const { title, playTime } = titleInfo

  console.log(`Rendering Activity Card for ${title.titleName} ${playTime}`)
</script>

<div
  class="mx-auto prose h-auto w-full rounded-xl p-4 shadow-xl dark:prose-invert"
  data-tid={title.tid.toUpperCase()}
>
  <div class="flex flex-row items-center justify-start gap-3">
    <!-- <img
        src={`https://art.gametdb.com/3ds/box/US/${title!.serial.split("-")[2]}.png?1451868970`}
        alt=""
      /> -->
    {#if title.tid.startsWith(SYSTEM_APPLICATIONS_TIDHIGH)}
      <TitleIcon src={title.iconUrl ?? ""} alt="" class="not-prose" />
      <!-- <img src={title.iconUrl} alt="" /> -->
    {:else}
      <TitleIcon src={`https://api.ghseshop.cc/${title.tid}/icon`} alt="" class="not-prose" />
      <!-- <img src={`https://api.ghseshop.cc/${title.tid}/icon`} alt="" /> -->
    {/if}

    <div>
      <h3 class="mt-0 mb-0 font-bold">{title.titleName}</h3>
      <p class="mt-0 mb-0 text-sm">{title.publisher}</p>
    </div>
  </div>
  <div class="text-end">
    <p class="font-bold">{Duration.fromDurationLike({ second: playTime }).toFormat("hh:mm")}</p>
  </div>
</div>
