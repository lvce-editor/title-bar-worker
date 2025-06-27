import * as Diff2 from '../Diff2/Diff2.ts'
import * as GetCommands from '../GetCommands/GetCommands.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetMenuIds from '../GetMenuIds/GetMenuIds.ts'
import * as GetTitleBarButtons from '../GetTitleBarButtons/GetTitleBarButtons.ts'
import * as GetTitleBarButtonsVirtualDom from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import * as GetTitleBarIconVirtualDom from '../GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as GetTitleVirtualDom from '../GetTitleVirtualDom/GetTitleVirtualDom.ts'
import * as HandleButtonsClick from '../HandleButtonsClick/HandleButtonsClick.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as HandlePointerOut from '../HandlePointerOut/HandlePointerOut.ts'
import * as HandlePointerOver from '../HandlePointerOver/HandlePointerOver.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as Terminate from '../Terminate/Terminate.ts'
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
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'TitleBar.getButtonsVirtualDom': GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom,
  'TitleBar.getIconVirtualDom': GetTitleBarIconVirtualDom.getTitleBarIconVirtualDom,
  'TitleBar.getMenuEntries': GetMenuIds.getMenuEntries,
  'TitleBar.getMenuIds': GetMenuIds.getMenuIds,
  'TitleBar.getTitleVirtualDom': GetTitleVirtualDom.getTitleVirtualDom,
  'TitleBar.handleButtonsClick': HandleButtonsClick.handleClick,
  'TitleBar.handleContextMenu': HandleContextMenu.handleContextMenu,
  'TitleBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'TitleBarMenuBar.closeMenu': CloseMenu.closeMenu,
  'TitleBarMenuBar.create': TitleBarMenuBar.create,
  'TitleBarMenuBar.diff2': Diff2.diff2,
  'TitleBarMenuBar.focus': WrapCommand.wrapCommand(Focus.focus),
  'TitleBarMenuBar.focusFirst': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusFirst.focusFirst),
  'TitleBarMenuBar.focusIndex': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusLast.focusLast),
  'TitleBarMenuBar.focusLast': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusIndex.focusIndex),
  'TitleBarMenuBar.focusNext': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusNext.focusNext),
  'TitleBarMenuBar.focusPrevious': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusPrevious.focusPrevious),
  'TitleBarMenuBar.getCommands': GetCommands.getCommandIds,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBarMenuBar.getMenus': MenuEntries.getMenus,
  'TitleBarMenuBar.getTitleBarButtons': GetTitleBarButtons.getTitleBarButtons,
  'TitleBarMenuBar.getVirtualDom': GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom,
  'TitleBarMenuBar.handleClick': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleClick.handleClick),
  'TitleBarMenuBar.handleClickAt': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleClickAt.handleClickAt),
  'TitleBarMenuBar.handleFocus': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleFocus.handleFocus),
  'TitleBarMenuBar.handleFocusOut': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut),
  'TitleBarMenuBar.handleKeyArrowDown': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowDown.handleKeyArrowDown),
  'TitleBarMenuBar.handleKeyArrowLeft': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft),
  'TitleBarMenuBar.handleKeyArrowRight': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight),
  'TitleBarMenuBar.handleKeyArrowUp': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp),
  'TitleBarMenuBar.handleKeyEnd': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyEnd.handleKeyEnd),
  'TitleBarMenuBar.handleKeyEnter': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyEnter.handleKeyEnter),
  'TitleBarMenuBar.handleKeyEscape': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyEscape.handleKeyEscape),
  'TitleBarMenuBar.handleKeyHome': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyHome.handleKeyHome),
  'TitleBarMenuBar.handleKeySpace': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeySpace.handleKeySpace),
  'TitleBarMenuBar.handleMenuClick': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick),
  'TitleBarMenuBar.handleMenuMouseOver': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver),
  'TitleBarMenuBar.handleMouseOut': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut),
  'TitleBarMenuBar.handleMouseOver': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver),
  'TitleBarMenuBar.handlePointerOut': WrapCommand.wrapCommand(HandlePointerOut.handlePointerOut),
  'TitleBarMenuBar.handlePointerOver': WrapCommand.wrapCommand(HandlePointerOver.handlePointerOver),
  'TitleBarMenuBar.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'TitleBarMenuBar.render2': Render2.render2,
  'TitleBarMenuBar.saveState': SaveState.saveState,
  'TitleBarMenuBar.terminate': Terminate.terminate,
  'TitleBarMenuBar.toggleIndex': WrapCommand.wrapCommand(ViewletTitleBarMenuBarToggleIndex.toggleIndex),
  'TitleBarMenuBar.toggleMenu': WrapCommand.wrapCommand(ViewletTitleBarMenuBarToggleMenu.toggleMenu),
}
