import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { handleMenuClick } from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuClick.ts'
import { handleMenuMouseOver } from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts'

const itemNameRegex = /^(\d+):(\d+)$/

const getItem = (state: TitleBarMenuBarState, name: string): readonly [number, number] | undefined => {
  const { menus } = state
  const match = itemNameRegex.exec(name)
  if (!match) {
    return undefined
  }
  const level = Number(match[1])
  const index = Number(match[2])
  if (!menus[level]?.items[index]) {
    return undefined
  }
  return [level, index]
}

export const handleMenuItemClick = (state: TitleBarMenuBarState, name: string): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  const item = getItem(state, name)
  return item ? handleMenuClick(state, ...item) : state
}

export const handleMenuItemHover = (state: TitleBarMenuBarState, name: string): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  const item = getItem(state, name)
  return item ? handleMenuMouseOver(state, ...item) : state
}
