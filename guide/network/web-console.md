# 使用 Web 控制台

EasyTier 支持使用 Web 控制台 来管理 EasyTier 节点，包括查看节点状态、配置节点参数、查看节点日志等。

您可以通过自建 Web 控制台来管理 EasyTier 节点，EasyTier Web 控制台采用前后端分离的架构，在设计上共有3个服务

1. Web 前端（默认11211端口）
2. Web API 后端（默认11211端口）
3. 配置下发端（默认22020端口，UDP协议）

其中，web前端与web api后端默认绑定在同一端口，配置下发端则是web api后端的一部分。

EasyTier的web控制台有2个版本

- `easytier-web`（仅web api后端）
- `easytier-web-embed`（web前端 + web api后端）

下面举一个用`easytier-web-embed`前后端同时部署的例子

```sh
./easytier-web-embed \
    --api-server-port 11211 \
    --api-host "http://127.0.0.1:11211" \
    --config-server-port 22020 \
    --config-server-protocol udp
```

运行后若无任何内容显示则成功。

下面是`easytier-web-embed`常用参数的说明：

- `--api-server-port`: web前后端的端口
- `--api-host`: 在web前端指定web api后端的访问地址（不设你就只能在web前端手动指定api后端地址）
- `--config-server-port`: 用于easytier-core连接的配置下发端的端口
- `--config-server-protocol`: 用于easytier-core连接的配置下发端的协议（支持 tcp, udp, ws）
- `--web-server-port`: 额外监听web前端的端口（注：此设置不受 --no-web 影响）
- `--no-web`: 不运行web前端（关闭 --api-server-port 端口的前端功能）

之后打开 Web 控制台 `http://127.0.0.1:11211`就可以看到这个页面。

![alt text](/assets/web-api-host-config.png)

点击`Register`注册一个账户，若刷新不出验证码则说明你`--api-host`设置有误。

![alt text](/assets/web-no-captcha.png)

## 接入自建 Web 控制台

前面我们本地搭建好了web控制台，并且配置下发端口为22020，协议UDP，那么easytier接入自建控制台的指令就是

```sh
# ./easytier-core -w <protocol>://<host>:<port>/<你在自建web控制台上的用户名>
# protocol: udp, tcp, ws, wss
./easytier-core -w udp://127.0.0.1:22020/<你在自建web控制台上的用户名>
```

接下来的用法就和官方控制台一样了。

::: tip 注意

Web 控制台有了两个默认账户，用户名与密码分别为`admin`和`user`。虽然这属于普通账户，但仍需留意其存在。

:::

::: tip 注意

当设置监听的协议为ws时，若被反向代理为wss，则连接时可填写protocol为`wss`。

:::
