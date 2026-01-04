import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings - returns array of key bindings', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  expect(result).toHaveLength(8)
})

test('getKeyBindings - contains DownArrow binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const downArrow = result.find((binding) => binding.key === KeyCode.DownArrow)
  expect(downArrow).toBeDefined()
  expect(downArrow?.command).toBe('TitleBar.handleKeyArrowDown')
  expect(downArrow?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains UpArrow binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const upArrow = result.find((binding) => binding.key === KeyCode.UpArrow)
  expect(upArrow).toBeDefined()
  expect(upArrow?.command).toBe('TitleBar.handleKeyArrowUp')
  expect(upArrow?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains RightArrow binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const rightArrow = result.find((binding) => binding.key === KeyCode.RightArrow)
  expect(rightArrow).toBeDefined()
  expect(rightArrow?.command).toBe('TitleBar.handleKeyArrowRight')
  expect(rightArrow?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains LeftArrow binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const leftArrow = result.find((binding) => binding.key === KeyCode.LeftArrow)
  expect(leftArrow).toBeDefined()
  expect(leftArrow?.command).toBe('TitleBar.handleKeyArrowLeft')
  expect(leftArrow?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains Space binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const space = result.find((binding) => binding.key === KeyCode.Space)
  expect(space).toBeDefined()
  expect(space?.command).toBe('TitleBar.handleKeySpace')
  expect(space?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains Home binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const home = result.find((binding) => binding.key === KeyCode.Home)
  expect(home).toBeDefined()
  expect(home?.command).toBe('TitleBar.handleKeyHome')
  expect(home?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains End binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const end = result.find((binding) => binding.key === KeyCode.End)
  expect(end).toBeDefined()
  expect(end?.command).toBe('TitleBar.handleKeyEnd')
  expect(end?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - contains Escape binding', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const escape = result.find((binding) => binding.key === KeyCode.Escape)
  expect(escape).toBeDefined()
  expect(escape?.command).toBe('TitleBar.handleKeyEscape')
  expect(escape?.when).toBe(WhenExpression.FocusTitleBarMenuBar)
})

test('getKeyBindings - all bindings have FocusTitleBarMenuBar when condition', () => {
  const result: readonly ReturnType<typeof GetKeyBindings.getKeyBindings> = GetKeyBindings.getKeyBindings()
  const allHaveCorrectWhen = result.every((binding) => binding.when === WhenExpression.FocusTitleBarMenuBar)
  expect(allHaveCorrectWhen).toBe(true)
})
