import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened', async () => {
  const mockData = [
    { path: '/home/user/project1', label: 'project1' },
    { path: '/home/user/project2', label: 'project2' },
  ]

  const commandMap = {
    'RecentlyOpened.getRecentlyOpened': () => mockData
  }
  const mockRpc = MockRpc.create({
    commandMap,
    invoke: (method: string) => {
      const fn = commandMap[method]
      if (fn) {
        return fn()
      }
      throw new Error(`unexpected method ${method}`)
    }
  })
  ParentRpc.set(mockRpc)

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual(mockData)
})
