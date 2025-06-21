# 魔法 DNS

EasyTier 支持类似 Tailscale 的魔法 DNS 功能，允许用户通过域名访问其他节点，无需记住虚拟 IP 地址。只要在启动时加入 `--accept-dns` 参数即可启用魔法 DNS 功能。

魔法 DNS 默认使用 `100.100.100.101` 作为 DNS 服务器地址，可以 `ping` 该地址测试魔法 DNS 是否成功启用。

假设魔法 DNS 启用成功，节点 A 的主机名为 `node-a`，则其他节点可以通过 `node-a.et.net` 访问节点 A。

```sh
ping node-a.et.net
```

主机名支持中文。

::: tip 注意
魔法 DNS 目前仅支持在 Windows 和 MacOS 上自动配置系统 DNS，Linux 上需要手动配置 DNS 服务器为 `100.100.100.101` 才可正常使用。
:::
