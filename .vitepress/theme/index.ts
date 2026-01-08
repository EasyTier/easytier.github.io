import type { EnhanceAppContext } from 'vitepress'

import { baiduAnalytics, HomeUnderline, trackPageview } from '@theojs/lumen'

import DefaultTheme from 'vitepress/theme'
import Layout from './layout.vue'

import '@theojs/lumen/theme'
import '@theojs/lumen/doc-blocks-border'

/**
 * Add noopener to links with text fragments
 */
function initNoopenerLinks() {
  if (typeof window === 'undefined')
    return

  const processLinks = () => {
    document.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href')
      // Add noopener to links with text fragments
      if (href && href.includes(':~:text=')) {
        const rel = link.getAttribute('rel') || ''
        if (!rel.includes('noopener')) {
          const newRel = rel ? `${rel} noopener` : 'noopener'
          link.setAttribute('rel', newRel.trim())
        }
        const target = link.getAttribute('target') || ''
        if (!target) {
          link.setAttribute('target', '_blank')
        }
      }
    })
  }

  // Process links on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processLinks)
  }
  else {
    processLinks()
  }

  // Process dynamically added links
  const observer = new MutationObserver(processLinks)
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

export default {
  extends: DefaultTheme,
  Layout,

  enhanceApp: (ctx: EnhanceAppContext) => {
    const { app } = ctx
    baiduAnalytics({ baiduId: '0afa8cd5bd78fd0c960f8af5dc6af333' })
    if (typeof window !== 'undefined') {
      trackPageview('0afa8cd5bd78fd0c960f8af5dc6af333', window.location.href)
      // Initialize noopener for text fragment links
      initNoopenerLinks()
    }

    app.component('Home', HomeUnderline)
  },
} as any
