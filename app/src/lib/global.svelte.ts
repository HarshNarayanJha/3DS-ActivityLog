import type { PlayHistory } from "./types"

export class GlobalState {
  playHistory = $state<PlayHistory | null>(null)
}

export const globalState = new GlobalState()
