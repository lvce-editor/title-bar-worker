import { parseTitleTemplate } from '../ParseTitleTemplate/ParseTitleTemplate.ts'

interface RemoteSshWorkspace {
  readonly host: string
  readonly path: string
}

const getEndIndex = (workspaceUri: string): number => {
  let endIndex = workspaceUri.length
  while (endIndex > 0 && workspaceUri[endIndex - 1] === '/') {
    endIndex--
  }
  return endIndex
}

const getRemoteSshWorkspace = (workspaceUri: string): RemoteSshWorkspace | undefined => {
  try {
    const url = new URL(workspaceUri)
    if (url.protocol !== 'remote-ssh:' || !url.hostname) {
      return undefined
    }
    return {
      host: url.hostname,
      path: url.pathname,
    }
  } catch {
    return undefined
  }
}

const getWorkspaceTitle = (workspacePath: string, titleTemplate: string, appName: string): string => {
  const endIndex = getEndIndex(workspacePath)
  const slashIndex = workspacePath.lastIndexOf('/', endIndex - 1)
  if (slashIndex === -1) {
    return ''
  }
  const folderName = workspacePath.slice(slashIndex + 1, endIndex)

  // If titleTemplate is empty, return folderName directly
  if (!titleTemplate) {
    return folderName
  }

  // If titleTemplate doesn't contain variables, return the template itself
  if (!titleTemplate.includes('${')) {
    return titleTemplate
  }

  return parseTitleTemplate(titleTemplate, folderName, appName)
}

export const getTitle = (workspaceUri: string, titleTemplate: string, appName: string): string => {
  if (!workspaceUri) {
    return ''
  }
  const remoteSshWorkspace = getRemoteSshWorkspace(workspaceUri)
  const workspacePath = remoteSshWorkspace?.path ?? workspaceUri
  const title = getWorkspaceTitle(workspacePath, titleTemplate, appName)
  if (!remoteSshWorkspace) {
    return title
  }
  const remoteSuffix = `[SSH: ${remoteSshWorkspace.host}]`
  return title ? `${title} ${remoteSuffix}` : remoteSuffix
}
