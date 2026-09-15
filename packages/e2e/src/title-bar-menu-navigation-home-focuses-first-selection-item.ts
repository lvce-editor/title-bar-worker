import type { Test } from '@lvce-editor/test-with-playwright'
import { createHomeFocusesFirstMenuItemTest } from './shared/menuItem.ts'

export const name = 'title-bar-menu-navigation-home-focuses-first-selection-item'

const testMenuNavigation = createHomeFocusesFirstMenuItemTest(2, 'Select All')

export const test: Test = async (api) => {
  const tmpDir = await api.FileSystem.getTmpDir({ scheme: 'memfs' })
  const testFile = `${tmpDir}/selection-navigation-home.txt`
  await api.FileSystem.writeFile(testFile, 'hello')
  await api.Main.openUri(testFile)
  await testMenuNavigation(api)
}
