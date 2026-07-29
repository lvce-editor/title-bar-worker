import type { TestApi } from '@lvce-editor/test-with-playwright'

const autoSaveMenuItemIndex = 10

export const toggleAutoSave = async (Command: TestApi['Command'], TitleBarMenuBar: TestApi['TitleBarMenuBar']): Promise<void> => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  await Command.execute('TitleBar.handleMenuClick', 0, autoSaveMenuItemIndex)
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
