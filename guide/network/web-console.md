# 使用 Web 控制台

EasyTier 支持使用 [Web 控制台](/web/)来管理 EasyTier 节点，包括查看节点状态、配置节点参数、查看节点日志等。

## 注册账号

首次使用 Web 控制台需要注册账号，[注册地址](/web#/auth/register)。

## 运行 EasyTier 节点

如果希望 EasyTier 节点可以被 Web 控制台管理，需要在启动时指定 `--config-server` 或 `-w` 参数，例如：

```sh
./easytier-core -w <你的用户名>
```

> 请将 `<你的用户名>` 替换为你在 Web 控制台注册的用户名。

如果终端出现类似 “连接成功” 或 “已连接服务器” 的提示，则表示 Easytier Core 已成功连接到 Web 控制台的服务器。

::: danger 注意
一台机器只能有一个 EasyTier 进程被 Web 控制台管理，如果有多个进程可能会导致奇怪的问题。
:::

## 使用 Web 控制台

使用刚才注册的用户名和密码登录 [Web 控制台](/web/)，登录成功后会看到节点列表。

在网页上选择你需要配置的设备。

![alt text](/assets/web-homepage.png)

点开设备后，点击绿色的连接按钮。

![alt text](/assets/web-device-list.png)
![alt text](/assets/web-device-config.png)

进行配置

![alt text](/assets/web-device-run-network.png)

接下来的配置步骤与之前配置带 GUI 的程序相同。
