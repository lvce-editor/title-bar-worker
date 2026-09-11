import { expect, jest, test } from '@jest/globals'
import { createMockRpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererProcess as RendererProcessRegistry, RendererWorker } from '@lvce-editor/rpc-registry'
import { handleMessagePort } from '../src/parts/HandleMessagePort/HandleMessagePort.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

test('connects the view directly to the renderer process', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 31)
  const { port1, port2 } = new MessageChannel()
  const rendererProcessRpc = await PlainMessagePortRpcParent.create({
    commandMap: { 'Viewlet.queueCommands': queueCommands },
    messagePort: port1,
  })
  const handleEvent = jest.fn(async (_uid: number, _value: string) => {})

  await handleMessagePort(port2, {
    'TitleBar.handleEvent': handleEvent,
  })
  expect(RendererProcess.isConnected()).toBe(true)
  await expect(RendererProcess.invoke('Viewlet.queueCommands', 7, [['Viewlet.setDom2', 7, []]])).resolves.toBe(31)
  expect(queueCommands).toHaveBeenCalledWith(7, [['Viewlet.setDom2', 7, []]])

  const requestRender = jest.fn(async (_uid: number) => {})
  RendererWorker.set(
    Object.assign(
      createMockRpc({
        commandMap: {
          'Viewlet.requestRender': requestRender,
        },
      }),
      { dispose: jest.fn() },
    ),
  )
  await rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleEvent', 'hello')
  expect(handleEvent).toHaveBeenCalledWith(7, 'hello')
  expect(requestRender).toHaveBeenCalledWith(7)
  await expect(rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'missing')).rejects.toThrow('Viewlet command not found: missing')

  await RendererProcessRegistry.dispose()
  await RendererWorker.dispose()
  await rendererProcessRpc.dispose()
})

test('keeps the renderer process rpc for a secondary direct connection', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 31)
  RendererProcessRegistry.set(
    Object.assign(
      createMockRpc({
        commandMap: { 'Viewlet.queueCommands': queueCommands },
      }),
      { dispose: jest.fn() },
    ),
  )
  const { port1, port2 } = new MessageChannel()

  await handleMessagePort(port2, {}, false)

  expect(RendererProcess.invoke('Viewlet.queueCommands', 7, [])).toBe(31)
  expect(queueCommands).toHaveBeenCalledWith(7, [])

  port1.close()
  port2.close()
  await RendererProcessRegistry.dispose()
})

test('serializes direct viewlet commands with their render requests', async () => {
  const events: string[] = []
  const firstCommand = Promise.withResolvers<void>()
  const { port1, port2 } = new MessageChannel()
  const rendererProcessRpc = await PlainMessagePortRpcParent.create({
    commandMap: {},
    messagePort: port1,
  })
  const requestRender = jest.fn(async () => {
    events.push('render')
  })
  RendererWorker.set(
    Object.assign(
      createMockRpc({
        commandMap: {
          'Viewlet.requestRender': requestRender,
        },
      }),
      { dispose: jest.fn() },
    ),
  )

  await handleMessagePort(port2, {
    'TitleBar.handleFirst': async () => {
      events.push('first-start')
      await firstCommand.promise
      events.push('first-end')
    },
    'TitleBar.handleSecond': async () => {
      events.push('second')
    },
  })

  const first = rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleFirst')
  await new Promise((resolve) => setTimeout(resolve, 0))
  const second = rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleSecond')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(events).toEqual(['first-start'])

  firstCommand.resolve()
  await Promise.all([first, second])
  expect(events).toEqual(['first-start', 'first-end', 'render', 'second', 'render'])

  await RendererWorker.dispose()
  await rendererProcessRpc.dispose()
})
