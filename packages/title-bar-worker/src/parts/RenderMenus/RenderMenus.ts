import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getMenuRootVirtualDom } from '../GetMenuRootVirtualDom/GetMenuRootVirtualDom.ts'

export const renderMenus = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  const { menuRevision = 0, menus, menuUid, uid } = newState
  if (!menuUid) {
    if (menus.length === 0) {
      return []
    }
    throw new Error('Title bar menu widget UID was not allocated')
  }
  const commands: any[] = []
  if (menus.length > 0) {
    if (oldState.menus.length === 0) {
      commands.push(['Viewlet.createFunctionalRoot', 'TitleBarMenu', menuUid, true, undefined, uid])
      commands.push(['Viewlet.setCss', menuUid, '.TitleBarMenuRoot{position:fixed;left:env(titlebar-area-x,0px);top:0;width:0;height:0}'])
      commands.push([
        'Viewlet.registerEventListeners',
        menuUid,
        [
          { name: DomEventListenerFunctions.HandleMenuItemClick, params: ['handleMenuItemClick', 'event.target.name'] },
          { name: DomEventListenerFunctions.HandleMenuItemHover, params: ['handleMenuItemHover', 'event.target.name'] },
          { name: DomEventListenerFunctions.HandleMenuRootLeave, params: ['handleMenuMouseLeave'] },
        ],
      ])
    }
    commands.push(['Viewlet.setDom2', menuUid, getMenuRootVirtualDom(menus)])
    commands.push([
      'Viewlet.registerOutsideEventListeners',
      menuUid,
      uid,
      [
        { event: 'click', ignoreSelectors: ['.TitleBarMenuBar'], params: ['closeMenu', false] },
        { event: 'focusout', ignoreSelectors: ['.TitleBarMenuBar'], params: ['closeMenu', false] },
      ],
    ])
  }
  commands.push(['Viewlet.setWidgets', uid, menuRevision, menus.length > 0 ? [menuUid] : []])
  const lastMenu = menus.at(-1)
  const opening = menus.length > oldState.menus.length
  const focusMenu = opening && lastMenu?.focusedIndex === -1 ? menus.at(-2) : lastMenu
  if (focusMenu && (!opening || focusMenu.focusedIndex !== -1)) {
    const selector =
      focusMenu.focusedIndex === -1 ? `#Menu-${focusMenu.level}` : `#Menu-${focusMenu.level} > :nth-child(${focusMenu.focusedIndex + 1})`
    commands.push(['Viewlet.focusSelector', menuUid, selector])
  }
  return commands
}
