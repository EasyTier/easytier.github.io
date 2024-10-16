import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en',
  description: 'A simple, safe and decentralized VPN networking solution implemented with the Rust language and Tokio framework',

  themeConfig: {
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/en/guide/introduction' },
          { text: 'Installation', link: '/en/guide/installation' },
        ],
      },
      {
        text: 'Networking',
        link: '/en/guide/networking',
        items: [
          { text: 'Peer to peer networking', link: '/en/guide/network/two-node-networking' },
          { text: 'Multi peers networking', link: '/en/guide/network/multi-node-networking' },
          { text: 'Subnet proxy', link: '/en/guide/network/point-to-networking' },
          { text: 'Network to network', link: '/en/guide/network/network-to-network' },
          { text: 'Without public IP', link: '/en/guide/network/networking-without-public-ip' },
          { text: 'Use WireGuard client', link: '/en/guide/network/use-easytier-with-wireguard-client' },
          { text: 'Socks5', link: '/en/guide/network/socks5' },
          { text: 'No TUN mode (rootless)', link: '/en/guide/network/no-root' },
          { text: 'Self-hosted public server', link: '/en/guide/network/host-public-server' },
          { text: 'Installing as a Windows service (Auto start on boot)', link: '/en/guide/network/install-as-a-windows-service' },
          { text: 'Installing as a Linux systemd service', link: '/en/guide/network/install-as-a-systemd-service' },
          { text: 'Other configurations', link: '/en/guide/network/configurations' },
          { text: 'Configuration file', link: '/en/guide/network/config-file' },
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
