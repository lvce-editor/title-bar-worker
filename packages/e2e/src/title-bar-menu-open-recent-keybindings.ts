import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-open-recent-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowDown()
  await api.Command.execute('TitleBar.handleMenuClick', 0, 5)

  await expectMenuKeyBinding(api, '#Menu-1', 'More ...', 'Ctrl+Shift+R')
}
