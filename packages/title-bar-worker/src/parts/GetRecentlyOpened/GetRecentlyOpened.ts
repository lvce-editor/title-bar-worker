import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getRecentlyOpened = (): Promise<any> => {
  return RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
