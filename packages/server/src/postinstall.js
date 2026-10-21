import { cp, readdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const workerPath = join(root, '.tmp', 'dist', 'dist', 'titleBarWorkerMain.js')

const staticServerPath = dirname(require.resolve('@lvce-editor/static-server/package.json'))

const sharedProcessPath = dirname(require.resolve('@lvce-editor/shared-process/package.json'))

const serverStaticPath = join(staticServerPath, 'static')

const staticServerConfigPath = join(staticServerPath, 'config.json')

const sharedProcessConfigPath = join(sharedProcessPath, 'config.json')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerDirectory = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist')

const testWorkerSourcePath = require.resolve('@lvce-editor/test-worker/dist/testWorkerMain.js')
const testWorkerTargetPath = join(serverStaticPath, commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js')
await cp(testWorkerSourcePath, testWorkerTargetPath)

const remoteUrl = getRemoteUrl(workerPath)
const candidates = [
  '`' + '${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/title-bar-worker/dist/titleBarWorkerMain.js' + '`',
  '`' + '${assetDir}/packages/title-bar-worker/dist/titleBarWorkerMain.js' + '`',
]
const replacement = '`' + remoteUrl + '`'
let rendererWorkerMainPath = ''
let content = ''
for (const name of await readdir(rendererWorkerDirectory)) {
  if (!name.endsWith('.js')) continue
  const path = join(rendererWorkerDirectory, name)
  const source = await readFile(path, 'utf8')
  if (candidates.some((candidate) => source.includes(candidate)) || source.includes(replacement)) {
    rendererWorkerMainPath = path
    content = source
    break
  }
}
const occurrence = candidates.find((candidate) => content.includes(candidate))
if (occurrence) {
  await cp(rendererWorkerMainPath, rendererWorkerMainPath + '.original')
  await writeFile(rendererWorkerMainPath, content.replace(occurrence, replacement))
} else if (!content.includes(replacement)) {
  throw new Error('Title bar worker URL not found in test runtime')
}

await cp(staticServerConfigPath, sharedProcessConfigPath)
