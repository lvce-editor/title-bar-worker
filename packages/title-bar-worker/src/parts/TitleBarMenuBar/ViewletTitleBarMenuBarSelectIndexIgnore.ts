export const selectIndexIgnore = async (state: any, item: any): Promise<any> => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return state
}