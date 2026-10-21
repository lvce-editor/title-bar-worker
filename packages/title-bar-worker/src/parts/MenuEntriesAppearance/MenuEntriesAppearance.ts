import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

const notImplementedArgs = [{ message: 'not implemented' }]
const sideBarLeft = 1
const sideBarRight = 2

const getSideBarPosition = async (): Promise<number> => {
  try {
    return await RendererWorker.invoke('Layout.getSideBarPosition')
  } catch {
    return sideBarRight
  }
}

const entry = (id: string, label: string, keyboardShortCut = ''): MenuEntry => {
  return {
    args: notImplementedArgs,
    command: 'Dialog.showMessage',
    flags: MenuItemFlags.None,
    id,
    keyboardShortCut,
    label,
  }
}

const checkedEntry = (id: string, label: string, keyboardShortCut = ''): MenuEntry => {
  return {
    args: notImplementedArgs,
    command: 'Dialog.showMessage',
    flags: MenuItemFlags.Checked,
    id,
    keyboardShortCut,
    label,
  }
}

const commandEntry = (id: string, label: string, command: string, keyboardShortCut = '', flags = MenuItemFlags.None): MenuEntry => {
  return {
    command,
    flags,
    id,
    keyboardShortCut,
    label,
  }
}

export const getMenuEntries = async (sideBarPosition?: number): Promise<readonly MenuEntry[]> => {
  const currentSideBarPosition = sideBarPosition ?? (await getSideBarPosition())
  const movePrimarySideBarEntry =
    currentSideBarPosition === sideBarLeft
      ? commandEntry('movePrimarySideBarRight', I18NString.i18nString(UiStrings.MovePrimarySideBarRight), 'Layout.moveSideBarRight')
      : commandEntry('movePrimarySideBarLeft', I18NString.i18nString(UiStrings.MovePrimarySideBarLeft), 'Layout.moveSideBarLeft')

  return [
    {
      command: 'Window.toggleFullScreen',
      flags: MenuItemFlags.None,
      id: 'fullScreen',
      keyboardShortCut: 'F11',
      label: TitleBarStrings.fullScreen(),
    },
    entry('zenMode', I18NString.i18nString(UiStrings.ZenMode), 'Ctrl+K Z'),
    entry('centeredLayout', I18NString.i18nString(UiStrings.CenteredLayout)),
    MenuEntrySeparator.menuEntrySeparator,
    checkedEntry('menuBar', I18NString.i18nString(UiStrings.MenuBar)),
    commandEntry('primarySideBar', I18NString.i18nString(UiStrings.PrimarySideBar), 'Layout.toggleSideBar', 'Ctrl+B'),
    commandEntry('secondarySideBar', I18NString.i18nString(UiStrings.SecondarySideBar), 'Layout.toggleSecondarySideBar', 'Ctrl+Alt+B'),
    commandEntry('statusBar', I18NString.i18nString(UiStrings.StatusBar), 'Layout.toggleStatusBar', '', MenuItemFlags.Checked),
    commandEntry('panel', I18NString.i18nString(UiStrings.Panel), 'Layout.togglePanel', 'Ctrl+J', MenuItemFlags.Checked),
    MenuEntrySeparator.menuEntrySeparator,
    movePrimarySideBarEntry,
    entry('activityBarPosition', I18NString.i18nString(UiStrings.ActivityBarPosition)),
    entry('panelPosition', I18NString.i18nString(UiStrings.PanelPosition)),
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: 'alignPanel',
      label: I18NString.i18nString(UiStrings.AlignPanel),
    },
    entry('tabBar', I18NString.i18nString(UiStrings.TabBar)),
    entry('editorActionsPosition', I18NString.i18nString(UiStrings.EditorActionsPosition)),
    MenuEntrySeparator.menuEntrySeparator,
    entry('minimap', I18NString.i18nString(UiStrings.Minimap)),
    entry('breadcrumbs', I18NString.i18nString(UiStrings.Breadcrumbs)),
    entry('stickyScroll', I18NString.i18nString(UiStrings.StickyScroll)),
    entry('renderWhitespace', I18NString.i18nString(UiStrings.RenderWhitespace)),
    checkedEntry('renderControlCharacters', I18NString.i18nString(UiStrings.RenderControlCharacters)),
    MenuEntrySeparator.menuEntrySeparator,
    commandEntry('zoomIn', I18NString.i18nString(UiStrings.ZoomIn), 'Window.zoomIn', 'Ctrl+='),
    commandEntry('zoomOut', I18NString.i18nString(UiStrings.ZoomOut), 'Window.zoomOut', 'Ctrl+-'),
    commandEntry('resetZoom', I18NString.i18nString(UiStrings.ResetZoom), 'Window.zoomReset', 'Ctrl+NumPad0'),
  ]
}

export const getAlignPanelMenuEntries = async (): Promise<readonly MenuEntry[]> => {
  let currentAlignment: string
  try {
    currentAlignment = await RendererWorker.invoke('Layout.getPanelAlignment')
  } catch {
    currentAlignment = 'justify'
  }
  return (['center', 'justify', 'left', 'right'] as const).map((alignment) => ({
    args: [alignment],
    command: 'Layout.setPanelAlignment',
    flags: currentAlignment === alignment ? MenuItemFlags.Checked : MenuItemFlags.None,
    id: `alignPanel${alignment[0].toUpperCase()}${alignment.slice(1)}`,
    label: I18NString.i18nString(UiStrings[(alignment[0].toUpperCase() + alignment.slice(1)) as 'Center' | 'Justify' | 'Left' | 'Right']),
  }))
}
