import type { TestApi } from '@lvce-editor/test-with-playwright'

export const toggleAutoSave = async (TitleBarMenuBar: TestApi['TitleBarMenuBar'], Locator: TestApi['Locator']): Promise<void> => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  // eslint-disable-next-line e2e/no-direct-click, e2e/no-menu-item-click -- select the menu command by its label, independently of menu ordering
  await Locator('.MenuItem', { hasText: 'Auto Save' }).click()
}

export const editAndBlur = async (
  Command: TestApi['Command'],
  Editor: TestApi['Editor'],
  FileSystem: TestApi['FileSystem'],
  Main: TestApi['Main'],
  filePath: string,
): Promise<void> => {
  await FileSystem.writeFile(filePath, 'before')
  await Main.openUri(filePath)
  await Command.execute('Editor.handleFocus')
  await Editor.setCursor(0, 6)
  await Editor.type('-after')
  await Command.execute('Editor.handleBlur')
}
