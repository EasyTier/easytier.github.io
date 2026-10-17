export interface Release {
  tag_name: string
  prerelease?: boolean
  draft?: boolean
  assets: Array<{ name: string, browser_download_url: string }>
}

export function findPrerelease(releases: Release[]): Release | null {
  return releases.find(release => release.prerelease && !release.draft && release.tag_name !== 'nightly') ?? null
}

export function resolveDownloadUrl(template: string, release: Release | null, fallbackVersion?: string): string | undefined {
  if (release) {
    const filename = template.slice(template.lastIndexOf('/') + 1)
    const pattern = filename.split('{}')
      .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('[^/]+')
    return release.assets.find(asset => new RegExp(`^${pattern}$`).test(asset.name))?.browser_download_url
  }

  return fallbackVersion ? template.replace(/\{\}/g, fallbackVersion) : undefined
}
