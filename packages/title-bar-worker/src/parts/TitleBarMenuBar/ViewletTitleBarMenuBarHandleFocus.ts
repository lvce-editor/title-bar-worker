import * as FocusKey from '../FocusKey/FocusKey.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const handleFocus = async (state: any): Promise<any> => {
  await ParentRpc.invoke('Focus.setFocus', FocusKey.TitleBarMenuBar)
  return state
}
