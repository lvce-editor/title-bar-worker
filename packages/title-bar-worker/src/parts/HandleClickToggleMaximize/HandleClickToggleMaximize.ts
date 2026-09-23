import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'

export const handleClickToggleMaximize = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await ElectronWindow.toggleMaximize()
  return state
}
