import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const setFocus = async (focusKey: number): Promise<void> => {
  await ParentRpc.invoke('Focus.setFocus', focusKey)
}
