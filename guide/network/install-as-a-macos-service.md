# 安装为 macOS 服务

下载并安装 [serviceman](https://webinstall.dev/serviceman)。

打开终端，运行如下命令注册服务：

```bash
# 使用配置文件注册 easytier 服务
sudo serviceman add --name easytier --daemon \         
--workdir /var/log/easytier \
--group wheel --user root \
-- easytier-core -c ~/.config/easytier.toml
```

```bash
# 不使用配置文件注册 easytier 服务
sudo serviceman add --name easytier --daemon \
--workdir /var/log/easytier \
--group wheel --user root \
-- easytier-core --ipv4 x.x.x.x --network-name xxx --network-secret yyy --peers tcp://peer_host:11010
```

启动 easytier 服务：

```bash
sudo launchctl start easytier
# 加载任务, -w选项会在下次登录/重新启动时重新启动。
launchctl load -w /Library/LaunchDaemons/easytier.plist
```

关闭 easytier 服务：

```bash
sudo launchctl stop easytier
# 卸载任务, -w选项会在下次登录/重新启动时不再执行。
launchctl unload -w /Library/LaunchDaemons/easytier.plist

```

查看运行日志：

```bash
sudo tail -f /var/log/easytier.log
```
