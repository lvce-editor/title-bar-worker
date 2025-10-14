import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
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
      name: DomEventListenerFunctions.HandleFocusIn,
      params: ['handleFocus'],
    },
    {
      name: DomEventListenerFunctions.HandleMenuClick,
      params: ['handleMenuClick', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleMenuMouseOver,
      params: ['handleMenuMouseOver', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleClick,
      params: ['handleClickAt', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandlePointerOut,
      params: ['handlePointerOut', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandlePointerOver,
      params: ['handlePointerOver', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleFocusOut,
      params: ['handleFocusOut', EventExpression.ClientX, EventExpression.ClientY], // TODO maybe check relatedTarget
    },
  ]
}
