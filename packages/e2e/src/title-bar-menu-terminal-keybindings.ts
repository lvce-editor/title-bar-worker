import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-terminal-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  for (let i = 0; i < 6; i++) {
    await api.TitleBarMenuBar.handleKeyArrowRight()
  }
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'New Terminal', 'Ctrl+`')
}
