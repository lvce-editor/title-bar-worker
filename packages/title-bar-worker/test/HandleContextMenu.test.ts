/* eslint-disable jest/no-restricted-jest-methods */
import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { MenuIdTitleBarContextMenu } from '../src/parts/GetMenuIds/GetMenuIds.ts'

const invoke = jest.fn<(...args: readonly any[]) => Promise<void>>()
const dispose = jest.fn<() => Promise<void>>()
const port = {} as MessagePort
const create = jest.fn(async (options: { send: (port: MessagePort) => Promise<void> }) => {
  await options.send(port)
  return { dispose, invoke }
})

await jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  TransferMessagePortRpcParent: { create },
}))

const { handleContextMenu } = await import('../src/parts/HandleContextMenu/HandleContextMenu.ts')

beforeEach(() => {
  jest.clearAllMocks()
  invoke.mockResolvedValue()
})

test('handleContextMenu sends the request directly to the menu worker and disposes the connection', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Menu.prepareContextMenu'() {},
  })
  const state = { ...createDefaultState(), uid: 5 }
  await expect(handleContextMenu(state, 2, 100, 50)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['Menu.prepareContextMenu', port]])
  expect(invoke).toHaveBeenCalledWith('Menu.show2', 5, MenuIdTitleBarContextMenu, 100, 50, { menuId: MenuIdTitleBarContextMenu })
  expect(dispose).toHaveBeenCalledTimes(1)
})

test('handleContextMenu restores the browser overlay and disposes the connection on failure', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Menu.hide'() {},
    'Menu.prepareContextMenu'() {},
  })
  invoke.mockRejectedValue(new Error('menu failed'))
  await expect(handleContextMenu(createDefaultState(), 2, 100, 50)).rejects.toThrow('menu failed')
  expect(mockRpc.invocations).toEqual([['Menu.prepareContextMenu', port], ['Menu.hide']])
  expect(dispose).toHaveBeenCalledTimes(1)
})
