export const getTotalWidth = (entries: any): number => {
  let total = 0
  for (const entry of entries) {
    total += entry.width
  }
  return total
}
