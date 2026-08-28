# 搭建共享节点

用户可以使用自己的公网节点自建用于无公网 IP 组网的公共共享节点，方便其他无公网 IP 的用户组网。 需要不带任何参数启动 EasyTier，该节点就可作为公共服务器使用（不需要 root 权限）：

```shell
easytier-core
```

另外 EasyTier 支持共享节点集群。每个虚拟网络（通过相同的网络名称和密钥建链）都可以充当共享节点集群，其他网络的节点可以连接到共享节点集群中的任意节点，无需公共 IP 即可发现彼此。运行自建的公共服务器集群与运行虚拟网络完全相同，不过可以跳过配置 ipv4 地址。

## 关闭转发

另外，默认情况下， EasyTier 的每个节点都允许为其他虚拟网提供转发服务，即使该节点已经指定了 网络名 (`--network-name`) 和 网络密钥 (`--network-secret`)、并已加入一个虚拟网。

若需改变此行为，可通过 `--relay-network-whitelist` 参数限定可被转发的网络名白名单（空格分割的通配符列表，如 `"ab* abc"`）。当该参数的列表为空时，就不会为所有其他网络提供转发服务。

EasyTier 可以做到不转发其他虚拟网的网络包，而是只帮助他们建立 P2P 链接，只需将白名单置空，并设置仅转发 RPC 流量即可。参考命令为：

```shell
easytier-core --relay-network-whitelist --relay-all-peer-rpc
```

## 私有模式

如果你希望 EasyTier 仅在你的虚拟网络中提供服务，而不希望其他虚拟网的节点连接到你的节点，可以使用 `--private-mode true` 参数启动 EasyTier。

```shell
sudo easytier-core --private-mode true --network-name my-network --network-secret my-secret
```

这会仅允许网络名为 `my-network` 且密钥为 `my-secret` 的节点连接到该 EasyTier 节点。

## 配置 systemd 自启动

可以参考：[安装为 Linux systemd 服务](install-as-a-systemd-service)

值得注意的是，作为服务器运行时，由于 Linux 默认给用户配置的 fd 上限为 1024，可能会面临 fd 耗尽的问题。

此时应该配置 `LimitNOFILE` 在 serivce 文件中，如：

```shell
LimitNOFILE=1048576
```

配置好的 service unit 供参考：

```shell
# cat /etc/systemd/system/easytier.service

[Unit]
Description=EasyTier Service
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/easytier-core --hostname <your-hostname> --network-name <your-network> --network-secret <your-secret>
Restart=always
RestartSec=3
LimitNOFILE=1048576
Environment=TOKIO_CONSOLE=1

[Install]
WantedBy=multi-user.target
```

## 前端限流

如果共享节点直接暴露在公网，建议在 EasyTier 前面放置反向代理、四层网关或防火墙做限流。内存分配器可以帮助被攻击后的 RSS 回落，但不能替代连接限流；CC 攻击时应优先限制新连接、并发连接、慢握手和异常大请求。

### WebSocket 入口

如果使用 `ws://` 或 `wss://` 监听，可以用 NGINX HTTP 反向代理限制每个 IP 的请求速率和并发连接数：

```nginx
http {
    limit_req_zone $binary_remote_addr zone=easytier_req_per_ip:20m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=easytier_conn_per_ip:20m;
    limit_conn_zone $server_name zone=easytier_conn_total:20m;

    server {
        listen 443 ssl http2;
        server_name example.com;

        location / {
            limit_req zone=easytier_req_per_ip burst=20 nodelay;
            limit_conn easytier_conn_per_ip 20;
            limit_conn easytier_conn_total 20000;

            proxy_pass http://127.0.0.1:11010;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_read_timeout 300s;
            proxy_send_timeout 30s;
            client_header_timeout 5s;
            client_body_timeout 5s;
            client_max_body_size 1m;
            large_client_header_buffers 4 8k;
        }
    }
}
```

如果节点主要服务可信用户，可以适当提高 `limit_conn easytier_conn_per_ip`；如果正在被打，可以先降低到 `3` 到 `5`。

