export const getTitle = (workspaceUri: string): string => {
  if (!workspaceUri) {
    return ''
  }
  const slashIndex = workspaceUri.lastIndexOf('/')
  if (slashIndex === -1) {
    return ''
  }
  const baseName = workspaceUri.slice(slashIndex + 1)
  return baseName
}
