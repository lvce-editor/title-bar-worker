import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-selection-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'Select All', 'Ctrl+A')
  await expectMenuKeyBinding(api, '#Menu-0', 'Copy Line Down', 'Ctrl+Shift+D')
  await expectMenuKeyBinding(api, '#Menu-0', 'Move Line Up', 'Ctrl+Shift+UpArrow')
  await expectMenuKeyBinding(api, '#Menu-0', 'Move Line Down', 'Ctrl+Shift+DownArrow')
  await expectMenuKeyBinding(api, '#Menu-0', 'Add Cursor Above', 'Alt+Shift+UpArrow')
  await expectMenuKeyBinding(api, '#Menu-0', 'Add Cursor Below', 'Alt+Shift+DownArrow')
  await expectMenuKeyBinding(api, '#Menu-0', 'Select All Occurrences', 'Alt+F3')
}
