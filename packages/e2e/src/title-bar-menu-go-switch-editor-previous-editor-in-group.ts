import type { Test } from '@lvce-editor/test-with-playwright'
import {
  arrangeEditorsInSecondGroup,
  expectSelectedEditor,
  openSwitchEditorSubmenu,
  selectSwitchEditorItem,
  switchEditorItemIndex,
} from './shared/switchEditor.js'

export const name = 'title-bar-menu-go-switch-editor-previous-editor-in-group'
export const skip = 1

export const test: Test = async (api) => {
  const files = await arrangeEditorsInSecondGroup(api, 'previous-editor-in-group')
  await api.Main.selectTab(1, 1)
  await openSwitchEditorSubmenu(api)
  await selectSwitchEditorItem(api, switchEditorItemIndex.previousEditorInGroup)
  await expectSelectedEditor(api, files[0])
}
