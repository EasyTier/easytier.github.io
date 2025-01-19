import type { EnhanceAppContext } from 'vitepress'

import { baiduAnalytics, HomeUnderline, trackPageview } from '@theojs/lumen'

import DefaultTheme from 'vitepress/theme'
import Layout from './layout.vue'

import '@theojs/lumen/theme'

export default {
  extends: DefaultTheme,
  Layout,

  enhanceApp: (ctx: EnhanceAppContext) => {
    const { app } = ctx
    baiduAnalytics({ baiduId: '0afa8cd5bd78fd0c960f8af5dc6af333' })
    if (typeof window !== 'undefined') {
      trackPageview('0afa8cd5bd78fd0c960f8af5dc6af333', window.location.href)
    }

    app.component('Home', HomeUnderline)
  },
} as any
