import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexRestoreFocus = async (state: any, item: any): Promise<any> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
  return {
    ...state,
    menus: [],
    isMenuOpen: false,
  }
}
