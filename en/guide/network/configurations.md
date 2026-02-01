# Complete Configuration Options

You can use `easytier-core --help` to view all configuration options.

## Basic Settings

### Configuration Server

| Parameter               | Description                                                                                                                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-w, --config-server`   | Configuration server address. Allowed formats:                                                                                                                                                                       |
|                         | - Full URL: `--config-server udp://127.0.0.1:22020/admin`                                                                                                                                                            |
|                         | - Username only: `--config-server admin`, will use the official server                                                                                                                                               |
|                         | [env: ET_CONFIG_SERVER=]                                                                                                                                                                                             |
| `--machine-id`          | Web configuration server identifies machines through machine id, used for configuration recovery after disconnection and reconnection, must be unique and fixed. Default obtained from system. [env: ET_MACHINE_ID=] |
| `-c, --config-file`     | Configuration file path, note: options configured in command line will override options in configuration file [env: ET_CONFIG_FILE=]                                                                                 |
| `--config-dir`          | Load all .toml files in the directory to start network instances, and store the received configurations in this directory. [env: ET_CONFIG_DIR=]                                                                     |
| `--disable-env-parsing` | Disable environment variable parsing in config file [env: ET_DISABLE_ENV_PARSING=]                                                                                                                                   |

### Network Settings

| Parameter              | Description                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--network-name`       | Network name used to identify this VPN network [env: ET_NETWORK_NAME=]                                                                                                                                  |
| `--network-secret`     | Network secret, used to verify that this node belongs to the VPN network [env: ET_NETWORK_SECRET=]                                                                                                      |
| `-i, --ipv4`           | IPv4 address of this VPN node. If empty, this node will only forward packets and will not create a TUN device [env: ET_IPV4=]                                                                           |
| `--ipv6`               | IPv6 address of this VPN node, can be used together with ipv4 for dual-stack operation [env: ET_IPV6=]                                                                                                  |
| `-d, --dhcp`           | Automatically determine and set IP address by Easytier, default starts from 10.0.0.1. Warning: When using DHCP, if IP conflicts occur in the network, IP will be automatically changed. [env: ET_DHCP=] |
| `-p, --peers`          | Peer nodes to connect to initially [env: ET_PEERS=]                                                                                                                                                     |
| `-e, --external-node`  | Use public shared nodes to discover peer nodes [env: ET_EXTERNAL_NODE=]                                                                                                                                 |
| `-n, --proxy-networks` | Export local network to other peer nodes in VPN, e.g.: `10.0.0.0/24`. Supports mapping to other CIDR, e.g.: `10.0.0.0/24->192.168.0.0/24` [env: ET_PROXY_NETWORKS=]                                     |

### RPC Settings

| Parameter                | Description                                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `-r, --rpc-portal`       | RPC portal address for management. Supports the following formats:                                                                              |
|                          | - `0` means random port                                                                                                                         |
|                          | - `12345` means listen on localhost:12345                                                                                                       |
|                          | - `0.0.0.0:12345` means listen on all interfaces:12345                                                                                          |
|                          | Default is `0`, first try `15888`                                                                                                               |
|                          | [env: ET_RPC_PORTAL=]                                                                                                                           |
| `--rpc-portal-whitelist` | RPC portal whitelist, only allow these addresses to access RPC portal, e.g.: `127.0.0.1/32,127.0.0.0/8,::1/128` [env: ET_RPC_PORTAL_WHITELIST=] |

### Listener Settings

| Parameter            | Description                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-l, --listeners`    | Listeners for accepting connections, supports the following formats:                                                                                                                                  |
|                      | - Port number: `<11010>`, means tcp/udp will listen on port 11010, ws/wss will listen on ports 11010 and 11011, wg will listen on port 11011.                                                         |
|                      | - URL: `<protocol://0.0.0.0:11010>`, where protocol can be tcp, udp, ring, wg, ws, wss, quic, faketcp protocols.                                                                                      |
|                      | - Protocol and port pair: `<proto:port>`, e.g. wg:11011, means use WireGuard protocol to listen on port 11011.                                                                                        |
|                      | [env: ET_LISTENERS=]                                                                                                                                                                                  |
| `--mapped-listeners` | Manually specify the public address of the listener, other nodes can use this address to connect to this node. E.g.: `tcp://123.123.123.123:11223`, can specify multiple. [env: ET_MAPPED_LISTENERS=] |
| `--no-listener`      | Don't listen on any port, only connect to peer nodes [env: ET_NO_LISTENER=]                                                                                                                           |

### Other Settings

