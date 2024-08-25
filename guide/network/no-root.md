# 无 TUN 模式 （免 Root 权限）

由于创建 TUN 设备需要 ROOT 权限，对于一些无法获取 Root 权限的环境，EasyTier 也提供了不依赖 TUN 的使用方法。只需在启动 EasyTier 时，增加 `--no-tun` 参数即可。

使用无 TUN 模式组网时，节点可以通过虚拟 IP 被访问（TCP、UDP 和 ICMP 都支持），也可以做子网代理（使用 -n 参数）。但是无法主动发起对其他节点的访问。

为了在无 TUN 模式下主动访问其他节点，EasyTier 支持创建 SOCKS5 服务器，节点上的其他程序可以通过将代理设置为 EasyTier 的 SOCKS5 服务，即可访问虚拟网和虚拟网中的其他代理子网。

SOCKS5 服务的开启参数形为 `--socks5 12333`，将此参数加入 easytier-core 启动命令后，本机的 12333 端口即可服务于 SOCKS5 客户端。目前 SOCKS5 服务端无需用户名和密码验证，可直接使用。
