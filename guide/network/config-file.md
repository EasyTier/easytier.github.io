# 配置文件

支持使用 -c 参数指定配置文件路径。

```sh
easytier-core -c ./config.yaml
```

::: warning 注意
注意：配置文件中的参数可以被命令行覆盖，比如配置文件中指定了 `--hostname abc`，但在命令行中使用 `--hostname xyz`，则会使用命令行中的主机名参数 `xyz`。
:::

使用参数运行可以获得对应参数的配置文件。配置文件会打印在命令行中，可以手动复制对应配置保存为toml文件即可。

在不使用参数的情况下直接运行 `easytier-core` 可以获得最小配置文件。

## EasyTier 配置助手

如果不想手动编写配置文件，可以访问 [EasyTier 配置助手](https://easytier.cn/assistant/) 按需生成配置文件，然后通过 `-c` 参数加载：

```sh
easytier-core -c ./config.toml
```

## 为其他节点分配公网 IPv6 地址

如果运营商向 OpenWrt 路由器下发了公网 IPv6 前缀，路由器可以把该前缀中的地址分给同一 EasyTier 网络中的节点。以下设置分别写在各节点现有 TOML 配置文件的顶层，放在 `[network_identity]`、`[flags]` 等表头之前。

**在路由器上**（提供地址的一端仅支持 Linux），添加 `--ipv6-public-addr-provider` 对应的配置：

```toml
ipv6_public_addr_provider = true
```

EasyTier 默认从系统路由检测前缀。如果检测不到，可在同一位置添加 `ipv6_public_addr_prefix = "2001:db8:1234::/64"`，将示例前缀替换为运营商实际路由到该设备、可供分配的前缀。

**在需要公网 IPv6 地址的节点上**，添加 `--ipv6-public-addr-auto` 对应的配置：

```toml
ipv6_public_addr_auto = true
```

重启两端的 EasyTier 服务，或分别用 `easytier-core -c ./config.toml` 加载各自的配置文件。

## 多配置文件启动

可以通过 `-c` 参数指定多个配置文件，EasyTier 会在一个进程中加载多个配置文件并启动多个虚拟网络。

```sh
easytier-core -c ./config1.yaml -c ./config2.yaml
```
