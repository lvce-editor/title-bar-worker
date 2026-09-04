import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const applyComponentState = (currentState: TitleBarMenuBarState, state: TitleBarMenuBarState): TitleBarMenuBarState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Title Bar state must be an object')
  }
  if (state.uid !== currentState.uid) {
    throw new Error(`Title Bar state uid must remain ${currentState.uid}`)
  }
  return state
}

export const setComponentState = TitleBarMenuBarStates.wrapCommand(applyComponentState)
