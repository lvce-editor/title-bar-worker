import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { launchMenuWorker } from '../LaunchMenuWorker/LaunchMenuWorker.ts'

export const getMenuEntries = async (id: string | number, platform: number = 0): Promise<readonly MenuEntry[]> => {
  const rpc = await launchMenuWorker()
  try {
    return await rpc.invoke('Menu.getTitleBarMenuEntries', id, platform)
  } finally {
    await rpc[Symbol.asyncDispose]()
  }
}
