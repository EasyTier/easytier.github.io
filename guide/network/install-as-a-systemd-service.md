# 将服务安装为 Linux Systemd 服务

在支持 systemd 的 Linux 发行版中，可以通过以下步骤将服务配置为随系统启动：

1. 创建新的服务文件 `/etc/systemd/system/easytier.service`，并根据需要修改 `ExecStart` 后面的命令行参数。

```shell
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