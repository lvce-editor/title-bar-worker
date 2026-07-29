import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-help-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyEnd()
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'Show All Commands', 'Ctrl+Shift+P')
  await expectMenuKeyBinding(api, '#Menu-0', 'Toggle Developer Tools', 'Ctrl+Shift+I')
}
