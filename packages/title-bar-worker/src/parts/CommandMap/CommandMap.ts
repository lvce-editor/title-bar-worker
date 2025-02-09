import * as DoRender from '../DoRender/DoRender.ts'
import * as GetCommands from '../GetCommands/GetCommands.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetTitleBarButtonsVirtualDom from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as HandleButtonsClick from '../HandleButtonsClick/HandleButtonsClick.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
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
import * as ViewletTitleBarMenuBarHandleFocus from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocus.ts'
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
  'TitleBarMenuBar.closeMenu': CloseMenu.closeMenu,
  'TitleBarMenuBar.create': TitleBarMenuBar.create,
  'TitleBarMenuBar.focus': WrapCommand.wrapCommand(Focus.focus),
  'TitleBarMenuBar.focusFirst': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusFirst.focusFirst),
  'TitleBarMenuBar.focusIndex': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusLast.focusLast),
  'TitleBarMenuBar.focusLast': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusIndex.focusIndex),
  'TitleBarMenuBar.focusNext': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusNext.focusNext),
  'TitleBarMenuBar.focusPrevious': WrapCommand.wrapCommand(ViewletTitleBarMenuBarFocusPrevious.focusPrevious),
  'TitleBarMenuBar.getCommands': GetCommands.getCommandIds,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBarMenuBar.getMenus': MenuEntries.getMenus,
  'TitleBarMenuBar.getVirtualDom': GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom,
  'TitleBarMenuBar.handleClick': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleClick.handleClick),
  'TitleBarMenuBar.handleFocus': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleFocus.handleFocus),
  'TitleBarMenuBar.handleKeyArrowDown': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowDown.handleKeyArrowDown),
  'TitleBarMenuBar.handleKeyArrowLeft': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft),
  'TitleBarMenuBar.handleKeyArrowRight': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight),
  'TitleBarMenuBar.handleKeyArrowUp': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp),
  'TitleBarMenuBar.handleKeyEnd': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyEnd.handleKeyEnd),
  'TitleBarMenuBar.handleKeyEnter': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyEnter.handleKeyEnter),
  'TitleBarMenuBar.handleKeyEscape': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyEscape.handleKeyEscape),
  'TitleBarMenuBar.saveState': SaveState.saveState,
  'TitleBarMenuBar.handleKeyHome': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeyHome.handleKeyHome),
  'TitleBarMenuBar.handleKeySpace': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleKeySpace.handleKeySpace),
  'TitleBarMenuBar.handleMenuClick': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick),
  'TitleBarMenuBar.handleMenuMouseOver': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver),
  'TitleBarMenuBar.handleMouseOut': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut),
  'TitleBarMenuBar.handleMouseOver': WrapCommand.wrapCommand(ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver),
  'TitleBarMenuBar.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'TitleBarMenuBar.render': DoRender.doRender,
  'TitleBarMenuBar.toggleIndex': WrapCommand.wrapCommand(ViewletTitleBarMenuBarToggleIndex.toggleIndex),
  'TitleBarMenuBar.toggleMenu': WrapCommand.wrapCommand(ViewletTitleBarMenuBarToggleMenu.toggleMenu),
  'TitleBarMenuBar.terminate': Terminate.terminate,
  'TitleBar.handleButtonsClick': HandleButtonsClick.handleClick,
  'TitleBar.getButtonsVirtualDom': GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom,
}
