import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'

export const handleClickMinimize = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await ElectronWindow.minimize()
  return state
}
