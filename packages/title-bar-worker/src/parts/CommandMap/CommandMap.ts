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
  'TitleBar.create3': Create3.create3,
  'TitleBar.diff3': Diff3.diff3,
  'TitleBar.getButtonsVirtualDom': GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom,
  'TitleBar.getIconVirtualDom': GetTitleBarIconVirtualDom.getTitleBarIconVirtualDom,
  'TitleBar.getMenuEntries': GetMenuIds.getMenuEntries,
  'TitleBar.getMenuIds': GetMenuIds.getMenuIds,
  'TitleBar.getTitleVirtualDom': GetTitleVirtualDom.getTitleVirtualDom,
  'TitleBar.loadContent2': wrapCommand(loadContent2),
  'TitleBar.handleButtonsClick': HandleButtonsClick.handleClick,
  'TitleBar.handleClickClose': wrapCommand(handleClickClose),
  'TitleBar.handleClickMinimize': wrapCommand(handleClickMinimize),
  'TitleBar.handleClickToggleMaximize': wrapCommand(handleClickToggleMaximize),
  'TitleBar.handleContextMenu': HandleContextMenu.handleContextMenu,
  'TitleBar.render3': Render3.render3,
  'TitleBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'TitleBarMenuBar.closeMenu': CloseMenu.closeMenu,
  'TitleBarMenuBar.create': TitleBarMenuBar.create,
  'TitleBarMenuBar.diff2': Diff2.diff2,
  'TitleBarMenuBar.focus': wrapCommand(Focus.focus),
  'TitleBarMenuBar.focusFirst': wrapCommand(ViewletTitleBarMenuBarFocusFirst.focusFirst),
  'TitleBarMenuBar.focusIndex': wrapCommand(ViewletTitleBarMenuBarFocusLast.focusLast),
  'TitleBarMenuBar.focusLast': wrapCommand(ViewletTitleBarMenuBarFocusIndex.focusIndex),
  'TitleBarMenuBar.focusNext': wrapCommand(ViewletTitleBarMenuBarFocusNext.focusNext),
  'TitleBarMenuBar.focusPrevious': wrapCommand(ViewletTitleBarMenuBarFocusPrevious.focusPrevious),
  'TitleBarMenuBar.getCommands': getCommandIds,
  'TitleBarMenuBar.getCommandIds': getCommandIds,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBarMenuBar.getMenus': MenuEntries.getMenus,
  'TitleBarMenuBar.getTitleBarButtons': GetTitleBarButtons.getTitleBarButtons,
  'TitleBarMenuBar.getVirtualDom': GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom,
  'TitleBarMenuBar.handleClick': wrapCommand(ViewletTitleBarMenuBarHandleClick.handleClick),
  'TitleBarMenuBar.handleClickAt': wrapCommand(ViewletTitleBarMenuBarHandleClickAt.handleClickAt),
  'TitleBarMenuBar.handleFocus': wrapCommand(ViewletTitleBarMenuBarHandleFocus.handleFocus),
  'TitleBarMenuBar.handleFocusOut': wrapCommand(ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut),
  'TitleBarMenuBar.handleKeyArrowDown': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowDown.handleKeyArrowDown),
  'TitleBarMenuBar.handleKeyArrowLeft': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft),
  'TitleBarMenuBar.handleKeyArrowRight': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight),
  'TitleBarMenuBar.handleKeyArrowUp': wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp),
  'TitleBarMenuBar.handleKeyEnd': wrapCommand(ViewletTitleBarMenuBarHandleKeyEnd.handleKeyEnd),
  'TitleBarMenuBar.handleKeyEnter': wrapCommand(ViewletTitleBarMenuBarHandleKeyEnter.handleKeyEnter),
  'TitleBarMenuBar.handleKeyEscape': wrapCommand(ViewletTitleBarMenuBarHandleKeyEscape.handleKeyEscape),
  'TitleBarMenuBar.handleKeyHome': wrapCommand(ViewletTitleBarMenuBarHandleKeyHome.handleKeyHome),
  'TitleBarMenuBar.handleKeySpace': wrapCommand(ViewletTitleBarMenuBarHandleKeySpace.handleKeySpace),
  'TitleBarMenuBar.handleMenuClick': wrapCommand(ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick),
  'TitleBarMenuBar.handleMenuMouseOver': wrapCommand(ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver),
  'TitleBarMenuBar.handleMouseOut': wrapCommand(ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut),
  'TitleBarMenuBar.handleMouseOver': wrapCommand(ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver),
  'TitleBarMenuBar.handlePointerOut': wrapCommand(HandlePointerOut.handlePointerOut),
  'TitleBarMenuBar.handlePointerOver': wrapCommand(HandlePointerOver.handlePointerOver),
  'TitleBarMenuBar.loadContent': wrapCommand(LoadContent.loadContent),
  'TitleBarMenuBar.render2': Render2.render2,
  'TitleBarMenuBar.saveState': SaveState.saveState,
  'TitleBarMenuBar.terminate': terminate,
  'TitleBarMenuBar.toggleIndex': wrapCommand(ViewletTitleBarMenuBarToggleIndex.toggleIndex),
  'TitleBarMenuBar.toggleMenu': wrapCommand(ViewletTitleBarMenuBarToggleMenu.toggleMenu),
}
