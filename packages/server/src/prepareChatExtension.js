import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { brotliDecompressSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import tar from 'tar-fs'

const root = new URL('../../../.tmp/', import.meta.url)
const archive = new URL('chat-view-2-v1.32.1.tar.br', root)
const checksum = '5c14497b53fe5ac4dbcc344e9cd8a5cdf9f30fb773e234854dbbf9c6d1325f82'
const url = 'https://github.com/lvce-editor/chat-view-2/releases/download/v1.32.1/chat-view-2-v1.32.1.tar.br'

// Match the application's pinned builtin instead of testing an unavailable extension view.
export const prepareChatExtension = async () => {
  await mkdir(root, { recursive: true })
  let bytes = await readFile(archive).catch((error) => {
    if (error.code !== 'ENOENT') throw error
  })
  if (!bytes) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to download Chat test prerequisite: ${response.status}`)
    bytes = Buffer.from(await response.arrayBuffer())
  }
  if (createHash('sha256').update(bytes).digest('hex') !== checksum) {
    throw new Error('Chat test prerequisite checksum mismatch')
  }
  await writeFile(archive, bytes)
  const target = new URL('chat-view-2/', root)
  await mkdir(target, { recursive: true })
  await pipeline(Readable.from([brotliDecompressSync(bytes)]), tar.extract(fileURLToPath(target)))
}
