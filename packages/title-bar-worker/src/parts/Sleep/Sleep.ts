import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const sleep = (uid: number): TitleBarMenuBarState => {
  const { newState } = TitleBarMenuBarStates.get(uid)
  return newState
}
