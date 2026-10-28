import type { IMenu } from '../IMenu/IMenu.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuHeight } from '../GetMenuHeight/GetMenuHeight.ts'
import { measureTextWidths } from '../MeasureTextWidths/MeasureTextWidths.ts'
import * as Menu from '../Menu/Menu.ts'

export const getSubMenuBounds = async (
  state: TitleBarMenuBarState,
  parent: IMenu,
  index: number,
  items: readonly MenuEntry[],
): Promise<{ width: number; x: number; y: number }> => {
  const { viewportWidth } = state
  const labels = items.map((item) => item.label)
  const widths = await measureTextWidths(labels, 400, 13, 'system-ui, Ubuntu, Droid Sans, sans-serif', 0)
  // Menu items have 28px padding on each side and 4px margins.
  const measuredWidth = Math.ceil(Math.max(Menu.getMenuWidth(), ...widths.map((width) => width + 64)))
  const width = Math.min(measuredWidth, viewportWidth)
  const right = viewportWidth
  const requestedX = parent.x + (parent.width ?? Menu.getMenuWidth())
  const x = requestedX + width <= right ? requestedX : Math.max(0, parent.x - width)
  const y = parent.y + getMenuHeight(parent.items.slice(0, index)) - 8
  return { width, x, y }
}
