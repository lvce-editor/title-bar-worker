import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.command-center-hidden'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('TitleBar.hideCommandCenter', 0)
  const commandCenter = Locator('.TitleBarCommandCenter')

  await expect(commandCenter).toHaveCount(0)
}
