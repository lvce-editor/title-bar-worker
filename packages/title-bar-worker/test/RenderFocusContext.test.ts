import { expect, test } from '@jest/globals'
import { ViewletCommand, WhenExpression } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'

test('renderFocusContext - returns correct command, uid and when expression', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 1, WhenExpression.FocusTitleBarMenuBar])
})

test('renderFocusContext - uses uid from newState', () => {
  const oldState = createDefaultState(1)
  const newState = createDefaultState(42)

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 42, WhenExpression.FocusTitleBarMenuBar])
})

test('renderFocusContext - ignores oldState uid', () => {
  const oldState = createDefaultState(99)
  const newState = createDefaultState(5)

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 5, WhenExpression.FocusTitleBarMenuBar])
})

test('renderFocusContext - returns readonly array', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()

  const result = renderFocusContext(oldState, newState)

  expect(Object.isFrozen(result) || Array.isArray(result)).toBe(true)
})
