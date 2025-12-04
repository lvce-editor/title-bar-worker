import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'

export const executeMenuItemCommand = async (item: any): Promise<void> => {
  await ParentRpc.invoke(item.command, ...(item.args || []))
}
