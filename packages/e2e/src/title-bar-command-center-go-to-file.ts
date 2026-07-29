import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-go-to-file'

export const test: Test = async (api) => {
  const tmpDir = await api.FileSystem.getTmpDir()
  await api.FileSystem.writeFile(`${tmpDir}/command-center-file.txt`, 'content')
  await api.Workspace.setPath(tmpDir)
  await openCommandCenter(api)

  await api.QuickPick.selectItem('Go to File', { waitUntil: 'quickPick' })
  await api.QuickPick.setValue('command-center-file')
  await api.QuickPick.selectItem('command-center-file.txt')

  await api.expect(api.Locator('.MainTabSelected[title$="command-center-file.txt"]')).toBeVisible()
}
