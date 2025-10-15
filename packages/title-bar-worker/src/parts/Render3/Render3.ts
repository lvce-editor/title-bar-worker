import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetRenderer3 from '../GetRenderer3/GetRenderer3.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const render3 = async (uid: number, diffResult: readonly number[]): Promise<readonly VirtualDomNode[]> => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  TitleBarMenuBarStates.set(uid, newState, newState)
  const commands: any[] = []
  for (const item of diffResult) {
    const fn = GetRenderer3.getRenderer3(item)
    const result = fn(oldState, newState)
    if (result.length > 0) {
      commands.push(result)
    }
  }
  return commands
}
