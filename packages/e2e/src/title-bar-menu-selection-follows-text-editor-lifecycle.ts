import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-selection-follows-text-editor-lifecycle'

const expectMenuItemEnabled = async (api: TestApi, menuOffset: number, label: string, enabled: boolean): Promise<void> => {
  await api.TitleBarMenuBar.focus()
  for (let index = 0; index < menuOffset; index++) {
    await api.TitleBarMenuBar.handleKeyArrowRight()
  }
  await api.TitleBarMenuBar.handleKeyArrowDown()
  const item = api.Locator('#Menu-0 .MenuItem', { hasText: label }).first()
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
  await expectMenuItemEnabled(api, 0, 'Save', true)
  await expectMenuItemEnabled(api, 2, 'Select All', true)

  await api.Main.closeAllEditors()
  await expectMenuItemEnabled(api, 0, 'Save', false)
  await expectMenuItemEnabled(api, 2, 'Select All', false)
}
