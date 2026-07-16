import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-autosave-toggle'

const openFileMenu = async (TitleBarMenuBar): Promise<void> => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
}

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  await Command.execute('Preferences.update', {
    'files.autoSave': 'off',
  })

  const autoSave = Locator('#Menu-0 .MenuItem', { hasText: 'Auto Save' })

  await openFileMenu(TitleBarMenuBar)
  await expect(autoSave).toHaveAttribute('aria-checked', 'false')

  await Command.execute('TitleBar.handleMenuClick', 0, 10)

  await openFileMenu(TitleBarMenuBar)
  await expect(autoSave).toHaveAttribute('aria-checked', 'true')

  await Command.execute('TitleBar.handleMenuClick', 0, 10)

  await openFileMenu(TitleBarMenuBar)
  await expect(autoSave).toHaveAttribute('aria-checked', 'false')

  await TitleBarMenuBar.handleKeyEscape()
  await expect(autoSave).toBeHidden()
}
