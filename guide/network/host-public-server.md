# 搭建共享节点

用户可以使用自己的公网节点自建用于无公网 IP 组网的公共共享节点，方便其他无公网 IP 的用户组网。 需要不带任何参数启动 EasyTier，该节点就可作为公共服务器使用（不需要 root 权限）：

```shell
easytier-core
```

另外 EasyTier 支持共享节点集群。每个虚拟网络（通过相同的网络名称和密钥建链）都可以充当共享节点集群，其他网络的节点可以连接到共享节点集群中的任意节点，无需公共 IP 即可发现彼此。运行自建的公共服务器集群与运行虚拟网络完全相同，不过可以跳过配置 ipv4 地址。

如果你希望为 EasyTier 社区贡献公共服务器，可以联系管理员，我们将告知你如何将你的节点添加到社区共享节点列表中。当然这需要你的节点有一定的带宽和稳定性。

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
ExecStart=/usr/local/bin/easytier-core --hostname <your-hostname> --network-name <your-network> --network-secret <your-secret> -p tcp://public.easytier.top:11010
Restart=always
RestartSec=3
LimitNOFILE=1048576
Environment=TOKIO_CONSOLE=1

[Install]
WantedBy=multi-user.target
```

## 配置 fail2ban

如您贡献了公共服务器，可能会遇到这样的问题：大量的节点尝试连接到您的服务器，但是无法建立连接

```plain
connection error. local: udp://0.0.0.0:11010, remote: udp://***.***.***.***:14947, err: wait resp error: wait handshake timeout: Elapsed(())
```

此时建议配置 `fail2ban`，以阻止这样的用户访问节点，可以有效的降低服务器的连接数，提高用户的访问质量。

配置方法如下：

以 Fedora 42 为例：

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

此处的策略代表：`findtime=600s` 尝试 `maxretry=3` 次失败，则会被关进小黑屋（阻止访问）`bantime=3600s` 一小时。

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

此时服务器连接数应该明显降低：

```shell
netstat -ntp | grep easytier
```
