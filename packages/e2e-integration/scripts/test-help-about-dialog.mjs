import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { _electron as electron, expect } from '@playwright/test'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const executablePath = process.env.LVCE_TEST_EXECUTABLE || join(root, 'packages/build/.tmp/linux/deb/amd64/app/usr/lib/lvce-oss/lvce-oss')
const profile = await mkdtemp(join(tmpdir(), 'lvce-help-about-dialog-'))
const env = {
  ...process.env,
  XDG_CONFIG_HOME: join(profile, 'config'),
  XDG_DATA_HOME: join(profile, 'data'),
  XDG_CACHE_HOME: join(profile, 'cache'),
  XDG_STATE_HOME: join(profile, 'state'),
}
const activeWindowId = () => {
  return execFileSync('xdotool', ['getactivewindow'], { encoding: 'utf8' }).trim()
}

let app
try {
  app = await electron.launch({
    executablePath,
    args: ['--no-sandbox', `--user-data-dir=${join(profile, 'chromium')}`],
    env,
  })
  const paths = await app.evaluate(({ app }) => ({ config: process.env.XDG_CONFIG_HOME, data: app.getPath('userData') }))
  assert.equal(paths.config, env.XDG_CONFIG_HOME)
  assert.ok(paths.data.startsWith(profile + '/'), `Unexpected user data path: ${paths.data}`)
  const page = await app.firstWindow()
  await expect(page.locator('.Main')).toBeVisible({ timeout: 30_000 })
  await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].setSize(1900, 1000))
  await expect.poll(() => app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].isFocused())).toBe(true)
  const mainWindowId = activeWindowId()

  const helpEntry = page.locator('.TitleBarTopLevelEntry', { hasText: 'Help' })
  const titleBarMenuBar = page.locator('.TitleBarMenuBar')
  const menu = page.locator('#Menu-0')
  await helpEntry.click()
  await expect(menu).toBeVisible()
  await page.locator('#Menu-0 .MenuItem', { hasText: 'About' }).click()
  await expect(menu).toHaveCount(0)
  await expect.poll(activeWindowId).not.toBe(mainWindowId)

  // The native Electron dialog owns focus here; send Escape through X11 rather than the page.
  execFileSync('xdotool', ['key', '--clearmodifiers', 'Escape'])
  await expect.poll(activeWindowId).toBe(mainWindowId)
  await expect.poll(() => app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].isFocused())).toBe(true)
  await expect(helpEntry).not.toHaveAttribute('id', 'TitleBarEntryActive')
  await expect(titleBarMenuBar).not.toHaveAttribute('aria-activedescendant', 'TitleBarEntryActive')

  await helpEntry.click()
  await expect(menu).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveCount(0)
  await page.locator('.TitleBarMenuBar').focus()
  await page.keyboard.press('End')
  await expect(helpEntry).toHaveAttribute('id', 'TitleBarEntryActive')
  await page.keyboard.press('ArrowDown')
  await expect(menu).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveCount(0)
  console.log('Native About dialog Escape clears Help highlight and menu mouse/keyboard navigation still works')
} finally {
  await app?.close()
  await rm(profile, { recursive: true, force: true })
}
