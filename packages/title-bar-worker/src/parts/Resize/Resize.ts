import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const getTitleBarMenuBarWidth = (width: number, menuBarX: number, titleBarButtonsWidth: number): number => {
  const remainingWidth = width - menuBarX - titleBarButtonsWidth
  return remainingWidth
}

export const resize = async (state: TitleBarMenuBarState, dimensions: any): Promise<TitleBarMenuBarState> => {
  const { titleBarButtonsWidth } = state
  const menuBarX = dimensions.x
  const menuBarY = dimensions.y
  const menuBarWidth = getTitleBarMenuBarWidth(dimensions.width, menuBarX, titleBarButtonsWidth)
  const menuBarHeight = dimensions.height
  return {
    ...state,
    ...dimensions,
    height: menuBarHeight,
    width: menuBarWidth,
    x: menuBarX,
    y: menuBarY,
  }
}
