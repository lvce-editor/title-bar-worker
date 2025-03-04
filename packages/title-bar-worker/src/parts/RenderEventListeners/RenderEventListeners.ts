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
    {
      name: 'handleFocusIn',
      params: ['handlefocus'],
    },
    {
      name: 'handleMenuClick',
      params: ['handleMenuClick', 'event.clientX', 'event.clientY'],
    },
    {
      name: 'handleMenuMouseOver',
      params: ['handleMenuMouseOver', 'event.clientX', 'event.clientY'],
    },
    {
      name: 'handleClick',
      params: ['handleClick', 'event.button', 'event.clientX', 'event.clientY'],
    },
    {
      name: 'handlePointerOut',
      params: ['handlePointerOut', 'event.clientX', 'event.clientY'],
    },
    {
      name: 'handlePointerOver',
      params: ['handlePointerOver', 'event.clientX', 'event.clientY'],
    },
    {
      name: 'handleFocusOut',
      params: ['handleFocusOut', 'event.clientX', 'event.clientY'], // TODO maybe check relatedTarget
    },
  ]
}
