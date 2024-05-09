<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{
  repo: string
  type?: 'Date' | 'Timeline'
}>()

const { isDark } = useData()

const url = computed(() =>
  `https://star-history.com/#${props.repo}&${props.type || 'Date'}`,
)

const imgUrl = computed(() =>
  `https://api.star-history.com/svg?repos=${props.repo}&type=${props.type || 'Date'}${isDark.value ? '&theme=dark' : ''}`,
)
</script>

<template>
  <a :href="url">
    <img alt="Star History Chart" :src="imgUrl">
  </a>
</template>
