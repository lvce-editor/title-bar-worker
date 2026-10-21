import { MainAreaWorker } from '@lvce-editor/rpc-registry'

export const hasOpenTextEditor = async (mainAreaUid: number | undefined): Promise<boolean> => {
  if (typeof mainAreaUid !== 'number') {
    return false
  }
  try {
    return await MainAreaWorker.invoke('MainArea.hasOpenTextEditor', mainAreaUid)
  } catch {
    return false
  }
}
