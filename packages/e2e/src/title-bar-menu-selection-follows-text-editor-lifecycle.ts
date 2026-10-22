import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-selection-follows-text-editor-lifecycle'

const expectSelectionEnabled = async (api: TestApi, enabled: boolean): Promise<void> => {
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowRight()
  await api.TitleBarMenuBar.handleKeyArrowDown()
  const item = api.Locator('#Menu-0 .MenuItem', { hasText: 'Select All' })
  await api.expect(item).toBeVisible()
  await api.expect(item).toHaveAttribute('aria-disabled', enabled ? null : 'true')
  await api.TitleBarMenuBar.handleKeyEscape()
}

export const test: Test = async (api) => {
  const tmpDir = await api.FileSystem.getTmpDir({ scheme: 'memfs' })
  const uri = `${tmpDir}/selection-lifecycle.txt`
  await api.FileSystem.writeFile(uri, 'hello')
  await api.Main.openUri(uri)
  await api.expect(api.Locator('.EditorInput textarea')).toBeVisible()
  await expectSelectionEnabled(api, true)

  await api.Main.closeAllEditors()
  await expectSelectionEnabled(api, false)
}
