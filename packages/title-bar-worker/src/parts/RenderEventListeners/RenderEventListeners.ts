import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly any[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleClickMinimize,
      params: ['handleClickMinimize'],
    },
    {
      name: DomEventListenerFunctions.HandleClickToggleClose,
      params: ['handleClickClose'],
    },
    {
      name: DomEventListenerFunctions.HandleClickToggleMaximize,
      params: ['handleClickToggleMaximize'],
    },
  ]
}
