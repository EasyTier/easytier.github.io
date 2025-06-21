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
      link: /en/guide/introduction
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
    details: Nodes are equal and independent, no centralized services required.<br>No distinction between client/server.
    link: /en/guide/network/decentralized-networking
  - title: Easy to Use
    details: Web, client, command line multiple operation methods<br>Supports one-click networking
    link: /en/guide/network/web-console
  - title: Cross-Platform
    details: Supports Win / MacOS / Linux / FreeBSD / Android<br>Compatible with X86 / ARM / MIPS architectures
    link: /en/guide/download
  - title: Secure
    details: AES-GCM or WireGuard encryption<br>Prevents man-in-the-middle attacks
    link: /
  - title: Efficient NAT Traversal
    details: Supports UDP, IPv6 traversal<br>Can penetrate NAT4-NAT4 networks
    link: /
  - title: Subnet Proxy
    details: Nodes can share subnets for other nodes to access.
    link: /en/guide/network/point-to-networking
  - title: Intelligent Routing
    details: Latency priority, automatic route selection<br>Provides the best network experience
    link: /en/guide/network/configurations
  - title: High Performance
    details: Zero-copy throughout the entire link<br>Supports TCP / UDP / WSS / WG and other protocols
    link: /en/guide/perf
  - title: UDP Loss Resistance
    details: KCP / QUIC proxy<br>Optimizes latency and bandwidth in high packet loss environments
    link: /en/guide/network/kcp-proxy
---

## Related Links

- [Community Documentation](https://doc.oee.icu): Maintained by community volunteers, a plain language guide to using EasyTier, updated in real-time.
- [Public Server Node List](https://easytier.gd.nkbpal.cn/status/easytier): Maintained by community volunteers, provides a list of public server nodes and status queries.
- QQ Group: [949700262](https://qm.qq.com/q/wFoTUChqZW)
- Telegram: https://t.me/easytier

## Acknowledgments

<div style="display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap;">
  <a href="https://langlangy.cn/?i26c5a5" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; border: 1px solid var(--vp-c-divider); border-radius: 28px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; text-align: center; width: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); background-color: rgba(215, 230, 240, 0.81);">
    <img src="https://langlangy.cn/home/img/logo.png" alt="Langlang Cloud" style="height: 60px;">
    <span style="font-size: 0.95rem; color: black;">Sponsored Public Server</span>
  </a>
</div>

## Sponsor {#sponsor}

If you find EasyTier helpful, please consider sponsoring us.

Software development and maintenance require a lot of time and effort, and your sponsorship will help us better maintain and improve EasyTier.

<div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/assets/wechat.png" alt="WeChat" style="width: 250px; max-width: 100%; border-radius: 28px;" />
  </div>
  <div style="text-align: center;">
    <img src="/assets/alipay.png" alt="Alipay" style="width: 250px; max-width: 100%; border-radius: 28px;" />
  </div>
</div>

<Home />
