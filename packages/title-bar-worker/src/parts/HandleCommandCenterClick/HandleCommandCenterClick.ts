import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const commandCenterItems = [
  {
    command: 'QuickPick.showFile',
    label: 'Go to File',
  },
  {
    command: 'QuickPick.showCommands',
    label: 'Show and Run Commands',
  },
  {
    args: ['Search'],
    command: 'Layout.openSideBarViewlet',
    label: 'Search for Text',
  },
  {
    args: ['symbol'],
    command: 'QuickPick.show',
    label: 'Go to Symbol in Editor',
  },
  {
    args: ['Run And Debug'],
    command: 'Layout.openSideBarViewlet',
    label: 'Start Debugging',
  },
  {
    command: 'QuickPick.showCommands',
    label: 'Run Task',
  },
  {
    command: 'QuickPick.showEverything',
    label: 'More',
  },
]

export const handleCommandCenterClick = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await RendererWorker.invoke('QuickPick.show', 'custom', commandCenterItems, undefined, {
    executeItemCommand: true,
    mode: 'quickPick',
    placeholder: 'Search files by name (append : to go to line or @ to go to symbol)',
  })
  return state
}
