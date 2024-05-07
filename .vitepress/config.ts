import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Easytier',
  description: '一个简单、安全、去中心化的内网穿透 VPN 组网方案，使用 Rust 语言和 Tokio 框架实现',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Easytier',
      description: '一个简单、安全、去中心化的内网穿透 VPN 组网方案，使用 Rust 语言和 Tokio 框架实现'
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'Easytier',
      description: 'A simple, secure, decentralized VPN mesh network solution, implemented using Rust language and Tokio framework.'
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
      text: '开始',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '安装', link: '/guide/installation' },
        ]
      },
      {
        text: '组网',
        link: '/guide/networking',
        items: [
          { text: '双节点', link: '/guide/network/two-node' },
          { text: '多节点', link: '/guide/network/multi-node' },
          { text: '子网代理（点对网）', link: '/guide/network/point-to' },
          { text: '无公网IP', link: '/guide/network/without-public-ip' },
          { text: '使用 WireGuard 客户端接入', link: '/guide/network/use-wireguard-client' }
        ]
      },
      {
        items: [
          { text: '路线图', link: '/guide/roadmap' },
          { text: '社区和贡献', link: '/guide/community-and-contribution' },
          { text: '许可证', link: '/guide/license' },
          { text: '联系方式', link: '/guide/contact' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KKRainbow/EasyTier' }
    ]
  }
})
