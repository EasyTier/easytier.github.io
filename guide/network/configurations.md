# 其他

可使用 `easytier-core --help` 查看全部配置项

```sh
一个简单、易用、去中心化的 SD-WAN 异地组网工具，把设备连接进一个虚拟网。

Usage: easytier-core [OPTIONS]

Options:
  -c, --config-file <CONFIG_FILE>                               配置文件路径，注意：如果设置了这个选项，其他所有选项都将被忽略
      --network-name <NETWORK_NAME>                             用于标识此虚拟网络的网络名称 [default: default]
      --network-secret <NETWORK_SECRET>                         网络密钥，用于验证此节点属于虚拟网络 [default: ]
  -i, --ipv4 <IPV4>                                             此节点的虚拟 IPv4 地址，如果为空，则此节点将仅转发数据包，不会创建TUN设备
  -d, --dhcp                                                    由Easytier自动确定并设置IP地址，默认从10.0.0.1开始。警告：在使用DHCP时，如果网络中出现IP冲突，IP将自动更改。
  -p, --peers [<PEERS>...]                                      最初要连接的对等节点
  -e, --external-node <EXTERNAL_NODE>                           使用公共共享节点来发现对等节点
  -n, --proxy-networks <PROXY_NETWORKS>                         将本地网络导出到虚拟网中的其他对等节点
  -r, --rpc-portal <RPC_PORTAL>                                 用于管理的RPC门户地址。0表示随机端口，12345表示在localhost的12345上监听，0.0.0.0:12345表示在所有接口的12345上监听。默认是0，首先尝试15888 [default: 0]
  -l, --listeners [<LISTENERS>...]                              监听器用于接受连接，允许以下格式：
                                                                端口号：<11010>，意味着tcp/udp将在11010端口监听，ws/wss将在11010和11011端口监听，wg将在11011端口监听。
                                                                url：<tcp://0.0.0.0:11010>，其中tcp可以是tcp、udp、ring、wg、ws、wss协议。
                                                                协议和端口对：<proto:port>，例如wg:11011，表示使用WireGuard协议在11011端口监听。URL 和 协议端口对 可以多次出现。
                                                                 [default: 11010]
      --no-listener                                             不监听任何端口，只连接到对等节点
      --console-log-level <CONSOLE_LOG_LEVEL>                   控制台日志级别
      --file-log-level <FILE_LOG_LEVEL>                         文件日志级别
      --file-log-dir <FILE_LOG_DIR>                             存储日志文件的目录
      --hostname <HOSTNAME>                                     用于标识此设备的主机名
  -m, --instance-name <INSTANCE_NAME>                           实例名称，用于在同一台机器上标识此节点 [default: default]
      --vpn-portal <VPN_PORTAL>                                 定义 WireGuard 门户的URL，允许其他 WireGuard 客户端连接。示例：wg://0.0.0.0:11010/10.14.14.0/24，表示 WireGuard 门户是监听在0.0.0.0:11010的 wireguard 服务器，WireGuard 客户端在10.14.14.0/24网络中
      --default-protocol <DEFAULT_PROTOCOL>                     连接到对等节点时使用的默认协议
  -u, --disable-encryption                                      禁用对等节点通信的加密，默认为false，必须与对等节点相同
      --multi-thread                                            使用多线程运行时，默认为单线程
      --disable-ipv6                                            不使用IPv6
      --dev-name <DEV_NAME>                                     可选的TUN接口名称
      --mtu <MTU>                                               TUN设备的MTU，默认为非加密时为1420，加密时为1400
      --latency-first                                           延迟优先模式，将尝试使用最低延迟路径转发流量，默认使用最短路径
      --exit-nodes [<EXIT_NODES>...]                            转发所有流量的出口节点，虚拟IPv4地址，优先级由列表顺序决定
      --enable-exit-node                                        允许此节点成为出口节点
      --no-tun                                                  不创建TUN设备，可以使用子网代理访问节点
      --use-smoltcp                                             为子网代理启用smoltcp堆栈
      --manual-routes [<MANUAL_ROUTES>...]                      手动分配路由CIDR，将禁用子网代理和从对等节点传播的wireguard路由。例如：192.168.0.0/16
      --relay-network-whitelist [<RELAY_NETWORK_WHITELIST>...]  仅转发白名单网络的流量，支持通配符字符串。多个网络名称间可以使用英文空格间隔。
                                                                如果该参数为空，则禁用转发。默认允许所有网络。
                                                                例如：'*'（所有网络），'def*'（以def为前缀的网络），'net1 net2'（只允许net1和net2）"
      --disable-p2p                                             禁用P2P通信，只通过--peers指定的节点转发数据包
      --disable-udp-hole-punching                               禁用UDP打洞功能
      --relay-all-peer-rpc                                      转发所有对等节点的RPC数据包，即使对等节点不在转发网络白名单中。这可以帮助白名单外网络中的对等节点建立P2P连接。
      --socks5 <SOCKS5>                                         启用 socks5 服务器，允许 socks5 客户端访问虚拟网络. 格式: <端口>，例如：1080
      --ipv6-listener <IPV6_LISTENER>                           IPv6 监听器的URL，例如：tcp://[::]:11010，如果未设置，将在随机UDP端口上监听
  -h, --help                                                    Print help
  -V, --version                                                 Print version
```
