import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitleBarMenuBarWidth } from '../GetTitleBarMenuBarWidth/GetTitleBarMenuBarWidth.ts'

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
    x: menuBarX,
    y: menuBarY,
  }
}