| Parameter                     | Description                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--hostname`                  | Hostname used to identify this device [env: ET_HOSTNAME=]                                                                                                                |
| `-m, --instance-name`         | Instance name, used to identify this VPN node on the same machine [env: ET_INSTANCE_NAME=]                                                                               |
| `--vpn-portal`                | Define the URL of the VPN portal, allowing other VPN clients to connect. E.g.: `wg://0.0.0.0:11010/10.14.14.0/24` [env: ET_VPN_PORTAL=]                                  |
| `--default-protocol`          | Default protocol used when connecting to peer nodes [env: ET_DEFAULT_PROTOCOL=]                                                                                          |
| `-u, --disable-encryption`    | Disable encryption for peer node communication, default is false, must be the same as peer nodes [env: ET_DISABLE_ENCRYPTION=]                                           |
| `--multi-thread`              | Use multi-threaded runtime, default is single-threaded [env: ET_MULTI_THREAD=]                                                                                           |
| `--disable-ipv6`              | Don't use IPv6 [env: ET_DISABLE_IPV6=]                                                                                                                                   |
| `--dev-name`                  | Optional TUN interface name [env: ET_DEV_NAME=]                                                                                                                          |
| `--mtu`                       | MTU of TUN device, default is 1380 when not encrypted, 1360 when encrypted [env: ET_MTU=]                                                                                |
| `--latency-first`             | Latency priority mode, will try to use the lowest latency path to forward traffic, default uses shortest path [env: ET_LATENCY_FIRST=]                                   |
| `--exit-nodes`                | Exit nodes for forwarding all traffic, virtual IPv4 addresses, priority determined by list order [env: ET_EXIT_NODES=]                                                   |
| `--enable-exit-node`          | Allow this node to become an exit node [env: ET_ENABLE_EXIT_NODE=]                                                                                                       |
| `--proxy-forward-by-system`   | Forward subnet proxy packets through system kernel, disable built-in NAT [env: ET_PROXY_FORWARD_BY_SYSTEM=]                                                              |
| `--no-tun`                    | Don't create TUN device, can use subnet proxy to access nodes [env: ET_NO_TUN=]                                                                                          |
| `--use-smoltcp`               | Enable smoltcp stack for subnet proxy and KCP proxy [env: ET_USE_SMOLTCP=]                                                                                               |
| `--manual-routes`             | Manually assign route CIDR, will disable subnet proxy and wireguard routes propagated from peer nodes. E.g.: `192.168.0.0/16` [env: ET_MANUAL_ROUTES=]                   |
| `--relay-network-whitelist`   | Only forward traffic from whitelisted networks, supports wildcard strings. Multiple network names can be separated by English spaces. [env: ET_RELAY_NETWORK_WHITELIST=] |
| `--disable-p2p`               | Disable P2P communication, only forward packets through nodes specified by `--peers` [env: ET_DISABLE_P2P=]                                                              |
| `--disable-udp-hole-punching` | Disable UDP hole punching function [env: ET_DISABLE_UDP_HOLE_PUNCHING=]                                                                                                  |
| `--relay-all-peer-rpc`        | Forward RPC packets from all peer nodes, even if peer nodes are not in the relay network whitelist. [env: ET_RELAY_ALL_PEER_RPC=]                                        |
| `--socks5`                    | Enable socks5 server, allowing socks5 clients to access virtual network. Format: `<port>`, e.g.: `1080` [env: ET_SOCKS5=]                                                |
| `--compression`               | Compression algorithm to use, supports `none`, `zstd`. Default is `none` [env: ET_COMPRESSION=]                                                                          |
| `--bind-device`               | Bind the connector's socket to a physical device to avoid routing issues. [env: ET_BIND_DEVICE=]                                                                         |
| `--enable-kcp-proxy`          | Use KCP proxy for TCP streams, improving latency and throughput on UDP packet loss networks. [env: ET_ENABLE_KCP_PROXY=]                                                 |
| `--disable-kcp-input`         | Don't allow other nodes to use KCP proxy TCP streams to this node. [env: ET_DISABLE_KCP_INPUT=]                                                                          |
| `--enable-quic-proxy`         | Use QUIC proxy for TCP streams, improving latency and throughput on UDP packet loss networks. [env: ET_ENABLE_QUIC_PROXY=]                                               |
| `--disable-quic-input`        | Don't allow other nodes to use QUIC proxy TCP streams to this node. [env: ET_DISABLE_QUIC_INPUT=]                                                                        |
| `--port-forward`              | Forward local ports to remote ports in virtual network. E.g.: `udp://0.0.0.0:12345/10.126.126.1:23456` [env: ET_PORT_FORWARD=]                                           |
| `--accept-dns`                | If true, enable Magic DNS. With Magic DNS, you can use domain names to access other nodes, e.g.: `<hostname>.et.net` [env: ET_ACCEPT_DNS=]                               |
| `--private-mode`              | If true, don't allow nodes using different network names and passwords from this network to handshake or relay through this node [env: ET_PRIVATE_MODE=]                 |
| `--foreign-relay-bps-limit`   | Limit bandwidth for relayed traffic [env: ET_FOREIGN_RELAY_BPS_LIMIT=]                                                                                                   |
| `--console-log-level`         | Console log level [env: ET_CONSOLE_LOG_LEVEL=]                                                                                                                           |
| `--file-log-level`            | File log level [env: ET_FILE_LOG_LEVEL=]                                                                                                                                 |
| `--file-log-dir`              | Directory to store log files [env: ET_FILE_LOG_DIR=]                                                                                                                     |

---

For more configuration options, please refer to the output of `easytier-core --help`.

---
