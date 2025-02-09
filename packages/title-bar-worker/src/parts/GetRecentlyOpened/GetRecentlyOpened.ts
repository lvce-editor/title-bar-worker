import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const getRecentlyOpened = (): Promise<any> => {
  return ParentRpc.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
