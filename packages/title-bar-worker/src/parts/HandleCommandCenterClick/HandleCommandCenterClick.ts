import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

interface CommandCenterAction {
  readonly args?: readonly unknown[]
  readonly command: string
}

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

const commandCenterActions: Record<string, CommandCenterAction> = {
  commands: {
    command: 'QuickPick.showCommands',
  },
  debug: {
    command: 'Run.focus',
  },
  file: {
    command: 'QuickPick.showFile',
  },
  more: {
    command: 'QuickPick.showEverything',
  },
  search: {
    command: 'Search.focus',
  },
  symbol: {
    args: ['symbol'],
    command: 'QuickPick.show',
  },
  task: {
    command: 'QuickPick.showCommands',
  },
}

export const handleCommandCenterClick = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const selectedValue = (await RendererWorker.invoke('QuickPick.showCustom', commandCenterItems, {
    mode: 'quickPick',
    placeholder: 'Search files by name (append : to go to line or @ to go to symbol)',
  })) as string | undefined
  const action = selectedValue ? commandCenterActions[selectedValue] : undefined
  if (action) {
    await RendererWorker.invoke(action.command, ...(action.args || []))
  }
  return state
}
