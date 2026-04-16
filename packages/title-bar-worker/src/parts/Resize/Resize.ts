import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const getTitleBarMenuBarWidth = (windowWidth: number, menuBarX: number, iconWidth: number, titleWidth: number): number => {
  return windowWidth / 2 - titleWidth / 2 - menuBarX - iconWidth
}

interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const resize = async (state: TitleBarMenuBarState, dimensions: Dimensions): Promise<TitleBarMenuBarState> => {
  const { iconWidth, titleWidth } = state
  const menuBarX = dimensions.x
  const menuBarY = dimensions.y
  const menuBarWidth = getTitleBarMenuBarWidth(dimensions.width, menuBarX, iconWidth, titleWidth)
  const menuBarHeight = dimensions.height
  return {
    ...state,
    ...dimensions,
    height: menuBarHeight,
    width: menuBarWidth,
    windowWidth: dimensions.width,
    x: menuBarX,
    y: menuBarY,
  }
}
