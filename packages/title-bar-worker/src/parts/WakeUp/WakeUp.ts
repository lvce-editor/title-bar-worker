import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const wakeUp = (sleepState: TitleBarMenuBarState): void => {
  TitleBarMenuBarStates.set(sleepState.uid, sleepState, sleepState)
}
