import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-go-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'Go to File...', 'Ctrl+P')
  await expectMenuKeyBinding(api, '#Menu-0', 'Go to Symbol in Workspace...', 'Ctrl+T')
}
