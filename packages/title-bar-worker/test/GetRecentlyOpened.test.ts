import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened', async () => {
  const mockData = [
    { path: '/home/user/project1', label: 'project1' },
    { path: '/home/user/project2', label: 'project2' },
  ]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return mockData
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual(mockData)
})
