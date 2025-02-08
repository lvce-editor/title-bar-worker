import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const executeMenuItemCommand = async (item: any): Promise<void> => {
  await ParentRpc.invoke(item.command, ...(item.args || []))
}
