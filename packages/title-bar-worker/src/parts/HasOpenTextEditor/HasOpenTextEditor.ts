import { RendererWorker } from '@lvce-editor/rpc-registry'

const nonTextEditorExtensions = new Set([
  '.avif',
  '.avi',
  '.bmp',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.m4v',
  '.mkv',
  '.mov',
  '.mp4',
  '.mpeg',
  '.mpg',
  '.ogv',
  '.png',
  '.svg',
  '.tif',
  '.tiff',
  '.webm',
  '.webp',
])

const nonTextEditorPrefixes = ['diff://?', 'extension-detail://', 'process-explorer://', 'running-extensions://']

const getPathEndIndex = (uri: string): number => {
  const queryIndex = uri.indexOf('?')
  const hashIndex = uri.indexOf('#')
  if (queryIndex === -1) {
    return hashIndex === -1 ? uri.length : hashIndex
  }
  if (hashIndex === -1) {
    return queryIndex
  }
  return Math.min(queryIndex, hashIndex)
}

const isTextEditorUri = (uri: unknown): boolean => {
  if (typeof uri !== 'string' || uri.length === 0 || nonTextEditorPrefixes.some((prefix) => uri.startsWith(prefix))) {
    return false
  }
  const pathEndIndex = getPathEndIndex(uri)
  const path = uri.slice(0, pathEndIndex)
  const lastDotIndex = path.lastIndexOf('.')
  const lastSlashIndex = path.lastIndexOf('/')
  const extension = lastDotIndex > lastSlashIndex ? path.slice(lastDotIndex).toLowerCase() : ''
  return !nonTextEditorExtensions.has(extension)
}

const hasActiveTextEditor = async (): Promise<boolean> => {
  try {
    const activeEditorId = await RendererWorker.invoke('GetActiveEditor.getActiveEditorId')
    return typeof activeEditorId === 'number' && activeEditorId >= 0
  } catch {
    return false
  }
}

export const hasOpenTextEditor = async (): Promise<boolean> => {
  try {
    const openEditorUris = await RendererWorker.invoke('GetActiveEditor.getOpenEditorUris')
    if (Array.isArray(openEditorUris)) {
      return openEditorUris.some(isTextEditorUri)
    }
  } catch {
    // Older renderer workers do not expose the open editor URI list.
  }
  return hasActiveTextEditor()
}
