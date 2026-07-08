import { RendererWorker } from '@lvce-editor/rpc-registry'

export const hasActiveTextEditor = async (mainAreaUid: number): Promise<boolean> => {
  try {
    return await RendererWorker.invoke('Main.hasActiveTextEditor', mainAreaUid)
  } catch {
    return false
  }
}
