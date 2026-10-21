import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

const getCommandCenterItems = (): Array<{ args?: string[]; command: string; label: string }> => [
  {
    command: 'QuickPick.showFile',
    label: I18NString.i18nString(UiStrings.GoToFile),
  },
  {
    command: 'QuickPick.showCommands',
    label: I18NString.i18nString(UiStrings.ShowAndRunCommands),
  },
  {
    args: ['Search'],
    command: 'Layout.openSideBarViewlet',
    label: I18NString.i18nString(UiStrings.SearchForText),
  },
  {
    args: ['symbol'],
    command: 'QuickPick.show',
    label: I18NString.i18nString(UiStrings.GoToSymbolInEditor),
  },
  {
    args: ['Run And Debug'],
    command: 'Layout.openSideBarViewlet',
    label: I18NString.i18nString(UiStrings.StartDebugging),
  },
  {
    command: 'QuickPick.showCommands',
    label: I18NString.i18nString(UiStrings.RunTask),
  },
  {
    command: 'QuickPick.showEverything',
    label: I18NString.i18nString(UiStrings.MoreCommandCenterItems),
  },
]

export const handleCommandCenterClick = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await RendererWorker.invoke('QuickPick.show', 'custom', getCommandCenterItems(), undefined, {
    executeItemCommand: true,
    mode: 'quickPick',
    placeholder: 'Search files by name (append : to go to line or @ to go to symbol)',
    waitUntil: 'visible',
  })
  return state
}
