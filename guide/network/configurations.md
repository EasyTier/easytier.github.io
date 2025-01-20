# 完整配置选项

可使用 `easytier-core --help` 查看全部配置项

## 基本设置

- **启动与版本**

  - `-h, --help`: 打印帮助信息。
  - `-V, --version`: 打印版本信息。

- **配置文件**

  - `-c, --config-file <CONFIG_FILE>`: 配置文件路径。如果设置了此选项，其他所有选项都将被忽略。

- **实例标识**
  - `--hostname <HOSTNAME>`: 用于标识此设备的主机名。
  - `-m, --instance-name <INSTANCE_NAME>`: 实例名称，默认为`default`。

## 网络配置

- **服务器与网络**

  - `-w, --config-server <CONFIG_SERVER>`: 配置服务器地址。
  - `--network-name <NETWORK_NAME>`: 网络名称，默认为`default`。
  - `--network-secret <NETWORK_SECRET>`: 网络密钥，默认为空。

- **IP配置**
  - `-i, --ipv4 <IPV4>`: 此节点的IPv4地址，空表示仅转发数据包。
  - `-d, --dhcp`: 自动设置IP地址，默认从10.0.0.1开始。
  - `--dev-name <DEV_NAME>`: 可选TUN接口名称。
  - `--mtu <MTU>`: TUN设备的MTU，默认非加密时为1380，加密时为1360。

## 连接管理

- **监听器与门户**

  - `-l, --listeners [<LISTENERS>...]`: 监听器用于接受连接。
  - `--mapped-listeners [<MAPPED_LISTENERS>...]`: 指定监听器的公网地址。
  - `--no-listener`: 不监听任何端口。
  - `--vpn-portal <VPN_PORTAL>`: 定义VPN门户的URL。
  - `--rpc-portal <RPC_PORTAL>`: 管理的RPC门户地址，默认尝试15888。

- **节点与路由**
  - `-p, --peers [<PEERS>...]`: 初始要连接的对等节点。
  - `-e, --external-node <EXTERNAL_NODE>`: 使用公共共享节点来发现对等节点。
  - `--exit-nodes [<EXIT_NODES>...]`: 转发所有流量的出口节点。
  - `--enable-exit-node`: 允许此节点成为出口节点。
  - `--manual-routes [<MANUAL_ROUTES>...]`: 手动分配路由CIDR。
  - `--relay-network-whitelist [<RELAY_NETWORK_WHITELIST>...]`: 仅转发白名单网络的流量。

## 日志和调试

- **日志级别**

  - `--console-log-level <CONSOLE_LOG_LEVEL>`: 控制台日志级别。
  - `--file-log-level <FILE_LOG_LEVEL>`: 文件日志级别。

- **日志存储**
  - `--file-log-dir <FILE_LOG_DIR>`: 存储日志文件的目录。

## 高级功能

- **性能优化**

  - `--latency-first`: 延迟优先模式。
  - `--multi-thread`: 使用多线程运行时。
  - `--disable-udp-hole-punching`: 禁用UDP打洞功能。

- **安全与隐私**

  - `-u, --disable-encryption`: 禁用加密，默认为false。
  - `--disable-ipv6`: 不使用IPv6。
  - `--compression <COMPRESSION>`: 使用的压缩算法，默认为`none`。

- **代理与转发**

  - `--proxy-networks <PROXY_NETWORKS>`: 导出本地网络到其他对等节点。
  - `--socks5 <SOCKS5>`: 启用 socks5 服务器。
  - `--ipv6-listener <IPV6_LISTENER>`: IPv6监听器URL。
  - `--no-tun`: 不创建TUN设备。
  - `--use-smoltcp`: 启用smoltcp堆栈。
  - `--bind-device <BIND_DEVICE>`: 绑定套接字到物理设备。
  - `--relay-all-peer-rpc`: 转发所有对等节点的RPC数据包。

- **限制通信**
  - `--disable-p2p`: 禁用P2P通信。
  - `--no-tun`: 不创建TUN设备以使用子网代理访问节点。
