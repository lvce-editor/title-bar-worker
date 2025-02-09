import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const handleClickMinimize = async (state: any): Promise<any> => {
  await ParentRpc.invoke('ElectronWindow.minimize')
  return state
}
