import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-edit-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'Undo', 'Ctrl+Z')
  await expectMenuKeyBinding(api, '#Menu-0', 'Redo', 'Ctrl+Y')
  await expectMenuKeyBinding(api, '#Menu-0', 'Cut', 'Ctrl+X')
  await expectMenuKeyBinding(api, '#Menu-0', 'Copy', 'Ctrl+C')
  await expectMenuKeyBinding(api, '#Menu-0', 'Paste', 'Ctrl+V')
  await expectMenuKeyBinding(api, '#Menu-0', 'Toggle Line Comment', 'Ctrl+/')
}
