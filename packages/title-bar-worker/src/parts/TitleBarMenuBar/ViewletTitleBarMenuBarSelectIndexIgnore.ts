export const selectIndexIgnore = async (state: any, item: any): any => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return state
}
