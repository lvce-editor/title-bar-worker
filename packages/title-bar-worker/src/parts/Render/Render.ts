import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as DiffEntries from '../DiffEntries/DiffEntries.ts'
import * as DiffFocusedIndex from '../DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffMenus from '../DiffMenus/DiffMenus.ts'
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import * as RenderEntries from '../RenderEntries/RenderEntries.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const hasFunctionalRender = true

export const hasFunctionalRootRender = true

const renderTitleBarEntries = {
  isEqual: DiffEntries.isEqual,
  apply: RenderEntries.renderEntries,
}

const renderFocusedIndex = {
  isEqual: DiffFocusedIndex.isEqual,
  apply(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): any {
    return [
      'Viewlet.send',
      newState.uid,
      /* method */ RenderMethod.SetFocusedIndex,
      /* oldFocusedIndex */ oldState.focusedIndex,
      /* newfocusedIndex */ newState.focusedIndex,
      /* oldIsMenuOpen */ oldState.isMenuOpen,
      /* newIsMenuOpen */ newState.isMenuOpen,
    ]
  },
}

const renderMenus = {
  isEqual: DiffMenus.isEqual,
  apply(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): any {
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
    return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetMenus, /* changes */ changes, newState.uid]
  },
}

export const render = [renderTitleBarEntries, renderFocusedIndex, renderMenus]
