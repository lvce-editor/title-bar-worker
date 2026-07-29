import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-view-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()

  await expectMenuKeyBinding(api, '#Menu-0', 'Command Palette', 'Ctrl+Shift+P')
  await expectMenuKeyBinding(api, '#Menu-0', 'Explorer', 'Ctrl+Shift+E')
  await expectMenuKeyBinding(api, '#Menu-0', 'Search', 'Ctrl+Shift+F')
  await expectMenuKeyBinding(api, '#Menu-0', 'Source Control', 'Ctrl+Shift+G')
  await expectMenuKeyBinding(api, '#Menu-0', 'Run', 'Ctrl+Shift+D')
  await expectMenuKeyBinding(api, '#Menu-0', 'Extensions', 'Ctrl+Shift+X')
  await expectMenuKeyBinding(api, '#Menu-0', 'Problems', 'Ctrl+Shift+M')
  await expectMenuKeyBinding(api, '#Menu-0', 'Output', 'Ctrl+Shift+U')
  await expectMenuKeyBinding(api, '#Menu-0', 'Terminal', 'Ctrl+`')
}
