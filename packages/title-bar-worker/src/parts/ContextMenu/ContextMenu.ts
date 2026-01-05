import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show2 = async (uid: number, menuId: string | number, x: number, y: number, args: any): Promise<void> => {
  await RendererWorker.showContextMenu2(uid, menuId, x, y, args)
}
