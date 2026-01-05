import { RendererWorker } from '@lvce-editor/rpc-registry'

export const maximize = async (): Promise<void> => {
  await RendererWorker.invoke('ElectronWindow.maximize')
}

export const unmaximize = async (): Promise<void> => {
  await RendererWorker.invoke('ElectronWindow.unmaximize')
}

export const minimize = async (): Promise<void> => {
  await RendererWorker.invoke('ElectronWindow.minimize')
}

export const close = async (): Promise<void> => {
  await RendererWorker.invoke('ElectronWindow.close')
}
