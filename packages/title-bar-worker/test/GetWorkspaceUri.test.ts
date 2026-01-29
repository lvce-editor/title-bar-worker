import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetWorkspaceUri from '../src/parts/GetWorkspaceUri/GetWorkspaceUri.ts'

test('getWorkspaceUri - returns valid uri', async () => {
  const mockUri = 'file:///home/user/workspace'

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return mockUri
    },
  })

  const result = await GetWorkspaceUri.getWorkspaceUri()
  expect(result).toBe(mockUri)
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})

test('getWorkspaceUri - returns empty string', async () => {
  const mockUri = ''

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return mockUri
    },
  })

  const result = await GetWorkspaceUri.getWorkspaceUri()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})

test('getWorkspaceUri - returns windows path uri', async () => {
  const mockUri = 'file:///C:/Users/user/workspace'

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return mockUri
    },
  })

  const result = await GetWorkspaceUri.getWorkspaceUri()
  expect(result).toBe(mockUri)
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})
