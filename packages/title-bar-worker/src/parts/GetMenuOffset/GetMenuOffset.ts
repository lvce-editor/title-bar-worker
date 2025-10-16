export const getMenuOffset = (x: number, clientX: number, iconWidth: number): number => {
  return x - clientX - iconWidth
}
