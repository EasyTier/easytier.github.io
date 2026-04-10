import { ref, onMounted } from 'vue'

export function useLatestVersion() {
  const latestVersion = ref<string | null>(null)
  const prereleaseVersion = ref<string | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      const [latestRes, releasesRes] = await Promise.all([
        fetch('https://api.github.com/repos/EasyTier/EasyTier/releases/latest'),
        fetch('https://api.github.com/repos/EasyTier/EasyTier/releases?per_page=5')
      ])

      if (!latestRes.ok || !releasesRes.ok) {
        throw new Error('Failed to fetch releases from GitHub API')
      }

      const latestData = await latestRes.json() as { tag_name?: string }
      const releases = await releasesRes.json() as Array<{ tag_name?: string; prerelease?: boolean }>

      latestVersion.value = latestData.tag_name ?? null
      prereleaseVersion.value = releases.find((item) => item.prerelease)?.tag_name ?? null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }

    if (latestVersion.value?.startsWith('v')) latestVersion.value = latestVersion.value.slice(1)
    if (prereleaseVersion.value?.startsWith('v')) prereleaseVersion.value = prereleaseVersion.value.slice(1)
  })

  return { latestVersion, prereleaseVersion, loading, error }
}