import * as Workspace from '../Workspace/Workspace.ts'

export const getTitle = (uri: string): string => {
  if (!uri) {
    return ''
  }
  const homeDir = Workspace.getHomeDir()
  // TODO tree shake this out in web
  if (homeDir && uri.startsWith(homeDir)) {
    return `~${uri.slice(homeDir.length)}`
  }
  return uri
}
