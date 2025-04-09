import * as ElectronWindow from '../ElectronWindow/ElectronWindow.ts'

export const handleClickClose = async (state: any): Promise<any> => {
  await ElectronWindow.close()
  return state
}
