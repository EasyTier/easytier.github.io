import type { Release } from './releaseUtils'
import { computed, onMounted, ref } from 'vue'
import { findPrerelease } from './releaseUtils'

export function useLatestVersion() {
  const latestRelease = ref<Release | null>(null)
  const prereleaseRelease = ref<Release | null>(null)
  const nightlyRelease = ref<Release | null>(null)
  const latestVersion = computed(() => latestRelease.value?.tag_name.replace(/^v/, '') ?? null)
  const prereleaseVersion = computed(() => prereleaseRelease.value?.tag_name.replace(/^v/, '') ?? null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    async function fetchRelease<T>(path: string): Promise<T> {
      const response = await fetch(`https://api.github.com/repos/EasyTier/EasyTier/releases${path}`, { signal: AbortSignal.timeout(10000) })
      if (!response.ok)
        throw new Error('Failed to fetch releases from GitHub API')
      return response.json()
    }

    const [latest, releases, nightly] = await Promise.allSettled([
      fetchRelease<Release>('/latest'),
      fetchRelease<Release[]>('?per_page=100'),
      fetchRelease<Release>('/tags/nightly'),
    ])

    if (latest.status === 'fulfilled')
      latestRelease.value = latest.value
    if (releases.status === 'fulfilled')
      prereleaseRelease.value = findPrerelease(releases.value)
    if (nightly.status === 'fulfilled')
      nightlyRelease.value = nightly.value

    const failure = [latest, releases, nightly].find(result => result.status === 'rejected')
    if (failure?.status === 'rejected')
      error.value = failure.reason instanceof Error ? failure.reason.message : 'Unknown error'
    loading.value = false
  })

  return { latestVersion, prereleaseVersion, latestRelease, prereleaseRelease, nightlyRelease, loading, error }
}
