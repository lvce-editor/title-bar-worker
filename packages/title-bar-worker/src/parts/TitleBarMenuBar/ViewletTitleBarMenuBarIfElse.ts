export const ifElse = (menuOpenFunction: any, menuClosedFunction: any): any => {
  const ifElseFunction = (state: any, ...args: any): any => {
    const { isMenuOpen } = state
    if (isMenuOpen) {
      return menuOpenFunction(state, ...args)
    }
    return menuClosedFunction(state, ...args)
  }
  return ifElseFunction
}
