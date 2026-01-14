import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderEntries from '../RenderEntries/RenderEntries.ts'
import { renderFocusContext } from '../RenderFocusContext/RenderFocusContext.ts'
import * as RenderFocusedIndex from '../RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderMenus from '../RenderMenus/RenderMenus.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderEntries:
      return RenderEntries.renderEntries
    case DiffType.RenderFocusContext:
      return renderFocusContext
    case DiffType.RenderFocusedIndex:
      return RenderFocusedIndex.renderFocusedIndex
    case DiffType.RenderMenus:
      return RenderMenus.renderMenus
    default:
      throw new Error('unknown renderer')
  }
}
