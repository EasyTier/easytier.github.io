---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: EasyTier
  text: Powered by Rust and Tokio
  tagline: ✨ A simple, secure, decentralized networking solution
  image:
    light: '/gui-config-light.png'
    dark: '/gui-config-dark.png'
    alt: 'Easytier GUI configuration interface'
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/installation
    - theme: alt
      text: Download
      link: /en/guide/download
    - theme: alt
      text: Web Console
      link: https://easytier.cn/web
    - theme: sponsor
      text: 💚 Sponsor
      link: /#sponsor

features:
  - title: Decentralized
    details: No distinction between client/server, no reliance on centralized services, nodes are equal and independent.
    link: /en/guide/network/decentralized-networking
  - title: Easy to Use
    details: |
      Supports multiple usage methods via web, client, or command line, simple operation.
      </br>
      Supports one-click networking using shared nodes.
    link: /en/guide/network/web-console
  - title: Cross-Platform
    details: |
      Supports Windows, MacOS, Linux, FreeBSD, Android, etc.
      </br>
      Supports X86, ARM, MIPS, etc. hardware architectures.
    link: /en/guide/download
  - title: Secure
    details: Supports AES-GCM or WireGuard encryption to protect transit traffic from man-in-the-middle attacks.
    link: /
  - title: Efficient NAT Traversal
    details: Supports UDP-based NAT traversal and IPV6 traversal, in some cases can penetrate NAT4-NAT4 networks.
    link: /
  - title: Subnet Proxy
    details: Nodes can forward accessible subnets to the virtual network, allowing other nodes to access these subnets through the node.
    link: /en/guide/network/point-to-networking
  - title: Intelligent Routing
    details: Supports latency-priority mode, automatically selects the optimal path, providing the best network experience.
    link: /en/guide/network/configurations
  - title: High Performance
    details: Zero-copy throughout the entire link, performance comparable to mainstream networking software.</br> Communication between nodes supports multiple protocols such as TCP, UDP, QUIC, WG, etc.
    link: /en/guide/perf
---

## Related Links

- [Community Documentation](https://doc.oee.icu): Maintained by community volunteers, a plain language guide to using EasyTier, updated in real-time.
- [Public Server Node List](https://easytier.gd.nkbpal.cn/status/easytier): Maintained by community volunteers, provides a list of public server nodes and status queries.
- QQ Group: [949700262](https://qm.qq.com/q/wFoTUChqZW)
- Telegram: https://t.me/easytier

## Sponsor {#sponsor}

If you find EasyTier helpful, please consider sponsoring us.

Software development and maintenance require a lot of time and effort, and your sponsorship will help us better maintain and improve EasyTier.

<div align="center">
  <img src="/assets/weixin.png" alt="WeChat" width="300" style="display: inline-block" />
  <img src="/assets/zhifubao.png" alt="Alipay" width="300" style="display: inline-block; margin-left: 2em"/>
</div>

<Home />
