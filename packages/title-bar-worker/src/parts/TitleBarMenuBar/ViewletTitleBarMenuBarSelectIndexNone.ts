import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexNone = async (state: any, item: any): Promise<any> => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return {
    ...state,
    menus: [],
    isMenuOpen: false,
  }
}
