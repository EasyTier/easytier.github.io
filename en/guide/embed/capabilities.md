# Supported Capabilities

EasyTier-ESP does not implement the complete EasyTier protocol. The following describes the capabilities supported by this project.

| Capability | Status | Description |
| --- | --- | --- |
| TCP client entry | ✅ Supported | `[[peer]].uri = "tcp://host:port"`; supports IPv4 and DNS hostnames |
| Multiple entries | ✅ Supported | No limit on the number of entries; concurrent connections are limited by Kconfig (default 6, range 1..8) |
| Non-secure mode handshake | ✅ Supported | Network name + secret digest verification; not Noise |
| Automatic keepalive | ✅ Supported | Automatically detects disconnections and reconnects |
| Control-plane RPC | ✅ Supported | Used for control-plane requests/responses such as route synchronization |
| Route synchronization | ✅ Supported | Automatically learns the virtual network topology and next hops |
| Data forwarding (relay) | ✅ Supported | Can act as a relay to forward data for other nodes |
| AES-128-GCM | ✅ Supported | Data-plane encryption |
| Disable encryption | ✅ Supported | Can be disabled via `flags.enable_encryption = false` |
| Static virtual IPv4 | ✅ Supported | `ipv4 = "10.144.144.10/24"` |
| DHCP auto-assignment | ✅ Supported | `dhcp = true` or CIDR; falls back to `10.126.126.0/24` |
| lwIP virtual network interface | ✅ Supported | Standard virtual interface; does not take over the default route |
| Multiple instances | ✅ Supported | Each `et::Inst` exclusively owns its resources |
| Event callbacks | ✅ Supported | State change notifications; `PeerDown` is currently reserved |
| Inbound listening | ❌ Not supported | The component does not listen on ports and cannot be actively connected to by other nodes |
| UDP / KCP / QUIC / WebSocket | ❌ Not supported | Only TCP client transport is implemented |
| Noise secure mode | ❌ Not supported | Only non-secure mode handshake |
| Subnet proxy / `proxy_network` | ❌ Not supported | Configuration fields are ignored |
| Static routes / `routes` | ❌ Not supported | Configuration fields are ignored |
| Broadcast / multicast | ❌ Not supported | Outbound broadcast/multicast is dropped and counted |
| IPv6 entries | ❌ Not supported | `peer.uri` only accepts TCP + IPv4/DNS |
| Zstd compression | ❌ Not supported | Receiving Zstd-compressed RPCs causes an error and revokes Ready |
| Graphical interface / Web panel | ❌ Not provided | Only the C++ component and example are provided |
| TLS | ❌ Not supported | TCP transport itself is not encrypted; the data plane is protected by AES-GCM |


:::tip
Capabilities not listed are considered **unsupported** by default.
:::
