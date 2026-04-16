export const getTitleBarMenuBarWidth = (windowWidth: number, menuBarX: number, iconWidth: number, titleWidth: number): number => {
  return windowWidth / 2 - titleWidth / 2 - menuBarX - iconWidth
}