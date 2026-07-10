import type { Test, TestApi } from '@lvce-editor/test-with-playwright'
import { selectEditorLayoutItem } from './shared/editorLayout.ts'

export const name = 'title-bar-menu-view-editor-layout-submenu-split-up'

export const test: Test = async (api: TestApi) => {
  await selectEditorLayoutItem(api, 'Split Up', 0)
  await api.Main.shouldHaveLayout({
    activeGroupIndex: 0,
    direction: 'vertical',
    groups: [{ size: 50 }, { size: 50 }],
  })
}
