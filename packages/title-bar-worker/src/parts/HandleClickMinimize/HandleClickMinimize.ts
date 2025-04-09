import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'

export const handleClickMinimize = async (state: any): Promise<any> => {
  await ElectronWindow.minimize()
  return state
}
