<script setup lang="ts">
import { ShareButton, Twikoo } from '@theojs/lumen'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { h, nextTick, provide } from 'vue'

import { Twikoo_Data } from '../data/Twikoo'

const { isDark } = useData()

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})

const Layout = h(DefaultTheme.Layout, null, {
  'aside-outline-before': () => h(ShareButton),
  'doc-after': () => h(Twikoo, { Twikoo_Data }),
})
</script>

<template>
  <Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

footer.VPFooter {
  display: block !important;
}

.filter-select {
  /* styling */
  border: thin solid rgb(5, 176, 142);
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  min-width: 15rem;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em),
    calc(100% - 15px) calc(1em),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
}

.filter-select:focus {
  background-image: linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%), linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

.download-link-span {
  display: inline-block;
  margin: 0.25rem 0.15rem;
  color: #fff !important;
  border: none;
  padding: 0.3rem 0.6rem;
  background: linear-gradient(135deg, #05b08e 0%, #048a6f 100%);
  text-decoration: none !important;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(5, 176, 142, 0.2);
}

.download-link-span:hover {
  background: linear-gradient(135deg, #048a6f 0%, #036b59 100%);
  box-shadow: 0 4px 12px rgba(5, 176, 142, 0.35);
  transform: translateY(-2px);
}

.download-link-span:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(5, 176, 142, 0.2);
}
</style>
