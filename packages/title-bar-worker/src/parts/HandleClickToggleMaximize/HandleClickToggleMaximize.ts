import * as NativeHostState from '../NativeHostState/NativeHostState.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const handleClickToggleMaximize = async (state: any): Promise<any> => {
  await (NativeHostState.isMaximized() ? ParentRpc.invoke('ElectronWindow.unmaximize') : ParentRpc.invoke('ElectronWindow.maximize'))
  return state
}
