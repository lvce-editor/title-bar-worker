import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const wrapCommand = (fn: any): any => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = TitleBarMenuBarStates.get(uid)
    const newerState = await fn(newState, ...args)
    TitleBarMenuBarStates.set(uid, newState, newerState)
  }
  return wrapped
}
