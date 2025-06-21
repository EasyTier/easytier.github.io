# 完整配置选项

可使用 `easytier-core --help` 查看全部配置项。

## 基本设置

### 配置服务器

| 参数                  | 说明                                                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `-w, --config-server` | 配置服务器地址。允许格式：                                                                                                         |
|                       | - 完整URL：`--config-server udp://127.0.0.1:22020/admin`                                                                           |
|                       | - 仅用户名：`--config-server admin`，将使用官方的服务器                                                                            |
|                       | [env: ET_CONFIG_SERVER=]                                                                                                           |
| `--machine-id`        | Web 配置服务器通过 machine id 来识别机器，用于断线重连后的配置恢复，需要保证唯一且固定不变。默认从系统获得。 [env: ET_MACHINE_ID=] |
| `-c, --config-file`   | 配置文件路径，注意：命令行中的配置的选项会覆盖配置文件中的选项 [env: ET_CONFIG_FILE=]                                              |

### 网络设置

| 参数                   | 说明                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `--network-name`       | 用于标识此VPN网络的网络名称 [env: ET_NETWORK_NAME=]                                                                                         |
| `--network-secret`     | 网络密钥，用于验证此节点属于VPN网络 [env: ET_NETWORK_SECRET=]                                                                               |
| `-i, --ipv4`           | 此VPN节点的IPv4地址。如果为空，则此节点将仅转发数据包，不会创建TUN设备 [env: ET_IPV4=]                                                      |
| `-d, --dhcp`           | 由Easytier自动确定并设置IP地址，默认从10.0.0.1开始。警告：在使用DHCP时，如果网络中出现IP冲突，IP将自动更改。 [env: ET_DHCP=]                |
| `-p, --peers`          | 最初要连接的对等节点 [env: ET_PEERS=]                                                                                                       |
| `-e, --external-node`  | 使用公共共享节点来发现对等节点 [env: ET_EXTERNAL_NODE=]                                                                                     |
| `-n, --proxy-networks` | 将本地网络导出到VPN中的其他对等节点，例如：`10.0.0.0/24`。支持映射到其他CIDR，例如：`10.0.0.0/24->192.168.0.0/24` [env: ET_PROXY_NETWORKS=] |

### RPC 设置

| 参数                     | 说明                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `-r, --rpc-portal`       | 用于管理的RPC门户地址。支持以下格式：                                                                              |
|                          | - `0` 表示随机端口                                                                                                 |
|                          | - `12345` 表示在localhost的12345上监听                                                                             |
|                          | - `0.0.0.0:12345` 表示在所有接口的12345上监听                                                                      |
|                          | 默认是 `0`，首先尝试 `15888`                                                                                       |
|                          | [env: ET_RPC_PORTAL=]                                                                                              |
| `--rpc-portal-whitelist` | RPC门户白名单，仅允许这些地址访问RPC门户，例如：`127.0.0.1/32,127.0.0.0/8,::1/128` [env: ET_RPC_PORTAL_WHITELIST=] |

### 监听器设置

| 参数                 | 说明                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `-l, --listeners`    | 监听器用于接受连接，支持以下格式：                                                                                                            |
|                      | - 端口号：`<11010>`，意味着tcp/udp将在11010端口监听，ws/wss将在11010和11011端口监听，wg将在11011端口监听。                                    |
|                      | - URL：`<tcp://0.0.0.0:11010>`，其中tcp可以是tcp、udp、ring、wg、ws、wss协议。                                                                |
|                      | - 协议和端口对：`<proto:port>`，例如wg:11011，表示使用WireGuard协议在11011端口监听。                                                          |
|                      | [env: ET_LISTENERS=]                                                                                                                          |
| `--mapped-listeners` | 手动指定监听器的公网地址，其他节点可以使用该地址连接到本节点。例如：`tcp://123.123.123.123:11223`，可以指定多个。 [env: ET_MAPPED_LISTENERS=] |
| `--no-listener`      | 不监听任何端口，只连接到对等节点 [env: ET_NO_LISTENER=]                                                                                       |

### 其他设置

