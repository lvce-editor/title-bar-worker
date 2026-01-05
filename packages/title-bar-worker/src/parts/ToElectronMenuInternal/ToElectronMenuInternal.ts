import * as Assert from '@lvce-editor/assert'
import { MenuItemFlags } from '@lvce-editor/constants'
import * as ToElectronMenuItem from '../ToElectronMenuItem/ToElectronMenuItem.ts'

export const toElectronMenuInternal = (commandMap: any, map: any, id: number, electronMenu: any): any => {
  Assert.object(commandMap)
  Assert.object(map)
  Assert.number(id)
  Assert.array(electronMenu)
  const entries = map[id]
  Assert.array(entries)
  for (const entry of entries) {
    if (entry.command) {
      commandMap[entry.label] = {
        args: entry.args,
        command: entry.command,
      }
    }
    const electronEntry = ToElectronMenuItem.toElectronMenuItem(entry)
    if (entry.flags === MenuItemFlags.SubMenu) {
      toElectronMenuInternal(commandMap, map, entry.id, electronEntry.submenu)
    }
    electronMenu.push(electronEntry)
  }
  return { commandMap, electronMenu }
}
