# KCP 代理

EasyTier 是一个异地组网软件，基于 TUN 设备实现虚拟网，并使用 UDP 协议进行节点间的数据传输。

EasyTier 一般使用 UDP 协议进行数据传输虚拟网的 IP 数据包。但是某些运营商会对 UDP 协议进行限制，导致 UDP 有较高的丢包率，影响虚拟网内 TCP 协议的传输速度。

为了解决此问题，EasyTier 提供 KCP 代理功能，可以代理虚拟网内的 TCP 链接，并转换为 KCP 协议进行传输。
由于 KCP 有更激进的重传机制，可以有效降低丢包率，提高虚拟网内的 TCP 传输速度。

```mermaid

graph LR
    A[应用客户端] -->|TCP| B(EasyTier</br>A 节点)
    B -->|KCP over UDP| C(EasyTier</br>B 节点)
    C -->|TCP| D[应用服务端]

    classDef endpoint fill:#c1f0c1,stroke:#2d882d
    classDef easy fill:#b3d9ff,stroke:#0066cc
    classDef transport stroke:#ff6666,stroke-width:2px

    class A,D endpoint
    class B,C easy
    linkStyle 1 stroke:#ff6666,stroke-width:2px,stroke-dasharray:5 5

    style B stroke-width:2px
    style C stroke-width:2px

```

## 使用 KCP 代理

KCP 代理功能需要虚拟网内 **所有节点** 的 EasyTier 版本在 v2.2.0 以上。

假设想将 A 节点上的 TCP 流量代理为 KCP 协议，只需要在 A 节点上启动 EasyTier 时指定 `--enable-kcp-proxy` 参数即可。

KCP 代理会保证版本兼容性，如果发现对端节点不支持 KCP 代理，会自动切换回 TCP 协议。

KCP 代理默认使用内核的网络栈，可能由于系统防火墙设置导致无法正常工作。可以尝试结合 `--use-smoltcp` 参数，切换到用户态网络栈。

## 禁用 KCP 入站

如果不希望发往某个节点的流量使用 KCP 协议，可以在对端节点上启动 EasyTier 时指定 `--disable-kcp-input` 参数。

以简介中的例子为例，如果不希望 B 节点接收 KCP 流量，可以在 B 节点上启动 EasyTier 时指定 `--disable-kcp-input` 参数。这样即使 A 节点启用了 KCP 代理，A 节点发往 B 节点的流量依然使用 TCP 协议。
