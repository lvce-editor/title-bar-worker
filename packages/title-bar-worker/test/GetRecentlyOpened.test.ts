import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened', async () => {
  const mockData = [
    'file:///home/user/project1',
    '/home/user/project2',
    'C:\\Users\\user\\project2',
    'https://example.com',
    'https://example.com/',
    { label: 'project3', path: 'file:///home/user/project3' },
    'not a uri',
    'vscode-remote://ssh-remote+host/home/user/project4',
    'file:///home/user/project1',
  ]

  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return mockData
    },
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual(['file:///home/user/project1', 'https://example.com/', 'vscode-remote://ssh-remote+host/home/user/project4'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getRecentlyOpened - returns empty array for non-array result', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return undefined
    },
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})
