import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en',
  description: 'a simple, safe and decentralized VPN networking solution implemented with the Rust language and Tokio framework.',

  themeConfig: {
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/en/guide/introduction' },
          { text: 'installation', link: '/en/guide/installation' },
        ]
      },
      {
        text: 'networking',
        link: '/en/guide/networking',
        items: [
          { text: 'Two Node', link: '/en//guide/network/two-node-networking' },
          { text: 'Multi Node', link: '/en//guide/network/multi-node-networking' },
          { text: 'Subnet Proxy', link: '/en//guide/network/point-to-networking' },
          { text: 'Without Public IP', link: '/en//guide/network/networking-without-public-ip' },
          { text: 'Use WireGuard Client', link: '/en//guide/network/use-easytier-with-wirefuard-client' },
          { text: 'Other Configurations', link: '/en//guide/network/configurations' },
        ]
      },
      {
        items: [
          { text: 'Roadmap', link: '/en/guide/roadmap' },
          { text: 'Community and Contribution', link: '/en/guide/community-and-contribution' },
          { text: 'License', link: '/en/guide/license' },
          { text: 'Contact', link: '/en/guide/contact' },
        ]
      }
    ]
  }
})
