import * as Protocol from '../Protocol/Protocol.ts'

export const getTitle = (homeDir: string, uri: string): string => {
  if (!uri) {
    return ''
  }
  // TODO tree shake this out in web
  if (homeDir && uri.startsWith(homeDir)) {
    return `~${uri.slice(homeDir.length)}`
  }
  if (uri.startsWith(Protocol.File)) {
    return uri.slice(Protocol.File.length)
  }
  return uri
}