| 参数                          | 说明                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `--hostname`                  | 用于标识此设备的主机名 [env: ET_HOSTNAME=]                                                                          |
| `-m, --instance-name`         | 实例名称，用于在同一台机器上标识此VPN节点 [env: ET_INSTANCE_NAME=]                                                  |
| `--vpn-portal`                | 定义VPN门户的URL，允许其他VPN客户端连接。例如：`wg://0.0.0.0:11010/10.14.14.0/24` [env: ET_VPN_PORTAL=]             |
| `--default-protocol`          | 连接到对等节点时使用的默认协议 [env: ET_DEFAULT_PROTOCOL=]                                                          |
| `-u, --disable-encryption`    | 禁用对等节点通信的加密，默认为false，必须与对等节点相同 [env: ET_DISABLE_ENCRYPTION=]                               |
| `--multi-thread`              | 使用多线程运行时，默认为单线程 [env: ET_MULTI_THREAD=]                                                              |
| `--disable-ipv6`              | 不使用IPv6 [env: ET_DISABLE_IPV6=]                                                                                  |
| `--dev-name`                  | 可选的TUN接口名称 [env: ET_DEV_NAME=]                                                                               |
| `--mtu`                       | TUN设备的MTU，默认为非加密时为1380，加密时为1360 [env: ET_MTU=]                                                     |
| `--latency-first`             | 延迟优先模式，将尝试使用最低延迟路径转发流量，默认使用最短路径 [env: ET_LATENCY_FIRST=]                             |
| `--exit-nodes`                | 转发所有流量的出口节点，虚拟IPv4地址，优先级由列表顺序决定 [env: ET_EXIT_NODES=]                                    |
| `--enable-exit-node`          | 允许此节点成为出口节点 [env: ET_ENABLE_EXIT_NODE=]                                                                  |
| `--proxy-forward-by-system`   | 通过系统内核转发子网代理数据包，禁用内置NAT [env: ET_PROXY_FORWARD_BY_SYSTEM=]                                      |
| `--no-tun`                    | 不创建TUN设备，可以使用子网代理访问节点 [env: ET_NO_TUN=]                                                           |
| `--use-smoltcp`               | 为子网代理和 KCP 代理启用smoltcp堆栈 [env: ET_USE_SMOLTCP=]                                                         |
| `--manual-routes`             | 手动分配路由CIDR，将禁用子网代理和从对等节点传播的wireguard路由。例如：`192.168.0.0/16` [env: ET_MANUAL_ROUTES=]    |
| `--relay-network-whitelist`   | 仅转发白名单网络的流量，支持通配符字符串。多个网络名称间可以使用英文空格间隔。 [env: ET_RELAY_NETWORK_WHITELIST=]   |
| `--disable-p2p`               | 禁用P2P通信，只通过`--peers`指定的节点转发数据包 [env: ET_DISABLE_P2P=]                                             |
| `--disable-udp-hole-punching` | 禁用UDP打洞功能 [env: ET_DISABLE_UDP_HOLE_PUNCHING=]                                                                |
| `--relay-all-peer-rpc`        | 转发所有对等节点的RPC数据包，即使对等节点不在转发网络白名单中。 [env: ET_RELAY_ALL_PEER_RPC=]                       |
| `--socks5`                    | 启用 socks5 服务器，允许 socks5 客户端访问虚拟网络。格式: `<端口>`，例如：`1080` [env: ET_SOCKS5=]                  |
| `--compression`               | 要使用的压缩算法，支持 `none`、`zstd`。默认为 `none` [env: ET_COMPRESSION=]                                         |
| `--bind-device`               | 将连接器的套接字绑定到物理设备以避免路由问题。 [env: ET_BIND_DEVICE=]                                               |
| `--enable-kcp-proxy`          | 使用 KCP 代理 TCP 流，提高在 UDP 丢包网络上的延迟和吞吐量。 [env: ET_ENABLE_KCP_PROXY=]                             |
| `--disable-kcp-input`         | 不允许其他节点使用 KCP 代理 TCP 流到此节点。 [env: ET_DISABLE_KCP_INPUT=]                                           |
| `--enable-quic-proxy`         | 使用 QUIC 代理 TCP 流，提高在 UDP 丢包网络上的延迟和吞吐量。 [env: ET_ENABLE_QUIC_PROXY=]                           |
| `--disable-quic-input`        | 不允许其他节点使用 QUIC 代理 TCP 流到此节点。 [env: ET_DISABLE_QUIC_INPUT=]                                         |
| `--port-forward`              | 将本地端口转发到虚拟网络中的远程端口。例如：`udp://0.0.0.0:12345/10.126.126.1:23456` [env: ET_PORT_FORWARD=]        |
| `--accept-dns`                | 如果为true，则启用魔法DNS。使用魔法DNS，您可以使用域名访问其他节点，例如：`<hostname>.et.net` [env: ET_ACCEPT_DNS=] |
| `--private-mode`              | 如果为true，则不允许使用了与本网络不相同的网络名称和密码的节点通过本节点进行握手或中转 [env: ET_PRIVATE_MODE=]      |
| `--foreign-relay-bps-limit`   | 限制转发流量的带宽 [env: ET_FOREIGN_RELAY_BPS_LIMIT=]                                                               |
| `--console-log-level`         | 控制台日志级别 [env: ET_CONSOLE_LOG_LEVEL=]                                                                         |
| `--file-log-level`            | 文件日志级别 [env: ET_FILE_LOG_LEVEL=]                                                                              |
| `--file-log-dir`              | 存储日志文件的目录 [env: ET_FILE_LOG_DIR=]                                                                          |

---

更多配置项请参考 `easytier-core --help` 输出。

---
