import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const getTitleBarMenuBarWidth = (width: number, menuBarX: number, titleBarButtonsWidth: number): number => {
  const remainingWidth = width - menuBarX - titleBarButtonsWidth
  return remainingWidth
}

export const resize = async (state: TitleBarMenuBarState, dimensions: any): Promise<TitleBarMenuBarState> => {
  const { titleBarIconWidth, titleBarButtonsWidth } = state
  const menuBarX = dimensions.x + titleBarIconWidth
  const menuBarY = dimensions.y
  const menuBarWidth = getTitleBarMenuBarWidth(dimensions.width, menuBarX, titleBarButtonsWidth)
  const menuBarHeight = dimensions.height
  return {
    ...state,
    ...dimensions,
    x: menuBarX,
    y: menuBarY,
    width: menuBarWidth,
    height: menuBarHeight,
  }
}
