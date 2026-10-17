import type { Release } from '../releaseUtils.ts'
import assert from 'node:assert/strict'
// eslint-disable-next-line test/no-import-node-test -- Use the built-in runner without adding a test framework.
import { test } from 'node:test'
import { findPrerelease, resolveDownloadUrl } from '../releaseUtils.ts'

const cliTemplate = 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-linux-x86_64-v{}.zip'
const guiTemplate = 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_x64-setup.exe'

function release(tag_name: string, assets: string[] = [], prerelease = true): Release {
  return {
    tag_name,
    prerelease,
    assets: assets.map(name => ({ name, browser_download_url: `https://github.com/EasyTier/EasyTier/releases/download/${tag_name}/${name}` })),
  }
}

test('ordinary prereleases exclude rolling nightly and draft releases', () => {
  const prerelease = release('v2.7.0')
  assert.equal(findPrerelease([
    release('nightly'),
    { ...release('v2.8.0'), draft: true },
    prerelease,
    release('v2.6.4', [], false),
  ]), prerelease)
  assert.equal(findPrerelease([release('nightly'), release('v2.6.4', [], false)]), null)
})

test('nightly uses the actual release tag and versioned asset name', () => {
  const nightly = release('nightly', ['easytier-linux-x86_64-v2.7.0.zip'])
  assert.equal(resolveDownloadUrl(cliTemplate, nightly), 'https://github.com/EasyTier/EasyTier/releases/download/nightly/easytier-linux-x86_64-v2.7.0.zip')
})

test('GUI asset versions can differ from the release version', () => {
  const prerelease = release('v2.6.1', ['easytier-gui_2.6.0_x64-setup.exe'])
  assert.equal(resolveDownloadUrl(guiTemplate, prerelease), 'https://github.com/EasyTier/EasyTier/releases/download/v2.6.1/easytier-gui_2.6.0_x64-setup.exe')
})

test('Android assets without a version placeholder also resolve', () => {
  const nightly = release('nightly', ['app-arm64-release.apk'])
  assert.equal(resolveDownloadUrl('https://github.com/EasyTier/EasyTier/releases/download/v{}/app-arm64-release.apk', nightly), 'https://github.com/EasyTier/EasyTier/releases/download/nightly/app-arm64-release.apk')
})

test('missing assets do not produce invented download links', () => {
  assert.equal(resolveDownloadUrl(cliTemplate, release('nightly', ['easytier-linux-aarch64-v2.7.0.zip'])), undefined)
  assert.equal(resolveDownloadUrl(guiTemplate, release('v2.6.4'), '2.6.4'), undefined)
  assert.equal(resolveDownloadUrl(cliTemplate, release('nightly', ['easytier-linux-x86_64-v2.7.0Xzip'])), undefined)
})

test('API failure preserves stable and prerelease fallbacks without guessing nightly assets', () => {
  assert.equal(resolveDownloadUrl(cliTemplate, null, '2.6.4'), 'https://github.com/EasyTier/EasyTier/releases/download/v2.6.4/easytier-linux-x86_64-v2.6.4.zip')
  assert.equal(resolveDownloadUrl(guiTemplate, null, '2.7.0'), 'https://github.com/EasyTier/EasyTier/releases/download/v2.7.0/easytier-gui_2.7.0_x64-setup.exe')
  assert.equal(resolveDownloadUrl(cliTemplate, null), undefined)
})
