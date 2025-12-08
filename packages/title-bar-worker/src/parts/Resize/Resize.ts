import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const getTitleBarMenuBarWidth = (width: number, menuBarX: number, titleBarButtonsWidth: number): number => {
  const remainingWidth = width - menuBarX - titleBarButtonsWidth
  return remainingWidth
}

interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const resize = async (state: TitleBarMenuBarState, dimensions: Dimensions): Promise<TitleBarMenuBarState> => {
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
