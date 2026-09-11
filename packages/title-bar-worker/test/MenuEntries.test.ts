import { expect, jest, test } from '@jest/globals'

const invoke = jest.fn<(...args: readonly unknown[]) => Promise<unknown>>()
const dispose = jest.fn<() => Promise<void>>()
jest.unstable_mockModule('../src/parts/LaunchMenuWorker/LaunchMenuWorker.ts', () => ({
  launchMenuWorker: async () => ({ invoke, [Symbol.asyncDispose]: dispose }),
}))
const { getMenuEntries } = await import('../src/parts/MenuEntries/MenuEntries.ts')

test('loads submenu entries from menu worker and closes the connection', async () => {
  const entries = [{ command: 'Editor.undo', flags: 0, label: 'Undo' }]
  invoke.mockResolvedValueOnce(entries)
  expect(await getMenuEntries('switchEditor', 2)).toBe(entries)
  expect(invoke).toHaveBeenLastCalledWith('Menu.getTitleBarMenuEntries', 'switchEditor', 2)
  expect(dispose).toHaveBeenCalledTimes(1)
})

test('closes the connection when loading fails', async () => {
  invoke.mockRejectedValueOnce(new Error('menu unavailable'))
  await expect(getMenuEntries('switchGroup')).rejects.toThrow('menu unavailable')
  expect(dispose).toHaveBeenCalledTimes(2)
})
