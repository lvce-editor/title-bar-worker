import { parseTitleTemplate } from '../ParseTitleTemplate/ParseTitleTemplate.ts'

const getEndIndex = (workspaceUri: string): number => {
  let endIndex = workspaceUri.length
  while (endIndex > 0 && workspaceUri[endIndex - 1] === '/') {
    endIndex--
  }
  return endIndex
}

export const getTitle = (workspaceUri: string, titleTemplate: string, appName: string): string => {
  if (!workspaceUri) {
    return ''
  }
  const endIndex = getEndIndex(workspaceUri)
  const slashIndex = workspaceUri.lastIndexOf('/', endIndex - 1)
  if (slashIndex === -1) {
    return ''
  }
  const folderName = workspaceUri.slice(slashIndex + 1, endIndex)

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
