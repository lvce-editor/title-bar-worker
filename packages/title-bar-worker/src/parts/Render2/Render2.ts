import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const render2 = async (uid: number, diffResult: readonly number[]): Promise<readonly VirtualDomNode[]> => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  TitleBarMenuBarStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
