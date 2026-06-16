import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'
import * as NativeHostState from '../NativeHostState/NativeHostState.ts'

export const handleClickToggleMaximize = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  // TODO merge nativeHostState with state
  const isMaximized = NativeHostState.isMaximized()
  if (isMaximized) {
    await ElectronWindow.unmaximize()
  } else {
    await ElectronWindow.maximize()
  }
  return state
}
