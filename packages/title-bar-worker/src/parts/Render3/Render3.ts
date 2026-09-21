import { ViewletCommand } from '@lvce-editor/constants'
import * as Diff3 from '../Diff3/Diff3.ts'
import * as DiffModules3 from '../DiffModules3/DiffModules3.ts'
import * as GetRenderer3 from '../GetRenderer3/GetRenderer3.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const renderDirect = async (uid: number, commands: readonly any[]): Promise<readonly any[]> => {
  const rendererWorkerCommands = commands.filter((command) => command[0] === ViewletCommand.SetFocusContext)
  const rendererProcessCommands = commands.filter((command) => command[0] !== ViewletCommand.SetFocusContext)
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}

export const render3 = async (uid: number, diffResult: readonly number[]): Promise<readonly any[]> => {
  // State may change between the renderer worker's diff and render RPCs.
  const pendingDiffs = new Set([...diffResult, ...Diff3.diff3(uid)])
  const { newState, oldState } = TitleBarMenuBarStates.get(uid)
  TitleBarMenuBarStates.set(uid, newState, newState)
  const commands: any[] = []
  for (const item of DiffModules3.numbers) {
    if (!pendingDiffs.has(item)) {
      continue
    }
    const fn = GetRenderer3.getRenderer3(item)
    const result = fn(oldState, newState)
    if (result.length > 0) {
      commands.push(result)
    }
  }
  if (RendererProcess.isConnected()) {
    return renderDirect(uid, commands)
  }
  return commands
}
