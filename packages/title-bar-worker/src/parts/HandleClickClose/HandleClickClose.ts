import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const handleClickClose = async (state: any): Promise<any> => {
  await ParentRpc.invoke('ElectronWindow.close')
  return state
}
