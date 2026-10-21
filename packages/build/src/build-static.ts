import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'

const require = createRequire(join(root, 'packages', 'server', 'package.json'))

const sharedProcessUrl = pathToFileURL(require.resolve('@lvce-editor/shared-process')).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/explorer-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerDirectory = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const occurrence = '`' + remoteUrl + '`'
const replacement = '`' + '${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/title-bar-worker/dist/titleBarWorkerMain.js' + '`'
let rendererWorkerPath = ''
let content = ''
for (const name of await readdir(rendererWorkerDirectory)) {
  if (!name.endsWith('.js')) continue
  const path = join(rendererWorkerDirectory, name)
  const source = await readFile(path, 'utf8')
  if (source.includes(occurrence)) {
    rendererWorkerPath = path
    content = source
    break
  }
}
if (!content.includes(occurrence)) {
  throw new Error('occurrence not found')
}
const newContent = content.replace(occurrence, replacement)
await writeFile(rendererWorkerPath, newContent)

const titleBarWorkerPath = join(
  root,
  'dist',
  commitHash,
  'packages',
  'renderer-worker',
  'node_modules',
  '@lvce-editor',
  'title-bar-worker',
  'dist',
  'titleBarWorkerMain.js',
)
await mkdir(dirname(titleBarWorkerPath), { recursive: true })
await cp(workerPath, titleBarWorkerPath)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
