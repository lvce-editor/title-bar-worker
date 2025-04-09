import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'
import * as NativeHostState from '../NativeHostState/NativeHostState.ts'

export const handleClickToggleMaximize = async (state: any): Promise<any> => {
  const isMaximized = NativeHostState.isMaximized()
  const fn = isMaximized ? ElectronWindow.unmaximize : ElectronWindow.maximize
  await fn()
  return state
}
