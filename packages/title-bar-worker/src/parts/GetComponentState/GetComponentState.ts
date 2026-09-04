import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const getComponentState = (uid: number): TitleBarMenuBarState => {
  return TitleBarMenuBarStates.get(uid).newState
}
