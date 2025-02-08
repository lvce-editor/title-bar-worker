import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import * as GetVisibleTitleBarEntries from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const hasFunctionalRender = true

export const hasFunctionalRootRender = true

const renderTitleBarEntries = {
  isEqual(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState) {
    return (
      oldState.titleBarEntries === newState.titleBarEntries &&
      oldState.width === newState.width &&
      oldState.focusedIndex === newState.focusedIndex &&
      oldState.isMenuOpen === newState.isMenuOpen
    )
  },
  apply(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState) {
    const visibleEntries = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(
      newState.titleBarEntries,
      newState.width,
      newState.focusedIndex,
      newState.isMenuOpen,
    )
    const dom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(visibleEntries)
    return ['Viewlet.setDom2', dom]
  },
}

const renderFocusedIndex = {
  isEqual(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState) {
    return oldState.focusedIndex === newState.focusedIndex && oldState.isMenuOpen === newState.isMenuOpen
  },
  apply(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState) {
    return [
      /* method */ RenderMethod.SetFocusedIndex,
      /* oldFocusedIndex */ oldState.focusedIndex,
      /* newfocusedIndex */ newState.focusedIndex,
      /* oldIsMenuOpen */ oldState.isMenuOpen,
      /* newIsMenuOpen */ newState.isMenuOpen,
    ]
  },
}

const renderMenus = {
  isEqual(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState) {
    return oldState.menus === newState.menus
  },
  apply(oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState) {
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
    return [/* method */ RenderMethod.SetMenus, /* changes */ changes, newState.uid]
  },
}

export const render = [renderTitleBarEntries, renderFocusedIndex, renderMenus]
