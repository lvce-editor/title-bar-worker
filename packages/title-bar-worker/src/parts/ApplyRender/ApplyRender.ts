import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState, diffResult: readonly number[]): readonly any[] => {
  const commands: any[] = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    const result = fn(oldState, newState)
    if (result.length > 0) {
      commands.push(result)
    }
  }
  return commands
}
