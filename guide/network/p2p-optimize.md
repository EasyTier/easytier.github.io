# P2P 优化

如果你希望 EasyTier 更容易与其他节点建立 P2P 连接，可以通过以下方式进行优化。

## IPv6

EasyTier 支持节点间通过 IPv6 进行 P2P 通信，默认 EasyTier 会随机监听一个 IPv6 UDP 端口。

在某些情况下，指定监听 IPv6 地址和端口可能更有利于节点间的 P2P 通信。
可以使用 `-l` 配置 IPv6 的监听器。 例如：

```sh
easytier-core -l 'tcp://[::]:12345' -l 'udp://[::]:12345'
```

## 指定公网 IP 和端口

某些情况下，节点拥有公网的 IP 和 端口，但 EasyTier 无法正确识别 (比如 NAT 主机)，可以使用 `--mapped-listeners` 配置公网 IP 和端口。 例如：

```sh
easytier-core --mapped-listeners tcp://8.8.8.8:12345 -l tcp://0.0.0.0:11010
```

该 EasyTier 实例监听本地的 11010 TCP 端口，且该端口被映射到公网的 12345 端口。其他节点会尝试连接到公网的 12345 端口。

## 关闭上网辅助工具

一些上网辅助工具会影响 STUN 测试的结果，导致 EasyTier 无法识别 NAT 类型，或者识别到错误的公网 IP 和端口。可以尝试关闭这些工具。
