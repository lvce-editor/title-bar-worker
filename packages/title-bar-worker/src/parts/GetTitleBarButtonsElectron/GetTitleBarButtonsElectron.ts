import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getTitleBarButtonsElectron = (controlsOverlayEnabled: boolean, titleBarStyleCustom: boolean): readonly TitleBarButton[] => {
  if (controlsOverlayEnabled) {
    return []
  }
  if (titleBarStyleCustom) {
    // TODO don't render title bar buttons on windows when electron window controls overlay is enabled
    return [
      { label: TitleBarStrings.minimize(), icon: 'Minimize', id: 'Minimize', onClick: 'handleClickMinimize' },
      { label: TitleBarStrings.maximize(), icon: 'Maximize', id: 'ToggleMaximize', onClick: 'handleClickToggleMaximize' },
      { label: TitleBarStrings.close(), icon: 'ChromeClose', id: 'Close', onClick: 'handleClickClose' },
    ]
  }
  return []
}
