import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderFocusedIndex from '../RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderMenus from '../RenderMenus/RenderMenus.ts'
import * as RenderTitleBar from '../RenderTitleBar/RenderTitleBar.ts'

export const getRenderer3 = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderEntries:
      return RenderTitleBar.renderTitleBar
    case DiffType.RenderFocusedIndex:
      return RenderFocusedIndex.renderFocusedIndex
    case DiffType.RenderMenus:
      return RenderMenus.renderMenus
    default:
      throw new Error('unknown renderer')
  }
}
