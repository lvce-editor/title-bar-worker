import type { TestApi } from '@lvce-editor/test-with-playwright'

export const switchEditorItemIndex = {
  nextEditor: 0,
  nextEditorInGroup: 6,
  nextUsedEditor: 3,
  nextUsedEditorInGroup: 8,
  previousEditor: 1,
  previousEditorInGroup: 7,
  previousUsedEditor: 4,
  previousUsedEditorInGroup: 9,
} as const

const createEditorFiles = async ({ FileSystem }: TestApi, prefix: string): Promise<readonly string[]> => {
  const tmpDir = await FileSystem.getTmpDir()
  const files = [`${tmpDir}/${prefix}-1.txt`, `${tmpDir}/${prefix}-2.txt`, `${tmpDir}/${prefix}-3.txt`]
  for (const file of files) {
    await FileSystem.writeFile(file, file)
  }
  return files
}

export const arrangeEditors = async (api: TestApi, prefix: string): Promise<readonly string[]> => {
  const files = await createEditorFiles(api, prefix)
  for (const file of files) {
    await api.Main.openUri(file)
  }
  return files
}

export const arrangeEditorsInSecondGroup = async (api: TestApi, prefix: string): Promise<readonly string[]> => {
  const files = await createEditorFiles(api, prefix)
  await api.Main.openUri(files[0])
  await api.Main.splitRight()
  for (const file of files.slice(1)) {
    await api.Main.openUri(file)
  }
  return files
}

export const openSwitchEditorSubmenu = async ({ Command, TitleBarMenuBar }: TestApi): Promise<void> => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await Command.execute('TitleBar.handleMenuClick', 0, 4)
}

export const selectSwitchEditorItem = async ({ Command }: TestApi, index: number): Promise<void> => {
  await Command.execute('TitleBar.handleMenuClick', 1, index)
}

export const expectSelectedEditor = async ({ expect, Locator }: TestApi, file: string): Promise<void> => {
  const selectedTab = Locator(`.MainTabSelected[title$="${file.split('/').at(-1)}"]`)
  await expect(selectedTab).toBeVisible()
}
