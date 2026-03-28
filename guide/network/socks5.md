# SOCKS5

EasyTier 支持创建 SOCKS5 服务器，节点上的其他程序可以通过将代理设置为 EasyTier 的 SOCKS5 服务，即可访问虚拟网和虚拟网中的其他代理子网。

SOCKS5 服务的开启参数形为 `--socks5 12333`，将此参数加入 easytier-core 启动命令后，本机的 12333 端口即可服务于 SOCKS5 客户端。目前 SOCKS5 服务端无需用户名和密码验证，可直接使用。

::: code-group

```sh [命令行参数]
easytier-core --socks5 12333
```

```toml [配置文件]
socks5_proxy = "socks5://0.0.0.0:12333"
```

:::

将上面的配置保存为 `config.toml` 后，可通过 `easytier-core -c ./config.toml` 启动。
