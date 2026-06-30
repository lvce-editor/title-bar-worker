import { RendererWorker } from '@lvce-editor/rpc-registry'

const DriveLetterProtocolRegex = /^[a-zA-Z]:$/

const normalizeUri = (value: string): string => {
  try {
    const url = new URL(value)
    if (DriveLetterProtocolRegex.test(url.protocol)) {
      return ''
    }
    return url.href
  } catch {
    return ''
  }
}

export const getRecentlyOpened = async (): Promise<readonly string[]> => {
  const recentlyOpened: unknown = await RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
  if (!Array.isArray(recentlyOpened)) {
    return []
  }
  const seen = new Set<string>()
  const uniqueUris: string[] = []
  for (const item of recentlyOpened) {
    if (typeof item !== 'string') {
      continue
    }
    const uri = normalizeUri(item)
    if (!uri || seen.has(uri)) {
      continue
    }
    seen.add(uri)
    uniqueUris.push(uri)
  }
  return uniqueUris
}
