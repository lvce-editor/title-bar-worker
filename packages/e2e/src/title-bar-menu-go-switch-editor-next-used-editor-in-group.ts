import type { Test } from '@lvce-editor/test-with-playwright'
import {
  arrangeEditorsInSecondGroup,
  expectSelectedEditor,
  openSwitchEditorSubmenu,
  selectSwitchEditorItem,
  switchEditorItemIndex,
} from './shared/switchEditor.ts'

export const name = 'title-bar-menu-go-switch-editor-next-used-editor-in-group'
export const skip = 1

export const test: Test = async (api) => {
  const files = await arrangeEditorsInSecondGroup(api, 'next-used-editor-in-group')
  await api.Main.selectTab(1, 0)
  await api.Main.selectTab(1, 2)
  await api.Main.selectTab(1, 1)
  await openSwitchEditorSubmenu(api)
  await selectSwitchEditorItem(api, switchEditorItemIndex.nextUsedEditorInGroup)
  await expectSelectedEditor(api, files[0])
}
