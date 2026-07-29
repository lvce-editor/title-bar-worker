import * as Protocol from '../Protocol/Protocol.ts'

const HomeDirRegex = /^\/(?:home|Users)\/[^/]+/

const startsWithHomeDir = (homeDir: string, path: string): boolean => {
  return path === homeDir || path.startsWith(`${homeDir}/`)
}

export const getPath = (uri: string): string => {
  if (uri.startsWith(Protocol.File)) {
    return uri.slice(Protocol.File.length)
  }
  return uri
}

export const getHomeDir = (uri: string): string => {
  const path = getPath(uri)
  const match = HomeDirRegex.exec(path)
  return match?.[0] || ''
}

export const getTitle = (homeDir: string, uri: string): string => {
  if (!uri) {
    return ''
  }
  const path = getPath(uri)
  if (path !== uri) {
    if (homeDir && startsWithHomeDir(homeDir, path)) {
      return `~${path.slice(homeDir.length)}`
    }
    return path
  }
  // TODO tree shake this out in web
  if (homeDir && startsWithHomeDir(homeDir, uri)) {
    return `~${uri.slice(homeDir.length)}`
  }
  return uri
}
