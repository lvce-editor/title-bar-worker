import { expect, test } from '@jest/globals'
import * as Workspace from '../src/parts/Workspace/Workspace.ts'

test('getHomeDir', () => {
  const result = Workspace.getHomeDir()
  expect(result).toBe('')
})
