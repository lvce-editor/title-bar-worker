import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-remote-ssh-workspace'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  const title = Locator('.TitleBarTitle')

  // act
  await Command.execute('Workspace.setUri', 'remote-ssh://user@example.com/home/user/my-project', '/')

  // assert
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project [SSH: example.com]')
}
