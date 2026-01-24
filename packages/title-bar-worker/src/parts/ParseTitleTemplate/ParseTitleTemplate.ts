/**
 * Parses a title template string and replaces special variables with their values.
 * Supported variables:
 * - ${folderName} - The name of the workspace folder
 * - ${appName} - The name of the application
 *
 * @param template - The template string to parse
 * @param folderName - The name of the workspace folder
 * @param appName - The name of the application
 * @returns The parsed title string
 */
export const parseTitleTemplate = (template: string, folderName: string, appName: string): string => {
  return template.replaceAll('${folderName}', folderName).replaceAll('${appName}', appName)
}
