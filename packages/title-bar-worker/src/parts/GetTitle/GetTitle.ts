export const getTitle = (workspaceUri: string): string => {
  if (!workspaceUri) {
    return ''
  }
  const slashIndex = workspaceUri.lastIndexOf('/')
  const baseName = workspaceUri.slice(slashIndex)
  return baseName
}
