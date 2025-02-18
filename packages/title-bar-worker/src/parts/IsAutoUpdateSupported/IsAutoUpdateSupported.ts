import * as PlatformType from '../PlatformType/PlatformType.ts'

export const isAutoUpdateSupported = (platform: number): boolean => {
  if (platform !== PlatformType.Electron) {
    return false
  }
  return false
}
