import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'
import { wakeUp } from '../src/parts/WakeUp/WakeUp.ts'

test('wakeUp restores the full rendered state', () => {
  const sleepState = {
    ...createDefaultState(2),
    focusedIndex: 2,
    title: 'Test Workspace',
    workspaceUri: 'file:///test',
  }

  wakeUp(sleepState)

  expect(TitleBarMenuBarStates.get(2)).toEqual({
    newState: sleepState,
    oldState: sleepState,
    scheduledState: sleepState,
  })
})
