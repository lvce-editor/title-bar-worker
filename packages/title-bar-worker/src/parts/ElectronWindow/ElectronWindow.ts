import { RendererWorker } from '@lvce-editor/rpc-registry'

export const maximize = async (): Promise<void> => {
  await RendererWorker.maximizeWindow()
}

export const unmaximize = async (): Promise<void> => {
  await RendererWorker.unmaximizeWindow()
}

export const minimize = async (): Promise<void> => {
  await RendererWorker.minimizeWindow()
}

export const close = async (): Promise<void> => {
  await RendererWorker.closeWindow()
}
