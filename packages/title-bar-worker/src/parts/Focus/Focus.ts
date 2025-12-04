import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'

export const setFocus = async (focusKey: number): Promise<void> => {
  await ParentRpc.invoke('Focus.setFocus', focusKey)
}
