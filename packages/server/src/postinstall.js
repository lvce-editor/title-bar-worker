import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'packages', 'server', 'node_modules')

const serverPath = join(nodeModulesPath, '@lvce-editor', 'server')
const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'server', 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
// @ts-ignore
const rendererWorkerMainPath = join(serverPath, 'static', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

// const content = await readFile(rendererWorkerMainPath, 'utf-8')
// const remoteUrl = getRemoteUrl(textSearchWorkerPath)
// if (!content.includes('// const textSearchWorkerUrl = ')) {
//   const occurrence = `const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\``
//   const replacement = `// const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\`
//   const textSearchWorkerUrl = \`${remoteUrl}\``

//   const newContent = content.replace(occurrence, replacement)
//   await writeFile(rendererWorkerMainPath, newContent)
// }