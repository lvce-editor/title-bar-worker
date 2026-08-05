import type { Test } from '@lvce-editor/test-with-playwright'
import { createEndFocusesLastMenuItemTest } from './shared/menuItem.ts'

export const name = 'title-bar-menu-navigation-end-focuses-last-selection-item'

const testMenuNavigation = createEndFocusesLastMenuItemTest(2, 'Select All Occurrences')

export const test: Test = async (api) => {
  const tmpDir = await api.FileSystem.getTmpDir({ scheme: 'memfs' })
  const testFile = `${tmpDir}/selection-navigation-end.txt`
  await api.FileSystem.writeFile(testFile, 'hello')
  await api.Main.openUri(testFile)
  await testMenuNavigation(api)
}
