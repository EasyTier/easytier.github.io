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
        ],
      },
      {
        text: 'Networking',
        link: '/en/guide/networking',
        items: [
          { text: 'Two Node', link: '/en/guide/network/two-node-networking' },
          { text: 'Multi Node', link: '/en/guide/network/multi-node-networking' },
          { text: 'Subnet Proxy', link: '/en/guide/network/point-to-networking' },
          { text: 'Network to Network', link: '/en/guide/network/network-to-network' },
          { text: 'Without Public IP', link: '/en/guide/network/networking-without-public-ip' },
          { text: 'Use WireGuard Client', link: '/en/guide/network/use-easytier-with-wirefuard-client' },
          { text: 'No TUN Mode (No Root Permission Required', link: '/en/guide/network/no-root' },
          { text: 'Self-Hosted Public Server', link: '/en/guide/network/host-public-server' },
          { text: 'Installing as a Windows Service (Auto-Start on Boot)', link: '/en/guide/network/install-as-a-windows-service' },
          { text: 'Installing as a Linux Systemd Service', link: '/en/guide/network/install-as-a-systemd-service' },
          { text: 'Other Configurations', link: '/en/guide/network/configurations' },
          { text: 'Configuration File', link: '/en/guide/network/config-file' },
        ],
      },
      {
        items: [
          { text: 'Roadmap', link: '/en/guide/roadmap' },
          { text: 'Community and Contribution', link: '/en/guide/community-and-contribution' },
          { text: 'License', link: '/en/guide/license' },
          { text: 'Contact', link: '/en/guide/contact' },
        ],
      },
    ],
    footer: {
      message: 'Released under the Apache License 2.0.',
      copyright: 'Copyright © 2024-present EasyTier',
    },
    editLink: {
      pattern: 'https://github.com/EasyTier/easytier.github.io/edit/dev/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
