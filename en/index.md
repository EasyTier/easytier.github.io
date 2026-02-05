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

features:
  - title: Decentralized
    details: Nodes are equal and independent, no centralized services required.<br>No distinction between client/server.
    link: /en/guide/network/decentralized-networking
  - title: Easy to Use
    details: Web, client, command line multiple operation methods<br>Supports one-click networking
  - title: Cross-Platform
    details: Supports Win / MacOS / Linux / FreeBSD / Android<br>Compatible with X86 / ARM / MIPS architectures
    link: /en/guide/download
  - title: Secure
    details: Multiple encryption algorithms including AES-GCM or WireGuard encryption<br>Prevents man-in-the-middle attacks
    link: /en/guide/network/configurations#:~:text=encryption%20algorithm&text=ET_ENCRYPTION_ALGORITHM
  - title: Efficient NAT Traversal
    details: Supports UDP, IPv6 traversal<br>Can penetrate NAT4-NAT4 networks
    link: /en/guide/aboutp2p
  - title: Subnet Proxy
    details: Nodes can share subnets for other nodes to access.
    link: /en/guide/network/point-to-networking
  - title: Intelligent Routing
    details: Latency priority, automatic route selection<br>Provides the best network experience
    link: /en/guide/network/configurations#:~:text=latency%20priority%20mode&text=ET_LATENCY_FIRST
  - title: High Performance
    details: Zero-copy throughout the entire link<br>Supports TCP / UDP / WS / WSS / WG / QUIC / FakeTCP and other protocols
    link: /en/guide/perf
  - title: UDP Loss Resistance
    details: KCP / QUIC proxy<br>Optimizes latency and bandwidth in high packet loss environments
    link: /en/guide/network/kcp-proxy 

---

<Home />
