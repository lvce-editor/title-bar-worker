import type { Test } from '@lvce-editor/test-with-playwright'
import {
  arrangeEditors,
  expectSelectedEditor,
  openSwitchEditorSubmenu,
  selectSwitchEditorItem,
  switchEditorItemIndex,
} from './shared/switchEditor.js'

export const name = 'title-bar-menu-go-switch-editor-next-editor-wraps'
export const skip = 1

export const test: Test = async (api) => {
  const files = await arrangeEditors(api, 'next-editor-wraps')
  await openSwitchEditorSubmenu(api)
  await selectSwitchEditorItem(api, switchEditorItemIndex.nextEditor)
  await expectSelectedEditor(api, files[0])
}
