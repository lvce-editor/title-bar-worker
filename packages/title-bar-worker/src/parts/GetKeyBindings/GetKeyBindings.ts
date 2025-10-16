import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyCode.DownArrow,
      command: 'TitleBar.handleKeyArrowDown',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.UpArrow,
      command: 'TitleBar.handleKeyArrowUp',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.RightArrow,
      command: 'TitleBar.handleKeyArrowRight',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.LeftArrow,
      command: 'TitleBar.handleKeyArrowLeft',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.Space,
      command: 'TitleBar.handleKeySpace',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.Home,
      command: 'TitleBar.handleKeyHome',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.End,
      command: 'TitleBar.handleKeyEnd',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.Escape,
      command: 'TitleBar.handleKeyEscape',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
  ]
}
