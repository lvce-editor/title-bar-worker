import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import * as GetTitleBarButtonsElectron from '../GetTitleBarButtonsElectron/GetTitleBarButtonsElectron.ts'
import * as GetTitleBarButtonsRemote from '../GetTitleBarButtonsRemote/GetTitleBarButtonsRemote.ts'
import * as GetTitleBarButtonsWeb from '../GetTitleBarButtonsWeb/GetTitleBarButtonsWeb.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getTitleBarButtons = (platform: number, controlsOverlayEnabled: boolean, titleBarStyleCustom: boolean): readonly TitleBarButton[] => {
  switch (platform) {
    case PlatformType.Electron:
      return GetTitleBarButtonsElectron.getTitleBarButtonsElectron(controlsOverlayEnabled, titleBarStyleCustom)
    case PlatformType.Remote:
      return GetTitleBarButtonsRemote.getTitleBarButtonsRemote()
    case PlatformType.Web:
      return GetTitleBarButtonsWeb.getTitleBarButtonsWeb()
    default:
      return []
  }
}
