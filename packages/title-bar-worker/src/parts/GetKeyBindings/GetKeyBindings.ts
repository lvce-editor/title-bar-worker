import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyCode.DownArrow,
      command: 'TitleBarMenuBar.handleKeyArrowDown',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.UpArrow,
      command: 'TitleBarMenuBar.handleKeyArrowUp',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.RightArrow,
      command: 'TitleBarMenuBar.handleKeyArrowRight',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.LeftArrow,
      command: 'TitleBarMenuBar.handleKeyArrowLeft',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.Space,
      command: 'TitleBarMenuBar.handleKeySpace',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.Home,
      command: 'TitleBarMenuBar.handleKeyHome',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.End,
      command: 'TitleBarMenuBar.handleKeyEnd',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      key: KeyCode.Escape,
      command: 'TitleBarMenuBar.handleKeyEscape',
      when: WhenExpression.FocusTitleBarMenuBar,
    },
  ]
}
