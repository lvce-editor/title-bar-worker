import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getTitleBarButtonsElectron = (controlsOverlayEnabled: boolean, titleBarStyleCustom: boolean): readonly TitleBarButton[] => {
  if (controlsOverlayEnabled) {
    return []
  }
  if (titleBarStyleCustom) {
    // TODO don't render title bar buttons on windows when electron window controls overlay is enabled
    return [
      { icon: 'Minimize', id: 'Minimize', label: TitleBarStrings.minimize(), onClick: DomEventListenerFunctions.HandleClickMinimize },
      { icon: 'Maximize', id: 'ToggleMaximize', label: TitleBarStrings.maximize(), onClick: DomEventListenerFunctions.HandleClickToggleMaximize },
      { icon: 'ChromeClose', id: 'Close', label: TitleBarStrings.close(), onClick: DomEventListenerFunctions.HandleClickClose },
    ]
  }
  return []
}
