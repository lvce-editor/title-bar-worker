import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-file-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'New File', 'Ctrl+N')
  await expectMenuKeyBinding(api, '#Menu-0', 'New Window', 'Ctrl+Shift+N')
  await expectMenuKeyBinding(api, '#Menu-0', 'Open File', 'Ctrl+O')
  await expectMenuKeyBinding(api, '#Menu-0', 'Save', 'Ctrl+S')
}
