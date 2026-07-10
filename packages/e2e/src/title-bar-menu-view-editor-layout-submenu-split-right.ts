import type { Test, TestApi } from '@lvce-editor/test-with-playwright'
import { selectEditorLayoutItem } from './shared/editorLayout.ts'

export const name = 'title-bar-menu-view-editor-layout-submenu-split-right'

export const test: Test = async (api: TestApi) => {
  await selectEditorLayoutItem(api, 'Split Right', 3)
  await api.Main.shouldHaveLayout({
    activeGroupIndex: 1,
    direction: 'horizontal',
    groups: [{ size: 50 }, { size: 50 }],
  })
}
