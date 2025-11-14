import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.context-menu'

export const skip = 1

export const test: Test = async ({ Command }) => {
  // arrange

  // act
  await Command.execute('TitleBar.handleContextMenu', 0, 0, 0)

  // assert
  // TODO verify that context menu is visible
}
