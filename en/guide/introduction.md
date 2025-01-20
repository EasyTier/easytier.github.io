# Feature Overview

A simple, secure, decentralized SD-WAN solution for remote networking, implemented using Rust and the Tokio framework.

## Features

- **Decentralized**: No need to rely on centralized services, nodes are equal and independent.
- **Secure**: Supports encrypted communication using WireGuard, and also supports AES-GCM encryption to protect relay traffic.
- **High Performance**: Zero-copy throughout the entire link, performance comparable to mainstream networking software.
- **Cross-Platform**: Supports MacOS/Linux/Windows/FreeBSD/Android, with future support for IOS. Executable files are statically linked, making deployment simple.
- **Networking without Public IP**: Supports networking using shared public nodes, refer to [Configuration Guide](/guide/network/networking-without-public-ip)
- **NAT Traversal**: Supports UDP-based NAT traversal, enabling stable connections even in complex network environments.
- **Subnet Proxy (Point-to-Network)**: Nodes can expose accessible subnets as proxies to the virtual network, allowing other nodes to access these subnets through the node.
- **Intelligent Routing**: Intelligently selects links based on traffic to reduce latency and increase throughput.
- **TCP Support**: Provides reliable data transmission through concurrent TCP connections when UDP is restricted, optimizing performance.
- **High Availability**: Supports multipath and switches to healthy paths when high packet loss or network errors are detected.
- **IPV6 Support**: Supports networking using IPV6.

## GUI

![alt text](/assets/image-6.png)

![alt text](/assets/image-7.png)
