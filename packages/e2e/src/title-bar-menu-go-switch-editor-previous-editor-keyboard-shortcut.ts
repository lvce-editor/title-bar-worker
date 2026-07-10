import type { Test } from '@lvce-editor/test-with-playwright'
import { arrangeEditors, expectSelectedEditor } from './shared/switchEditor.js'

export const name = 'title-bar-menu-go-switch-editor-previous-editor-keyboard-shortcut'
export const skip = 1

export const test: Test = async (api) => {
  const files = await arrangeEditors(api, 'previous-editor-keyboard-shortcut')
  await api.Main.selectTab(0, 1)
  await api.KeyBoard.press('Control+PageUp')
  await expectSelectedEditor(api, files[0])
}
