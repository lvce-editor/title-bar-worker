import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'

export const getRecentlyOpened = (): Promise<any> => {
  return ParentRpc.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
