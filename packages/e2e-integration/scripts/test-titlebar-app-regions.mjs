import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { _electron as electron, expect } from '@playwright/test'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const executablePath = process.env.LVCE_TEST_EXECUTABLE || join(root, 'packages/build/.tmp/linux/deb/amd64/app/usr/lib/lvce-oss/lvce-oss')
const profile = await mkdtemp(join(tmpdir(), 'lvce-titlebar-app-regions-'))
const env = {
  ...process.env,
  XDG_CONFIG_HOME: join(profile, 'config'),
  XDG_DATA_HOME: join(profile, 'data'),
  XDG_CACHE_HOME: join(profile, 'cache'),
  XDG_STATE_HOME: join(profile, 'state'),
}
let app
try {
  app = await electron.launch({ executablePath, args: ['--no-sandbox', `--user-data-dir=${join(profile, 'chromium')}`], env })
  const paths = await app.evaluate(({ app }) => ({ config: process.env.XDG_CONFIG_HOME, data: app.getPath('userData') }))
  expect(paths.config).toBe(env.XDG_CONFIG_HOME)
  expect(paths.data.startsWith(profile + '/')).toBe(true)

  const page = await app.firstWindow()
  await expect(page.locator('.Main')).toBeVisible({ timeout: 30_000 })
  await expect(page.locator('.TitleBar')).toHaveCSS('app-region', 'no-drag')
  await expect(page.locator('.TitleBarIcon')).toHaveCSS('app-region', 'drag')
  await expect(page.locator('.TitleBarTopLevelEntry').first()).toHaveCSS('app-region', 'no-drag')
  await expect(page.locator('.TitleBarTitle')).toHaveCSS('app-region', 'drag')
  await expect(page.locator('.TitleBarButtons')).toHaveCSS('app-region', 'drag')
} finally {
  await app?.close()
  await rm(profile, { recursive: true, force: true })
}
