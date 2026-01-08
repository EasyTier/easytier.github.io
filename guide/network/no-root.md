# 无 TUN 模式 （免 Root 权限）

::: danger 风险提示
`no_tun`模式在**2.4.5及之前的版本**中存在安全漏洞，建议升级到**2.5.0及以上版本**以确保安全性。

修复于 [PR #1435](https://github.com/EasyTier/EasyTier/pull/1435)
:::

由于创建 TUN 设备需要 ROOT 权限，对于一些无法获取 Root 权限的环境，EasyTier 也提供了不依赖 TUN 的使用方法。只需在启动 EasyTier 时，增加 `--no-tun` 参数即可。

使用无 TUN 模式组网时，节点可以通过虚拟 IP 被访问（TCP、UDP 和 ICMP 都支持），也可以做子网代理（使用 -n 参数）。但是无法主动发起对其他节点的访问。

为了在无 TUN 模式下主动访问其他节点，可使用 EasyTier 的 [SOCKS5 服务器功能](/guide/network/socks5)。
