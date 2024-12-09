export const getHomeDir = (): string => {
  return ''
}

export const pathBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}
