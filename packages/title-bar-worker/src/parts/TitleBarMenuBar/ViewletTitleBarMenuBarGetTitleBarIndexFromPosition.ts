export const getTitleBarIndexFromPosition = (titleBarEntries: readonly any[], x: number, y: number): number => {
  let currentX = 0

  for (let i = 0; i < titleBarEntries.length; i++) {
    const entry = titleBarEntries[i]
    const entryWidth = entry.width
    if (x >= currentX && x < currentX + entryWidth) {
      return i
    }
    currentX += entryWidth
  }

  return -1
}
