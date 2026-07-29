import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

interface CommandInfo {
  readonly args?: readonly any[]
  readonly command: string
}

const toCommandInfo = (entry: MenuEntry): CommandInfo => {
  return {
    args: entry.args,
    command: entry.command,
  }
}

export const addMenuEntryKeyBindings = async (entries: readonly MenuEntry[]): Promise<readonly MenuEntry[]> => {
  try {
    const commands = entries.map(toCommandInfo)
    const keys = await RendererWorker.invoke('Layout.getKeyBindings', commands)
    if (!keys.some(Boolean)) {
      return entries
    }
    return entries.map((entry, index) => {
      const key = keys[index]
      if (!key) {
        return entry
      }
      return {
        ...entry,
        key,
      }
    })
  } catch {
    return entries
  }
}
