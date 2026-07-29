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
const quickPickWorkerSourcePath = require.resolve('@lvce-editor/quick-pick-worker/dist/quickPickWorkerMain.js')
const quickPickWorkerTargetPath = join(serverStaticPath, commitHash, 'packages', 'quick-pick-worker', 'dist', 'quickPickWorkerMain.js')
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

await cp(quickPickWorkerSourcePath, quickPickWorkerTargetPath)

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(workerPath)
if (!content.includes('// const titleBarWorkerUrl = ')) {
  await cp(rendererWorkerMainPath, rendererWorkerMainPath + '.original')
  const occurrence = `const titleBarWorkerUrl = \`\${assetDir}/packages/title-bar-worker/dist/titleBarWorkerMain.js\``
  const replacement = `// const titleBarWorkerUrl = \`\${assetDir}/packages/title-bar-worker/dist/titleBarWorkerMain.js\`
const titleBarWorkerUrl = \`${remoteUrl}\``

  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerMainPath, newContent)
}

await cp(staticServerConfigPath, sharedProcessConfigPath)
