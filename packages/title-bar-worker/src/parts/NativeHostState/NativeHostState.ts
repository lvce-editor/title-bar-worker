const state = {
  isMaximized: false,
  isMinimized: false,
}

export const isMaximized = (): boolean => {
  return state.isMaximized
}

export const setMaximized = (value: boolean): void => {
  state.isMaximized = value
}
