import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.command-center-hidden-by-default'

export const test: Test = async ({ expect, Locator }) => {
  const commandCenter = Locator('.TitleBarCommandCenter')

  await expect(commandCenter).toHaveCount(0)
}
