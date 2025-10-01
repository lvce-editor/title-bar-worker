import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'
import * as NativeHostState from '../NativeHostState/NativeHostState.ts'

export const handleClickToggleMaximize = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  // TODO merge nativeHostState with state
  const isMaximized = NativeHostState.isMaximized()
  const fn = isMaximized ? ElectronWindow.unmaximize : ElectronWindow.maximize
  await fn()
  return state
}
