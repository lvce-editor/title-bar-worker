import type { Test, TestApi } from '@lvce-editor/test-with-playwright'
import { selectEditorLayoutItem } from './shared/editorLayout.ts'

export const name = 'title-bar-menu-view-editor-layout-submenu-split-down'

export const test: Test = async (api: TestApi) => {
  await selectEditorLayoutItem(api, 'Split Down', 1)
  await api.Main.shouldHaveLayout({
    activeGroupIndex: 1,
    direction: 'vertical',
    groups: [{ size: 50 }, { size: 50 }],
  })
}
