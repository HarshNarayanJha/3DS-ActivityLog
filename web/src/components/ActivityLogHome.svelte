<script lang="ts">
import { resolve } from "$app/paths"

import ActivityHomeCard from "./ui/ActivityHomeCard.svelte"
</script>

<div class="mx-auto aspect-[1.38] h-auto w-full bg-gray-200 text-neutral-800">
  <div class="flex h-full w-full flex-col items-center p-4">
    <ActivityHomeCard class="self-start">
      <a href={resolve("/records")}>
        <div class="grid h-full w-full grid-cols-[1fr_3fr] items-center justify-items-center gap-8">
          <span id="icon" class="h-20 w-20 bg-green-500">Icon</span>
          <span class="text-center text-3xl font-medium"> Daily <br /> Records </span>
        </div>
      </a>
    </ActivityHomeCard>

    <ActivityHomeCard class="self-end">
      <a href={resolve("/library")}>
        <div class="grid h-full w-full grid-cols-[1fr_3fr] items-center justify-items-center gap-8">
          <span id="icon" class="h-20 w-20 bg-green-500">Icon</span>
          <span class="text-center text-3xl font-medium"> Software <br /> Library </span>
        </div>
      </a>
    </ActivityHomeCard>
  </div>
</div>
