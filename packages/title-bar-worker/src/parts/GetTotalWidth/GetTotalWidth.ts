export const getTotalWidth = (entries: readonly any[]): number => {
  let total = 0
  for (const entry of entries) {
    total += entry.width
  }
  return total
}
