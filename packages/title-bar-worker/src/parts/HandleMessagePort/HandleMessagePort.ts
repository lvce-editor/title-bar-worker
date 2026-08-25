import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const commandQueues = new Map<number, Promise<void>>()

export const handleMessagePort = async (
  port: MessagePort,
  viewletCommandMap: Readonly<Record<string, unknown>>,
  setAsRendererProcess = true,
): Promise<void> => {
  const executeViewletCommand = async (uid: number, command: string, ...args: readonly any[]): Promise<void> => {
    const fn = viewletCommandMap[`TitleBar.${command}`]
    if (typeof fn !== 'function') {
      throw new TypeError(`Viewlet command not found: ${command}`)
    }
    const previous = commandQueues.get(uid)
    const { promise: next, resolve } = Promise.withResolvers<void>()
    commandQueues.set(uid, next)
    if (previous) {
      await previous
    }
    try {
      await fn(uid, ...args)
      await RendererWorker.invoke('Viewlet.requestRender', uid)
    } finally {
      resolve()
      if (commandQueues.get(uid) === next) {
        commandQueues.delete(uid)
      }
    }
  }

  const rpc = await PlainMessagePortRpc.create({
    commandMap: {
      'Viewlet.executeViewletCommand': executeViewletCommand,
    },
    messagePort: port,
  })
  if (setAsRendererProcess) {
    RendererProcess.set(rpc)
  }
}
