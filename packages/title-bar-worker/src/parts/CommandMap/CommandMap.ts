import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as TitleBarMenuBar from '../TitleBarMenuBar/TitleBarMenuBar.ts'
import * as CloseMenu from '../TitleBarMenuBar/ViewletTitleBarMenuBarCloseMenu.ts'
import * as Focus from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocus.ts'
import * as ViewletTitleBarMenuBarFocusFirst from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusFirst.ts'
import * as ViewletTitleBarMenuBarFocusLast from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusLast.ts'
import * as ViewletTitleBarMenuBarFocusNext from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusNext.ts'
import * as ViewletTitleBarMenuBarFocusPrevious from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusPrevious.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowDown from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowDown.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowLeft from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowLeft.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowRight from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowRight.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowUp from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowUp.ts'
import * as ViewletTitleBarMenuBarHandleKeyEnd from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEnd.ts'
import * as ViewletTitleBarMenuBarHandleKeyEnter from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEnter.ts'
import * as ViewletTitleBarMenuBarHandleKeyEscape from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEscape.ts'
import * as ViewletTitleBarMenuBarHandleKeyHome from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyHome.ts'
import * as ViewletTitleBarMenuBarHandleKeySpace from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeySpace.ts'
import * as ViewletTitleBarMenuBarFocusIndex from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusIndex.ts'
import * as ViewletTitleBarMenuBarHandleMenuMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts'
import * as ViewletTitleBarMenuBarHandleMenuClick from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuClick.ts'
import * as ViewletTitleBarMenuBarHandleMouseOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOut.ts'
import * as ViewletTitleBarMenuBarHandleMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts'

export const commandMap = {
  'TitleBarMenuBar.create': TitleBarMenuBar.create,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBarMenuBar.getMenus': MenuEntries.getMenus,
  'TitleBarMenuBar.getVirtualDom': GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom,
  'TitleBarMenuBar.loadContent': TitleBarMenuBar.loadContent,
  'TitleBarMenuBar.closeMenu': CloseMenu.closeMenu,
  'TitleBarMenuBar.focus': Focus.focus,
  'TitleBarMenuBar.focusFirst': ViewletTitleBarMenuBarFocusFirst.focusFirst,
  'TitleBarMenuBar.focusIndex': ViewletTitleBarMenuBarFocusLast.focusLast,
  'TitleBarMenuBar.focusLast': ViewletTitleBarMenuBarFocusIndex.focusIndex,
  'TitleBarMenuBar.focusNext': ViewletTitleBarMenuBarFocusNext.focusNext,
  'TitleBarMenuBar.focusPrevious': ViewletTitleBarMenuBarFocusPrevious.focusPrevious,
  'TitleBarMenuBar.handleKeyArrowDown': ViewletTitleBarMenuBarHandleKeyArrowDown.handleKeyArrowDown,
  'TitleBarMenuBar.handleKeyArrowLeft': ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft,
  'TitleBarMenuBar.handleKeyArrowRight': ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight,
  'TitleBarMenuBar.handleKeyArrowUp': ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp,
  'TitleBarMenuBar.handleKeyEnd': ViewletTitleBarMenuBarHandleKeyEnd.handleKeyEnd,
  'TitleBarMenuBar.handleKeyEnter': ViewletTitleBarMenuBarHandleKeyEnter.handleKeyEnter,
  'TitleBarMenuBar.handleKeyEscape': ViewletTitleBarMenuBarHandleKeyEscape.handleKeyEscape,
  'TitleBarMenuBar.handleKeyHome': ViewletTitleBarMenuBarHandleKeyHome.handleKeyHome,
  'TitleBarMenuBar.handleKeySpace': ViewletTitleBarMenuBarHandleKeySpace.handleKeySpace,
  'TitleBarMenuBar.handleMenuClick': ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick,
  'TitleBarMenuBar.handleMenuMouseOver': ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver,
  'TitleBarMenuBar.handleMouseOver': ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver,
  'TitleBarMenuBar.handleMouseOut': ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut,
  'TitleBarMenuBar.toggleIndex': () => import('./ViewletTitleBarMenuBarToggleIndex.js'),
  'TitleBarMenuBar.toggleMenu': () => import('./ViewletTitleBarMenuBarToggleMenu.js'),
  'TitleBarMenuBar.handleClick': () => import('./ViewletTitleBarMenuBarHandleClick.js'),
  'TitleBarMenuBar.handleFocus': () => import('./ViewletTitleBarMenuBarHandleFocus.js'),
}
