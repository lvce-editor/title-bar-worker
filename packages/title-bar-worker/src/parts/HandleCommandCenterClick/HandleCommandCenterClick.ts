import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const commandCenterItems = [
  {
    label: 'Go to File',
    value: 'file',
  },
  {
    label: 'Show and Run Commands',
    value: 'commands',
  },
  {
    label: 'Search for Text',
    value: 'search',
  },
  {
    label: 'Go to Symbol in Editor',
    value: 'symbol',
  },
  {
    label: 'Start Debugging',
    value: 'debug',
  },
  {
    label: 'Run Task',
    value: 'task',
  },
  {
    label: 'More',
    value: 'more',
  },
]

export const handleCommandCenterClick = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await RendererWorker.invoke('QuickPick.showCustom', commandCenterItems, {
    mode: 'quickPick',
    placeholder: 'Search files by name (append : to go to line or @ to go to symbol)',
    waitUntil: 'visible',
  })
  return state
}
