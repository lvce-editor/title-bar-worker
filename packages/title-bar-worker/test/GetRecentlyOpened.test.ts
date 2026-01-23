import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened', async () => {
  const mockData = [
    { label: 'project1', path: '/home/user/project1' },
    { label: 'project2', path: '/home/user/project2' },
  ]

  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return mockData
    },
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual(mockData)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})
