import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const maximize = async (): Promise<void> => {
  ParentRpc.invoke('ElectronWindow.unmaximize')
}

export const unmaximize = async (): Promise<void> => {
  ParentRpc.invoke('ElectronWindow.unmaximize')
}
