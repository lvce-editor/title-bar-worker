import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const maximize = async (): Promise<void> => {
  ParentRpc.invoke('ElectronWindow.unmaximize')
}

export const unmaximize = async (): Promise<void> => {
  ParentRpc.invoke('ElectronWindow.unmaximize')
}

export const minimize = async (): Promise<void> => {
  ParentRpc.invoke('ElectronWindow.minimize')
}

export const close = async (): Promise<void> => {
  ParentRpc.invoke('ElectronWindow.close')
}
