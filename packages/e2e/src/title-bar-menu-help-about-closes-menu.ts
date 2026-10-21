import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-about-closes-menu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  const menu = Locator('#Menu-0')
  const aboutDialog = Locator('[role="dialog"]')
  const aboutButton = Locator('[role="dialog"] button[name="Ok"]')
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  const helpEntry = Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })

  // Open About with the mouse and verify menu dismissal and focus restoration.
  // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- exercises the DOM click behavior
  await helpEntry.click()
  await expect(menu).toBeVisible()
  const aboutItem = Locator('.MenuItem', { hasText: 'About' })
  // eslint-disable-next-line e2e/no-menu-item-click, e2e/no-direct-click, @typescript-eslint/no-deprecated -- tests the real menu item DOM click that opens About
  await aboutItem.click()
  await expect(aboutItem).toBeHidden()
  await expect(menu).toBeHidden()
  await expect(aboutDialog).toBeVisible()
  // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- dismisses the About dialog through its button
  await aboutButton.click()
  await expect(aboutDialog).toBeHidden()
  await expect(helpEntry).toHaveAttribute('id', null)
  await expect(titleBarMenuBar).toHaveAttribute('aria-activedescendant', null)

  // Verify the cleared menu can be used again with the mouse and keyboard.
  // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- verifies menu reopening after dialog dismissal
  await helpEntry.click()
  await expect(menu).toBeVisible()
  await TitleBarMenuBar.handleKeyEscape()
  await expect(menu).toBeHidden()
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await expect(helpEntry).toHaveAttribute('id', 'TitleBarEntryActive')

  // Verify keyboard navigation still works after dismissing About.
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await TitleBarMenuBar.handleKeyArrowDown()
  await expect(menu).toBeVisible()
  await TitleBarMenuBar.handleKeyEnd()
  await expect(aboutItem).toBeFocused()
  await TitleBarMenuBar.handleKeyEscape()
  await expect(menu).toBeHidden()
}