### TCP 入口

如果使用 `tcp://` 监听，可以用 NGINX stream 模块做四层连接数限制：

```nginx
stream {
    limit_conn_zone $binary_remote_addr zone=easytier_tcp_per_ip:20m;

    server {
        listen 11010;
        proxy_pass 127.0.0.1:11011;

        limit_conn easytier_tcp_per_ip 10;
        proxy_connect_timeout 3s;
        proxy_timeout 300s;
    }
}
```

上面的例子中，NGINX 对外监听 `11010`，EasyTier 实际监听 `127.0.0.1:11011`。

### UDP 和 QUIC 入口

`udp://` 和 `quic://` 更适合在防火墙或云厂商四层防护上限流。例如使用 nftables 对新 UDP 流量做粗限速：

```shell
sudo nft add rule inet filter input udp dport 11010 ct state new limit rate over 100/second burst 200 packets drop
```

实际阈值需要根据节点带宽、CPU 和用户规模调整。公共节点应保留白名单策略，避免大量用户共用同一个 NAT 出口时被误伤。

### 内存回落配置

CI Release 构建中，常见的 x86 Linux 包使用 `jemalloc`，部分平台（如 Windows、aarch64、riscv64、loongarch64、freebsd）使用 `mimalloc`。

从 v2.6.4 之后，`jemalloc` 构建会内置较积极的 RSS 回落配置。如果需要临时调整，可以在 systemd service 中增加环境变量：

```ini
Environment=MALLOC_CONF=background_thread:true,dirty_decay_ms:10000,muzzy_decay_ms:10000,retain:false
```

`mimalloc` 平台可以使用：

```ini
Environment=MIMALLOC_PURGE_DELAY=100
Environment=MIMALLOC_PURGE_DECOMMITS=1
```

更小的 purge delay 会让 RSS 更快回落，但可能带来更高的 CPU 开销；更大的 delay 更偏向性能，但攻击流量结束后内存回落会更慢。

## 配置 fail2ban

如您贡献了公共服务器，可能会遇到这样的问题：大量的节点尝试连接到您的服务器，但是无法建立连接

```plain
connection error. local: udp://0.0.0.0:11010, remote: udp://***.***.***.***:14947, err: wait resp error: wait handshake timeout: Elapsed(())
```

此时建议配置 `fail2ban`，以阻止这样的用户访问节点，可以有效的降低服务器的连接数，提高用户的访问质量。

以 Fedora 42 为例，配置方法如下：

```shell
# install fail2ban
sudo dnf install fail2ban

# enable and start
sudo systemctl enable --now fail2ban
```

配置日志过滤器：

```ini
# cat /etc/fail2ban/filter.d/easytier.conf
[Definition]
failregex = remote: \S+://<HOST>:\d+, err: wait resp error:.+
```

配置 jail：

```ini
# cat /etc/fail2ban/jail.local
[easytier]
enabled = true
filter  = easytier
backend = systemd
journalmatch = '_SYSTEMD_UNIT=easytier.service'
maxretry = 3
bantime  = 3600
findtime = 600
banaction = nftables-multiport
```

此处的策略代表：`findtime=600s` 内尝试 `maxretry=3` 次失败，则会被关进小黑屋（阻止访问）`bantime=3600s` 一小时。

配置好后，重载 `fail2ban`

```shell
sudo fail2ban-client reload
# OK
```

配置后，检查运行状态，可以看到已经阻止的客户端列表：

```shell
sudo fail2ban-client status easytier
```

```plain
Status for the jail: easytier
|- Filter
|  |- Currently failed: 11
|  |- Total failed:     4742
|  `- Journal matches:  _SYSTEMD_UNIT=easytier.service
`- Actions
   |- Currently banned: 99
   |- Total banned:     663
   `- Banned IP list:   ***
```

此时服务器连接数应该明显降低（可能需要等待一会儿才能看到效果）：

```shell
netstat -ntp | grep easytier
```
