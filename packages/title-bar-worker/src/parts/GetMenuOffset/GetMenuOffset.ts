export const getMenuOffset = (x: number, clientX: number, iconWidth: number): number => {
  return clientX - x - iconWidth
}
