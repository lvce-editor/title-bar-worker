import { parseTitleTemplate } from '../ParseTitleTemplate/ParseTitleTemplate.ts'
import { getPath } from '../PathDisplay/PathDisplay.ts'

interface RemoteSshWorkspace {
  readonly host: string
  readonly path: string
}

interface DevContainerWorkspace {
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

const getDevContainerWorkspace = (workspaceUri: string): DevContainerWorkspace | undefined => {
  // Workspace title-change events currently carry the resolved path, where
  // devcontainer paths end in a marker instead of retaining their URI scheme.
  if (workspaceUri.endsWith('!')) {
    return {
      path: workspaceUri,
    }
  }
  try {
    const url = new URL(workspaceUri)
    if (url.protocol !== 'devcontainers:') {
      return undefined
    }
    return {
      path: url.pathname,
    }
  } catch {
    return undefined
  }
}

const getWorkspaceTitle = (workspacePath: string, titleTemplate: string, appName: string, decodeFolderName = false): string => {
  const endIndex = getEndIndex(workspacePath)
  const slashIndex = Math.max(workspacePath.lastIndexOf('/', endIndex - 1), workspacePath.lastIndexOf('\\', endIndex - 1))
  const encodedFolderName = workspacePath.slice(slashIndex + 1, endIndex)
  let folderName = encodedFolderName
  if (decodeFolderName) {
    try {
      folderName = decodeURIComponent(encodedFolderName)
    } catch {
      // Keep malformed URI segments visible rather than failing title rendering.
    }
  }

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
    return appName
  }
  const remoteSshWorkspace = getRemoteSshWorkspace(workspaceUri)
  const devContainerWorkspace = getDevContainerWorkspace(workspaceUri)
  const workspacePath = remoteSshWorkspace?.path ?? devContainerWorkspace?.path ?? getPath(workspaceUri)
  const displayWorkspacePath = getDevContainerDisplayPath(devContainerWorkspace, workspacePath)
  const title = getWorkspaceTitle(displayWorkspacePath, titleTemplate, appName, Boolean(devContainerWorkspace))
  if (devContainerWorkspace) {
    const devContainerSuffix = '[devcontainer]'
    return title ? `${title} ${devContainerSuffix}` : devContainerSuffix
  }
  if (!remoteSshWorkspace) {
    return title || appName
  }
  const remoteSuffix = `[SSH: ${remoteSshWorkspace.host}]`
  return title ? `${title} ${remoteSuffix}` : remoteSuffix
}

const getDevContainerDisplayPath = (devContainerWorkspace: DevContainerWorkspace | undefined, workspacePath: string): string => {
  if (!devContainerWorkspace || !workspacePath.endsWith('!')) {
    return workspacePath
  }
  return workspacePath.slice(0, -1)
}
