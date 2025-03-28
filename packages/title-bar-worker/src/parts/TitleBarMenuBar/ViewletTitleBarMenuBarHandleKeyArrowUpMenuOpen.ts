import * as Menu from '../Menu/Menu.ts'

export const handleKeyArrowUpMenuOpen = (state: any): any => {
  const { menus } = state
  const menu = menus.at(-1)
  const previousIndex = Menu.getIndexToFocusPrevious(menu)
  const newMenus = [
    ...menus.slice(0, -1),
    {
      ...menu,
      focusedIndex: previousIndex,
    },
  ]
  return {
    ...state,
    menus: newMenus,
  }
}
