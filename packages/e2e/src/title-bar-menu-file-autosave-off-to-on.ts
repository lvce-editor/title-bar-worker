import type { Test } from '@lvce-editor/test-with-playwright'
import { editAndBlur, toggleAutoSave } from './shared/autoSave.ts'

export const name = 'title-bar-menu-file-autosave-off-to-on'

export const test: Test = async ({ Command, Editor, expect, FileSystem, Locator, Main, TitleBarMenuBar, Workspace }) => {
  await Command.execute('Preferences.update', {
    'files.autoSave': 'off',
  })
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  const selectedModifiedTab = Locator('.MainTabSelected.MainTabModified')

  const autoSaveOffFile = `${tmpDir}/auto-save-off.txt`
  await editAndBlur(Command, Editor, FileSystem, Main, autoSaveOffFile)
  await FileSystem.shouldHaveFile(autoSaveOffFile, 'before')
  await expect(selectedModifiedTab).toHaveCount(1)

  await toggleAutoSave(Command, TitleBarMenuBar)

  const autoSaveOnFile = `${tmpDir}/auto-save-on.txt`
  await editAndBlur(Command, Editor, FileSystem, Main, autoSaveOnFile)
  await FileSystem.shouldHaveFile(autoSaveOnFile, 'before-after')
  await expect(selectedModifiedTab).toHaveCount(0)

  await Command.execute('Preferences.update', {
    'files.autoSave': 'off',
  })
}
