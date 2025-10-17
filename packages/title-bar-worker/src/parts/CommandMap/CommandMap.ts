import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create3 from '../Create3/Create3.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Diff3 from '../Diff3/Diff3.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetMenuIds from '../GetMenuIds/GetMenuIds.ts'
import * as GetTitleBarButtons from '../GetTitleBarButtons/GetTitleBarButtons.ts'
import * as GetTitleBarButtonsVirtualDom from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import * as GetTitleBarIconVirtualDom from '../GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as GetTitleVirtualDom from '../GetTitleVirtualDom/GetTitleVirtualDom.ts'
import * as HandleButtonsClick from '../HandleButtonsClick/HandleButtonsClick.ts'
import { handleClickClose } from '../HandleClickClose/HandleClickClose.ts'
import { handleClickMinimize } from '../HandleClickMinimize/HandleClickMinimize.ts'
import { handleClickToggleMaximize } from '../HandleClickToggleMaximize/HandleClickToggleMaximize.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as HandlePointerOut from '../HandlePointerOut/HandlePointerOut.ts'
import * as HandlePointerOver from '../HandlePointerOver/HandlePointerOver.ts'
import { loadContent2 } from '../LoadContent2/LoadContent2.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as Render3 from '../Render3/Render3.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import { resize } from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as TitleBarMenuBar from '../TitleBarMenuBar/TitleBarMenuBar.ts'
import * as CloseMenu from '../TitleBarMenuBar/ViewletTitleBarMenuBarCloseMenu.ts'
import * as Focus from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocus.ts'
import * as ViewletTitleBarMenuBarFocusFirst from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusFirst.ts'
import * as ViewletTitleBarMenuBarFocusIndex from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusIndex.ts'
import * as ViewletTitleBarMenuBarFocusLast from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusLast.ts'
import * as ViewletTitleBarMenuBarFocusNext from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusNext.ts'
import * as ViewletTitleBarMenuBarFocusPrevious from '../TitleBarMenuBar/ViewletTitleBarMenuBarFocusPrevious.ts'
import * as ViewletTitleBarMenuBarHandleClick from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleClick.ts'
import * as ViewletTitleBarMenuBarHandleClickAt from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleClickAt.ts'
import * as ViewletTitleBarMenuBarHandleFocus from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocus.ts'
import * as ViewletTitleBarMenuBarHandleFocusOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocusOut.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowDown from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowDown.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowLeft from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowLeft.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowRight from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowRight.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowUp from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowUp.ts'
import * as ViewletTitleBarMenuBarHandleKeyEnd from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEnd.ts'
import * as ViewletTitleBarMenuBarHandleKeyEnter from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEnter.ts'
import * as ViewletTitleBarMenuBarHandleKeyEscape from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEscape.ts'
import * as ViewletTitleBarMenuBarHandleKeyHome from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyHome.ts'
import * as ViewletTitleBarMenuBarHandleKeySpace from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeySpace.ts'
import * as ViewletTitleBarMenuBarHandleMenuClick from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuClick.ts'
import * as ViewletTitleBarMenuBarHandleMenuMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts'
import * as ViewletTitleBarMenuBarHandleMouseOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOut.ts'
import * as ViewletTitleBarMenuBarHandleMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts'
import * as ViewletTitleBarMenuBarToggleIndex from '../TitleBarMenuBar/ViewletTitleBarMenuBarToggleIndex.ts'
import * as ViewletTitleBarMenuBarToggleMenu from '../TitleBarMenuBar/ViewletTitleBarMenuBarToggleMenu.ts'
import { getCommandIds, wrapCommand } from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const commandMap = {
  'TitleBar.closeMenu': CloseMenu.closeMenu,
  'TitleBar.create': TitleBarMenuBar.create,
  'TitleBar.create3': Create3.create3,
  'TitleBar.diff2': Diff2.diff2,
  'TitleBar.diff3': Diff3.diff3,
  'TitleBar.focus': wrapCommand(Focus.focus),
  'TitleBar.focusMenuBar': wrapCommand(Focus.focus),
  'TitleBar.focusFirst': wrapCommand(ViewletTitleBarMenuBarFocusFirst.focusFirst),
  'TitleBar.focusIndex': wrapCommand(ViewletTitleBarMenuBarFocusLast.focusLast),
  'TitleBar.focusLast': wrapCommand(ViewletTitleBarMenuBarFocusIndex.focusIndex),
  'TitleBar.focusNext': wrapCommand(ViewletTitleBarMenuBarFocusNext.focusNext),
  'TitleBar.focusPrevious': wrapCommand(ViewletTitleBarMenuBarFocusPrevious.focusPrevious),
  'TitleBar.getCommandIds': getCommandIds,
  'TitleBar.getCommands': getCommandIds,
  'TitleBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBar.getMenuEntries': GetMenuIds.getMenuEntries,
  'TitleBar.getMenuIds': GetMenuIds.getMenuIds,
  'TitleBar.getMenus': MenuEntries.getMenus,
  'TitleBar.handleButtonsClick': HandleButtonsClick.handleClick,
  'TitleBar.handleClick': wrapCommand(ViewletTitleBarMenuBarHandleClick.handleClick),
  'TitleBar.handleClickAt': wrapCommand(ViewletTitleBarMenuBarHandleClickAt.handleClickAt),
  'TitleBar.handleClickClose': wrapCommand(handleClickClose),
  'TitleBar.handleClickMinimize': wrapCommand(handleClickMinimize),
  'TitleBar.handleClickToggleMaximize': wrapCommand(handleClickToggleMaximize),
  'TitleBar.handleContextMenu': HandleContextMenu.handleContextMenu,
  'TitleBar.handleFocus': wrapCommand(ViewletTitleBarMenuBarHandleFocus.handleFocus),
  'TitleBar.handleFocusOut': wrapCommand(ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut),
  'TitleBar.handleKeyArrowDown': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowDown.handleKeyArrowDown),
  'TitleBar.handleKeyArrowLeft': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft),
  'TitleBar.handleKeyArrowRight': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight),
  'TitleBar.handleKeyArrowUp': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp),
  'TitleBar.handleKeyEnd': wrapCommand(ViewletTitleBarMenuBarHandleKeyEnd.handleKeyEnd),
  'TitleBar.handleKeyEnter': wrapCommand(ViewletTitleBarMenuBarHandleKeyEnter.handleKeyEnter),
  'TitleBar.handleKeyEscape': wrapCommand(ViewletTitleBarMenuBarHandleKeyEscape.handleKeyEscape),
  'TitleBar.handleKeyHome': wrapCommand(ViewletTitleBarMenuBarHandleKeyHome.handleKeyHome),
  'TitleBar.handleKeySpace': wrapCommand(ViewletTitleBarMenuBarHandleKeySpace.handleKeySpace),
  'TitleBar.handleMenuClick': wrapCommand(ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick),
  'TitleBar.handleMenuMouseOver': wrapCommand(ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver),
  'TitleBar.handleMouseOut': wrapCommand(ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut),
  'TitleBar.handleMouseOver': wrapCommand(ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver),
  'TitleBar.handlePointerOut': wrapCommand(HandlePointerOut.handlePointerOut),
  'TitleBar.handlePointerOver': wrapCommand(HandlePointerOver.handlePointerOver),
  'TitleBar.loadContent': wrapCommand(LoadContent.loadContent),
  'TitleBar.loadContent2': wrapCommand(loadContent2),
  'TitleBar.render3': Render3.render3,
  'TitleBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'TitleBar.resize': wrapCommand(resize),
  'TitleBar.saveState': SaveState.saveState,
  'TitleBar.terminate': terminate,
  'TitleBar.toggleIndex': wrapCommand(ViewletTitleBarMenuBarToggleIndex.toggleIndex),
  'TitleBar.toggleMenu': wrapCommand(ViewletTitleBarMenuBarToggleMenu.toggleMenu),
}

// deprecated, can be removed in the future.
// currently enabled for backwards compatability
for (const [key, value] of Object.entries(commandMap)) {
  const [prefix, name] = key.split('.')
  if (prefix === 'TitleBar') {
    const alternate = `TitleBarMenuBar.${name}`
    // @ts-ignore
    commandMap[alternate] = value
  }
}
