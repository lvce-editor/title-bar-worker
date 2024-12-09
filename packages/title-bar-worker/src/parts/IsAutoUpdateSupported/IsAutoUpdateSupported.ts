import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const isAutoUpdateSupported = () => {
  if (Platform.platform !== PlatformType.Electron) {
    return false
  }
  return false
}
