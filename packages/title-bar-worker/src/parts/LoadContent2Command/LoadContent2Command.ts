import { loadContent2 } from '../LoadContent2/LoadContent2.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const loadContent2Command = async (uid: number): Promise<void> => {
  const { newState } = TitleBarMenuBarStates.get(uid)
  const loadedState = await loadContent2(newState)
  const latest = TitleBarMenuBarStates.get(uid)
  const nextState =
    latest.newState.workspaceUri === newState.workspaceUri
      ? {
          ...latest.newState,
          ...loadedState,
        }
      : {
          ...latest.newState,
          ...loadedState,
          title: latest.newState.title,
          titleWidth: latest.newState.titleWidth,
          workspaceUri: latest.newState.workspaceUri,
        }
  TitleBarMenuBarStates.set(uid, latest.oldState, nextState, nextState)
}
