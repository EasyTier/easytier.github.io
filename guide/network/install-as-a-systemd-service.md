# 将服务安装为 Linux Systemd 服务

在支持 systemd 的 Linux 发行版中，可以通过以下步骤将服务配置为随系统启动：

1. 创建新的服务文件 `/etc/systemd/system/easytier.service`。推荐将 EasyTier 的网络配置放到 TOML 文件中；如果你更习惯直接写参数，也可以继续使用命令行方式。

::: code-group

```ini [配置文件方式]
[Unit]
Description=EasyTier Service
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
ExecStart=/root/easytier-core -c /etc/easytier/config.toml

[Install]
WantedBy=multi-user.target
```

```ini [命令行参数方式]
[Unit]
Description=EasyTier Service
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
ExecStart=/root/easytier-core --ipv4 x.x.x.x --network-name xxx --network-secret yyy --peers tcp://peer_host:11010

[Install]
WantedBy=multi-user.target
```

:::

如果使用配置文件方式，可将 EasyTier 配置保存为 `/etc/easytier/config.toml`：

```toml
ipv4 = "x.x.x.x"

[network_identity]
network_name = "xxx"
network_secret = "yyy"

[[peer]]
uri = "tcp://peer_host:11010"
```

2. 保存文件后，在命令行中执行以下命令以启用服务：

```sh
systemctl enable easytier.service
```

3. 启动和停止服务可以使用以下命令：

```sh
systemctl start easytier.service
systemctl stop easytier.service
```

请注意，使用 `systemctl` 命令替代 `service` 命令是更现代的做法，建议在支持 systemd 的系统中使用。
