---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: EasyTier
  text: implemented using Rust language and Tokio framework
  tagline: A simple, secure, decentralized VPN mesh network solution
  actions:
    - theme: brand
      text: Quick start
      link: /en/guide/introduction
    - theme: alt
      text: Github
      link: https://github.com/EasyTier/EasyTier

features:
  - title: Decentralized
    details: No need to rely on centralized services, nodes are equal and independent.
  - title: Safe
    details: Use WireGuard protocol to encrypt data.
  - title: High Performance
    details: Full-link zero-copy, with performance comparable to mainstream networking software.
  - title: Cross-platform
    details: Supports MacOS/Linux/Windows, will support IOS and Android in the future. The executable file is statically linked, making deployment simple.
  - title: Networking without public IP
    details: Supports networking using shared public nodes, refer to Configuration Guide
  - title: NAT traversal
    details: Supports UDP-based NAT traversal, able to establish stable connections even in complex network environments.
  - title: Subnet Proxy (Point-to-Network)
    details: Nodes can expose accessible network segments as proxies to the VPN subnet, allowing other nodes to access these subnets through the node.
  - title: Smart Routing
    details: Selects links based on traffic to reduce latency and increase throughput.
---
