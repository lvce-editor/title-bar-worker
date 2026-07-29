import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-view-editor-layout-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()
  await api.Command.execute('TitleBar.handleMenuClick', 0, 4)

  await expectMenuKeyBinding(api, '#Menu-1', 'Split Right', 'Ctrl+\\')
  await expectMenuKeyBinding(api, '#Menu-1', 'Flip Layout', 'Alt+Shift+8')
}
