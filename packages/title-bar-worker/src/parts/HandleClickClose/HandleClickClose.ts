import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'

export const handleClickClose = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await ElectronWindow.close()
  return state
}
