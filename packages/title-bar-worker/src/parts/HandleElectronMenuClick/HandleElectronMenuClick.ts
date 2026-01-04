import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const handleElectronMenuClick = async (state: TitleBarMenuBarState, label: string): Promise<TitleBarMenuBarState> => {
  const { commandMap } = state
  const commandPair = commandMap[label]
  if (!commandPair) {
    throw new Error(`no command found for ${label}`)
  }
  const { args = [], command } = commandPair
  await RendererWorker.invoke(command, ...args)
  return state
}
