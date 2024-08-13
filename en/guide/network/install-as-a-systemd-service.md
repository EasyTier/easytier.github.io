# Installing as a Linux Systemd Service

On Linux distributions that support systemd, you can configure the service to start automatically with the system by following these steps:

1. Create a new service file at `/etc/systemd/system/easytier.service` and modify the command line parameters after `ExecStart` as needed.

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

2. After saving the file, run the following command in the terminal to enable the service:

```sh
systemctl enable easytier.service
```

3. You can start and stop the service using the following commands:

```sh
systemctl start easytier.service
systemctl stop easytier.service
```

Please note that using the `systemctl` command instead of the `service` command is the more modern approach, and it is recommended to use it on systems that support systemd.