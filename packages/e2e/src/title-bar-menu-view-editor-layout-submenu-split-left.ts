import type { Test, TestApi } from '@lvce-editor/test-with-playwright'
import { selectEditorLayoutItem } from './shared/editorLayout.ts'

export const name = 'title-bar-menu-view-editor-layout-submenu-split-left'

export const test: Test = async (api: TestApi) => {
  await selectEditorLayoutItem(api, 'Split Left', 2)
  await api.Main.shouldHaveLayout({
    activeGroupIndex: 0,
    direction: 'horizontal',
    groups: [{ size: 50 }, { size: 50 }],
  })
}
