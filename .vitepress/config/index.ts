import taskLists from 'markdown-it-task-lists'

import { withMermaid } from 'vitepress-plugin-mermaid'
import { cn, cnSearch } from './cn'

import { en } from './en'

export default withMermaid({
  title: 'EasyTier',
  base: '/',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/easytier.png' }],
  ],
  themeConfig: {
    logo: '/easytier.png',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { ...cnSearch },
        },
      },
    },
  },
  locales: {
    root: { label: '简体中文', ...cn },
    en: { label: 'English', ...en },
  },
  markdown: {
    config: (md) => {
      md.use(taskLists)
    },
  },
})
