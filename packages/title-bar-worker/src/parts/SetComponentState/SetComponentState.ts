import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const applyComponentState = (currentState: TitleBarMenuBarState, state: TitleBarMenuBarState): TitleBarMenuBarState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Title Bar state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Title Bar state uid must remain ${currentUid}`)
  }
  return state
}

export const setComponentState = TitleBarMenuBarStates.wrapCommand(applyComponentState)
