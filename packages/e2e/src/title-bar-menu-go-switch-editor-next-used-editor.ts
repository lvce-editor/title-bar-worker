import type { Test } from '@lvce-editor/test-with-playwright'
import {
  arrangeEditors,
  expectSelectedEditor,
  openSwitchEditorSubmenu,
  selectSwitchEditorItem,
  switchEditorItemIndex,
} from './shared/switchEditor.js'

export const name = 'title-bar-menu-go-switch-editor-next-used-editor'
export const skip = 1

export const test: Test = async (api) => {
  const files = await arrangeEditors(api, 'next-used-editor')
  await api.Main.selectTab(0, 0)
  await api.Main.selectTab(0, 2)
  await api.Main.selectTab(0, 1)
  await openSwitchEditorSubmenu(api)
  await selectSwitchEditorItem(api, switchEditorItemIndex.nextUsedEditor)
  await expectSelectedEditor(api, files[0])
}
