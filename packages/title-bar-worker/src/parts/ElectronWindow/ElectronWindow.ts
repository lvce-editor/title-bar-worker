import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'

export const maximize = async (): Promise<void> => {
  await ParentRpc.invoke('ElectronWindow.maximize')
}

export const unmaximize = async (): Promise<void> => {
  await ParentRpc.invoke('ElectronWindow.unmaximize')
}

export const minimize = async (): Promise<void> => {
  await ParentRpc.invoke('ElectronWindow.minimize')
}

export const close = async (): Promise<void> => {
  await ParentRpc.invoke('ElectronWindow.close')
}
