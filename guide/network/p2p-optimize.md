# P2P 优化

如果您希望 EasyTier 更容易地与其他 EasyTier 节点建立 P2P 连接，可以通过以下方式进行优化。

## IPv6

EasyTier 支持节点间通过 IPv6 进行 P2P 通信，默认 EasyTier 会监听一个 Ipv6 的 TCP 和 UDP 的 11010 端口。

如果您的节点都拥有公网 IPv6 地址，并且可以入站（即被外网访问），就可以非常容易建立 P2P 连接。

如果您的节点都拥有公网 IPv6 地址，但不可入站（即不能被外网访问），可以利用 Easytier（版本2.3.0以上） 的 IPv6 打洞功能进行 P2P 连接，默认情况下开启此功能。

当然如果您能够修改公网 IPv6 的防火墙使其可以入站，也可以大幅度提高 p2p 的成功几率。

如果您的 IPv6 使用了 NAT66 技术，即网络地址转换技术，可以参考 IPv4 部分，如果可以的话建议关闭 NAT66 技术。

## IPv4

EasyTier 支持节点间通过 IPv4 进行 P2P 通信，默认 EasyTier 会监听一个 Ipv4 的 TCP 和 UDP 的 11010 端口。

如果您的节点拥有公网 IPv4 地址，并且可以入站（即被外网访问），就可以非常容易建立 P2P 连接。

如果您的节点都公网 IPv4 地址，但不可入站（即不能被外网访问），可以利用 Easytier的 IPv4 打洞功能进行 P2P 连接，默认情况下开启此功能。

如果您的节点是普通家庭宽带，无公网 IPv4 ，需要修改 NAT 类型来提高 P2P 的成功几率，分为以下几种情况：（如何修改 NAT 类型可自行百度搜索方法）

有关 NAT 类型的知识可参考这篇文章：[各种 NAT 类型的解释](https://nacldragon.top/2023/NAT-Type/)

**NAT1（在 RFC3489 中为：Full Cone NAT / 完全锥型 NAT ；在 RFC5780 中为：端点无关映射+端点无关过滤 ）**

对于 Easytier 来说如果您的设备是 NAT1 类型，建立 P2P 连接时对方 NAT 类型可以是 NAT1、NAT2、NAT3、NAT4。

**NAT2（在 RFC3489 中为：Restricted Cone NAT / 限制锥型 NAT ；在 RFC5780 中为：端点无关映射+地址相关过滤 ）**

对于 Easytier 来说如果您的设备是 NAT2 类型，建立 P2P 连接时对方 NAT 类型可以是 NAT1、NAT2、NAT3、NAT4。

**NAT3（在 RFC3489 中为：Port Restricted Cone NAT / 端口限制锥型 NAT ；在 RFC5780 中为：端点无关映射+地址和端口相关过滤 ）**

对于 Easytier 来说如果您的设备是 NAT3 类型，建立 P2P 连接时对方 NAT 类型可以是 NAT1、NAT2、NAT3、NAT4。

**NAT4（在 RFC3489 中为：Symmetric NAT / 对称型 NAT ；在 RFC5780 中为：地址和端口相关映射+地址和端口相关过滤 ）**

对于 Easytier 来说如果您的设备是 NAT4 类型，建立 P2P 连接时对方 NAT 类型可以是 NAT1、NAT2、NAT3、NAT4（部分）。

注：对于 NAT4 类型来说，由于某些原因部分 NAT4 每次建立的端口是递增或递减的，可以通过端口预测技术来实现 P2P，这种 NAT4 可以简称为 NAT4E / 对称型递增。

::: warning 注意
由于某些防火墙的策略，常见于学校、公司等，即使 NAT 类型为 1 2 3 ，也能会无法建立 P2P 连接。
IPv6 在开启 NAT66 后和 IPv4 NAT44 一样，也分为以上类型。
:::

## 指定公网 IP 和端口

某些情况下，节点拥有公网的 IP 和 端口，但 EasyTier 无法正确识别 (比如 NAT 主机)，可以使用 `--mapped-listeners` 配置公网 IP 和端口。 例如：

```sh
easytier-core --mapped-listeners tcp://8.8.8.8:12345 -l tcp://0.0.0.0:11010
```

该 EasyTier 实例监听本地的 11010 TCP 端口，且该端口被映射到公网的 12345 端口。其他节点会尝试连接到公网的 12345 端口。

## 关闭上网辅助工具

一些上网辅助工具会影响 STUN 测试的结果，导致 EasyTier 无法识别 NAT 类型，或者识别到错误的公网 IP 和端口。可以尝试关闭这些工具。
