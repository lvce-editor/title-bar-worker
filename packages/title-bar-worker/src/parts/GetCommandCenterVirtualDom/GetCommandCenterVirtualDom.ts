import { AriaRoles, VirtualDomElements } from '@lvce-editor/constants'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCommandCenterVirtualDom = (commandCenterEnabled: boolean): readonly VirtualDomNode[] => {
  if (!commandCenterEnabled) {
    return []
  }
  return [
    {
      ariaLabel: TitleBarStrings.commandCenter(),
      childCount: 1,
      className: ClassNames.TitleBarCommandCenter,
      onClick: DomEventListenerFunctions.HandleCommandCenterClick,
      onKeyDown: DomEventListenerFunctions.HandleCommandCenterKeyDown,
      role: AriaRoles.Button,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Div,
    },
    text(TitleBarStrings.search()),
  ]
}
