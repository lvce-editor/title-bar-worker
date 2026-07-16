import type { Test } from '@lvce-editor/test-with-playwright'
import { expectMenuKeyBinding } from './shared/menuKeyBindings.ts'

export const name = 'title-bar-menu-view-appearance-keybindings'
export const skip = 1 // TODO enable when @lvce-editor/server includes Layout.getKeyBindings

export const test: Test = async (api) => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()
  await api.Command.execute('TitleBar.handleMenuClick', 0, 3)

  await expectMenuKeyBinding(api, '#Menu-1', 'Full Screen', 'F11')
  await expectMenuKeyBinding(api, '#Menu-1', 'Primary Side Bar', 'Ctrl+B')
  await expectMenuKeyBinding(api, '#Menu-1', 'Secondary Side Bar', 'Ctrl+Alt+B')
  await expectMenuKeyBinding(api, '#Menu-1', 'Panel', 'Ctrl+J')
  await expectMenuKeyBinding(api, '#Menu-1', 'Zoom In', 'Ctrl+=')
  await expectMenuKeyBinding(api, '#Menu-1', 'Zoom Out', 'Ctrl+-')
  await expectMenuKeyBinding(api, '#Menu-1', 'Reset Zoom', 'Ctrl+NumPad0')
}
