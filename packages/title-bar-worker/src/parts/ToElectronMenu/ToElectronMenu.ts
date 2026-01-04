import * as ToElectronMenuInternal from '../ToElectronMenuInternal/ToElectronMenuInternal.ts'

export interface ElectronMenuResult {
  readonly commandMap: any
  readonly electronMenu: any
}

export const toElectronMenu = (map: any, rootId: number): any => {
  const electronMenu: readonly any[] = []
  const commandMap = Object.create(null)
  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, rootId, electronMenu)
  return { commandMap, electronMenu }
}
