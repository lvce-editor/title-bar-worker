import { MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const hasOpenTextEditor = async (titleBarUid: number): Promise<boolean> => {
  try {
    const mainAreaUid = await RendererWorker.invoke('Viewlet.getMainAreaUid', titleBarUid)
    if (typeof mainAreaUid !== 'number') {
      return false
    }
    return await MainAreaWorker.invoke('MainArea.hasOpenTextEditor', mainAreaUid)
  } catch {
    return false
  }
}
