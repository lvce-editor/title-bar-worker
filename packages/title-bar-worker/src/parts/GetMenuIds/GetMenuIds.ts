import { menus } from '../Menus/Menus.ts'

export const MenuIdTitleBarContextMenu = 50

export const getMenuIds = (): readonly number[] => {
  return [...menus.map((menu) => menu.id), MenuIdTitleBarContextMenu]
}

export const getMenuEntries = async (id: number, platform: number): Promise<readonly any[]> => {
  const menu = menus.find((item) => item.id === id)
  if (!menu) {
    return []
  }
  return menu.getMenuEntries(platform)
}
