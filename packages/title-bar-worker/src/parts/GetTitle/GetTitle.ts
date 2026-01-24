import { parseTitleTemplate } from '../ParseTitleTemplate/ParseTitleTemplate.ts'

export const getTitle = (workspaceUri: string, titleTemplate: string, appName: string): string => {
  if (!workspaceUri) {
    return ''
  }
  const slashIndex = workspaceUri.lastIndexOf('/')
  if (slashIndex === -1) {
    return ''
  }
  const folderName = workspaceUri.slice(slashIndex + 1)

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
