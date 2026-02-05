// @ts-expect-error ignore next line
import taskLists from 'markdown-it-task-lists'
import { withMermaid } from 'vitepress-plugin-mermaid'

import { cn, cnSearch } from './cn'

import { en } from './en'

export default withMermaid({
  base: '/',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/easytier.png' }],
    ['meta', { name: 'msvalidate.01', content: 'C6CB41F1DA6096106497701D002B19AD' }],
    ['meta', { name: 'author', content: 'EasyTier' }],
    ['meta', { name: 'keywords', content: 'easytier,SD-WAN,networking' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'EasyTier' }],
    ['meta', { property: 'og:description', content: 'EasyTier official' }],
    ['meta', { property: 'og:image', content: 'https://easytier.cn/easytier.png' }],
    ['link', { rel: 'canonical', href: 'https://easytier.cn' }],
  ],
  themeConfig: {
    siteTitle: 'EasyTier',
    logo: '/easytier.png',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { ...cnSearch },
        },
      },
    },
    socialLinks: [
      {
        icon: 'gmail',
        link: 'mailto:sunsijie@buaa.edu.cn',
        ariaLabel: 'Email',
      },
      {
        icon: 'qq',
        link: 'https://qm.qq.com/q/wFoTUChqZW',
        ariaLabel: 'qq',
      },
    ],
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
  vue: {
    template: {
      compilerOptions: { isCustomElement: tag => tag === 'iconify-icon' },
    },
  },
  sitemap: {
    hostname: 'https://easytier.cn',
  },
})
