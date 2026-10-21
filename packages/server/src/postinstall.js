import { cp, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { prepareChatExtension } from './prepareChatExtension.js'

const require = createRequire(import.meta.url)

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

const testWorkerSourcePath = require.resolve('@lvce-editor/test-worker/dist/testWorkerMain.js')
const testWorkerTargetPath = join(serverStaticPath, commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js')
await cp(testWorkerSourcePath, testWorkerTargetPath)

await cp(staticServerConfigPath, sharedProcessConfigPath)

await prepareChatExtension()
