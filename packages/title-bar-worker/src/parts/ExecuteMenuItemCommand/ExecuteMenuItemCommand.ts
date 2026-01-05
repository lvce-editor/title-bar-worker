import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const executeMenuItemCommand = async (item: MenuEntry): Promise<void> => {
  await RendererWorker.invoke(item.command, ...(item.args || []))
}
