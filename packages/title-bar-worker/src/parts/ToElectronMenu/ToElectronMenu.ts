import * as ToElectronMenuInternal from '../ToElectronMenuInternal/ToElectronMenuInternal.ts'

export const toElectronMenu = (map: any, rootId: any): any => {
  const electronMenu: readonly any[] = []
  const commandMap = Object.create(null)
  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, rootId, electronMenu)
  return { commandMap, electronMenu }
}
