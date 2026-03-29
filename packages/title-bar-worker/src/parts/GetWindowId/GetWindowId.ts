// TODO cache window id

import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWindowId = async (): Promise<number> => {
  const windowId = await RendererWorker.getWindowId()
  return windowId
}
