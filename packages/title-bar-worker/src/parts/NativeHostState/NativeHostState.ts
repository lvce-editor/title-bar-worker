export const state = {
  isMaximized: false,
  isMinimized: false,
}

export const setMaximized = (value: boolean): void => {
  state.isMaximized = value
}

export const setMinimized = (value: boolean): void => {
  state.isMinimized = value
}

export const isMaximized = (): boolean => {
  return state.isMaximized
}
