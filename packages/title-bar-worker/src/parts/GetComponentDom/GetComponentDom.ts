import { getComponentState } from '../GetComponentState/GetComponentState.ts'
import { renderTitleBar } from '../RenderTitleBar/RenderTitleBar.ts'

export const getComponentDom = (uid: number): readonly any[] => {
  const state = getComponentState(uid)
  return renderTitleBar(state, state)[2]
}
