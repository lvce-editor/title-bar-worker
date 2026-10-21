export const name = 'viewlet.title-bar-menu-help-about-closes-menu'

export const test = async ({ expect, Locator, TitleBarMenuBar }) => {
  const menu = Locator('#Menu-0')
  const aboutDialog = Locator('[role="dialog"]')
  const aboutButton = Locator('[role="dialog"] button[name="Ok"]')
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  const helpEntry = Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })

  // Open About with the mouse and verify menu dismissal and focus restoration.
  await helpEntry.click()
  await expect(menu).toBeVisible()
  const aboutItem = Locator('.MenuItem', { hasText: 'About' })
  await aboutItem.click()
  await expect(menu).toBeHidden()
  await expect(aboutDialog).toBeVisible()
  await aboutButton.click()
  await expect(aboutDialog).toBeHidden()
  await expect(helpEntry).toHaveAttribute('id', null)
  await expect(titleBarMenuBar).toHaveAttribute('aria-activedescendant', null)

  // Verify the cleared menu can be used again with the mouse and keyboard.
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
