import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { sleep } from '../src/parts/Sleep/Sleep.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('sleep returns the full current state', () => {
  const state = {
    ...createDefaultState(1),
    focusedIndex: 2,
    title: 'Test Workspace',
    workspaceUri: 'file:///test',
  }
  TitleBarMenuBarStates.set(1, state, state)

  expect(sleep(1)).toEqual(state)
})
