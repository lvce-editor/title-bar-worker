import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderMenus = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  const oldMenus = oldState.menus
  const newMenus = newState.menus
  const oldLength = oldMenus.length
  const newLength = newMenus.length
  const commonLength = Math.min(oldLength, newLength)
  const changes = []
  for (let i = 0; i < commonLength; i++) {
    const oldMenu = oldMenus[i]
    const newMenu = newMenus[i]
    if (oldMenu !== newMenu) {
      const visible = GetVisibleMenuItems.getVisible(newMenu.items, newMenu.focusedIndex, newMenu.expanded, newMenu.level)
      const dom = GetMenuVirtualDom.getMenuVirtualDom(visible).slice(1)
      changes.push([/* method */ 'updateMenu', newMenu, /* newLength */ newLength, dom])
    }
  }
  const difference = newLength - oldLength
  if (difference > 0) {
    const newMenu = newMenus.at(-1)
    const visible = GetVisibleMenuItems.getVisible(newMenu.items, newMenu.focusedIndex, newMenu.expanded, newMenu.level)
    const dom = GetMenuVirtualDom.getMenuVirtualDom(visible).slice(1)
    changes.push(['addMenu', newMenu, dom])
  } else if (difference < 0) {
    changes.push(['closeMenus', newLength])
  }
  const { uid } = newState
  return ['Viewlet.send', uid, /* method */ RenderMethod.SetMenus, /* changes */ changes, uid]
}
