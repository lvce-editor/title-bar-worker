import type { Test } from '@lvce-editor/test-with-playwright'
import {
  arrangeEditorsInSecondGroup,
  expectSelectedEditor,
  openSwitchEditorSubmenu,
  selectSwitchEditorItem,
  switchEditorItemIndex,
} from './shared/switchEditor.js'

export const name = 'title-bar-menu-go-switch-editor-next-editor-in-group'
export const skip = 1

export const test: Test = async (api) => {
  const files = await arrangeEditorsInSecondGroup(api, 'next-editor-in-group')
  await api.Main.selectTab(1, 1)
  await openSwitchEditorSubmenu(api)
  await selectSwitchEditorItem(api, switchEditorItemIndex.nextEditorInGroup)
  await expectSelectedEditor(api, files[2])
}
