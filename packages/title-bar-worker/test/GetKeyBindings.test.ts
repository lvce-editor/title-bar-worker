import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings - should return title bar menu navigation bindings', () => {
  const result = GetKeyBindings.getKeyBindings()

  expect(result).toHaveLength(8)
  expect(result).toEqual([
    { command: 'TitleBar.handleKeyArrowDown', key: KeyCode.DownArrow, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeyArrowUp', key: KeyCode.UpArrow, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeyArrowRight', key: KeyCode.RightArrow, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeyArrowLeft', key: KeyCode.LeftArrow, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeySpace', key: KeyCode.Space, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeyHome', key: KeyCode.Home, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeyEnd', key: KeyCode.End, when: WhenExpression.FocusTitleBarMenuBar },
    { command: 'TitleBar.handleKeyEscape', key: KeyCode.Escape, when: WhenExpression.FocusTitleBarMenuBar },
  ])
})
