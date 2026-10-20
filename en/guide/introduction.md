# Introduction

EasyTier is a simple, secure, decentralized tool for intranet penetration and remote networking, suitable for various scenarios such as remote work, remote access, and game acceleration. It requires no public IP and no complex configuration, enabling secure interconnection between devices in different locations with ease.

The software can be used via command line or graphical interface. It is ready to use after download, with no additional dependencies.

- [🛠️ CLI Installation Page](./installation) provides methods for installing the command-line tool.
- [🖥️ GUI Installation Page](./installation_gui) provides methods for installing the graphical interface tool.
- [🔌 Embedded Usage Page](./embed/index) provides methods for using the ESP32 component.
- [⬇️ Download Page](./download) provides the latest EasyTier download links.

## Applicable Scenarios

- **Remote Work**: Make computers at the company, home, and remote locations communicate as if they are on the same local network.
- **Remote Access**: Securely access home NAS, servers, or other devices anytime, anywhere.
- **Game Acceleration**: Build a virtual local area network to enjoy multiplayer games.
- **IoT Networking**: Securely interconnect devices distributed across different locations.

## Core Features

- **Decentralized**: No reliance on central servers; all nodes are equal and independent, capable of forwarding and networking.
- **Secure Encryption**: Supports WireGuard and AES-GCM encryption to ensure data security.
- **Cross-Platform**: Supports MacOS, Linux, Windows, FreeBSD, Android, and will support iOS in the future.
- **Networking Without Public IP**: Enables networking using shared public nodes, see [Configuration Guide](/guide/network/quick-networking).
- **NAT Traversal**: Supports UDP NAT traversal for stable connections in complex network environments.
- **Intelligent Routing**: Automatically selects the best link to reduce latency and increase throughput.
- **High Availability**: Supports multipath and automatically switches to healthy links to improve stability.

## Advanced Features

- **KCP / QUIC Proxy**: Converts TCP traffic to KCP / QUIC protocol, improving transmission latency and stability in high UDP packet loss environments.
- **Non-Privileged Mode**: Supports running under non-privileged users, avoiding the need for root permissions (only as an accessed endpoint).
- **WireGuard Access**: Supports WireGuard client access to the EasyTier network.

## Graphical Interface (GUI)

EasyTier provides a simple and user-friendly graphical interface, suitable for beginners to get started quickly.

<img src="/assets/gui-screenshot.png" alt="EasyTier GUI Screenshot" width="400">


## [Espressif Component](./embed/index)

**EasyTier-ESP** is a lightweight C++ implementation based on the EasyTier networking protocol and can be imported as a component in ESP-IDF.

#### Import via the ESP-IDF Component Registry

Add the dependency to your application's `main/idf_component.yml`:

```yaml
dependencies:
  myqfeng/easytier-esp: "^0.0.1"
  idf: ">=6.1"
```

Or use the command:

```bash
idf.py add-dependency "myqfeng/easytier-esp^0.0.1"
idf.py build
```

The component will be downloaded to the project's `managed_components/` directory during the build.
