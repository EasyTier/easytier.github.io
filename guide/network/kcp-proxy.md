# KCP 代理

EasyTier 一般使用 UDP 协议进行数据传输虚拟网的 IP 数据包。但是某些运营商会对 UDP 协议进行限制，导致 UDP 有较高的丢包率，影响虚拟网内 TCP 协议的传输速度。

为了解决此问题，EasyTier 提供 KCP 代理功能，可以代理虚拟网内的 TCP 链接，并转换为 KCP 协议进行传输。由于 KCP 有更激进的重传机制，可以有效降低丢包率，提高虚拟网内的 TCP 传输速度。

## 网络拓扑

假设网络拓扑如下：

```mermaid
graph LR
    A[应用客户端] -->|TCP| B(EasyTier<br/>A 节点)
    B -->|KCP over UDP| C(EasyTier<br/>B 节点)
    C -->|TCP| D[应用服务端]

    classDef endpoint fill:#1e90ff,stroke:#ffffff,color:#ffffff
    classDef easy fill:#4682b4,stroke:#ffffff,color:#ffffff
    classDef transport stroke:#ffa500,stroke-width:2px

    class A,D endpoint
    class B,C easy
    linkStyle 1 stroke:#ffa500,stroke-width:2px,stroke-dasharray:5 5

    style B stroke-width:2px
    style C stroke-width:2px
```

## 使用 KCP 代理

### 启用 KCP 代理

假设想将 A 节点上的 TCP 流量代理为 KCP 协议，只需要在 A 节点上启动 EasyTier 时指定 `--enable-kcp-proxy` 参数即可。

```sh
sudo easytier-core --enable-kcp-proxy
```

- `--enable-kcp-proxy` 启用 KCP 代理功能。

KCP 代理会保证版本兼容性，如果发现对端节点不支持 KCP 代理，会自动切换回 TCP 协议。


### 切换到用户态网络栈

KCP 代理默认使用内核的网络栈，可能由于系统防火墙设置导致无法正常工作。可以尝试结合 `--use-smoltcp` 参数，切换到用户态网络栈。

```sh
sudo easytier-core --enable-kcp-proxy --use-smoltcp
```

- `--use-smoltcp` 切换到用户态网络栈。


### 禁用 KCP 入站

如果不希望发往某个节点的流量使用 KCP 协议，可以在对端节点上启动 EasyTier 时指定 `--disable-kcp-input` 参数。

以简介中的例子为例，如果不希望 B 节点接收 KCP 流量，可以在 B 节点上启动 EasyTier 时指定以下命令：

```sh
sudo easytier-core --disable-kcp-input
```

- `--disable-kcp-input` 禁用 KCP 入站流量。

这样即使 A 节点启用了 KCP 代理，A 节点发往 B 节点的流量依然使用 TCP 协议。


## 网对网 KCP 支持

假设节点 A 是路由器，A 下的子网访问 EasyTier 其他节点本身或者其他代理子网时，也可以使用 KCP 代理，但是需要 A 节点使用用户态网络栈即 `--use-smoltcp` 参数。

```sh
sudo easytier-core --enable-kcp-proxy --use-smoltcp
```

否则仍会使用 TCP 协议。


## 查看 KCP 代理状态

可以通过 EasyTier CLI 工具查看 KCP 代理的链接状态。

```bash
$ easytier-cli proxy

┌────────────────────┬───────────────────┬─────────────────────────┬───────────┬────────────────┐
│ src                │ dst               │ start_time              │ state     │ transport_type │
├────────────────────┼───────────────────┼─────────────────────────┼───────────┼────────────────┤
│ 10.126.126.7:51838 │ 10.147.223.128:22 │ 2025-02-07 10:39:08 UTC │ Connected │ Tcp            │
├────────────────────┼───────────────────┼─────────────────────────┼───────────┼────────────────┤
│ 0.0.0.0:0          │ 10.147.223.1:80   │ 2025-02-07 10:41:28 UTC │ Connected │ Kcp            │
├────────────────────┼───────────────────┼─────────────────────────┼───────────┼────────────────┤
│ 0.0.0.0:0          │ 10.147.223.1:80   │ 2025-02-07 10:41:18 UTC │ Connected │ Kcp            │
└────────────────────┴───────────────────┴─────────────────────────┴───────────┴────────────────┘
```

## QUIC 代理

EasyTier v2.3.2 版本引入了 QUIC 代理的支持，原理与 KCP 代理类似，但 QUIC 的 BBR 算法可以在高丢包环境下达到更高的带宽（KCP 代理则可显著降低延迟，但可以达到的带宽上限较低）。

QUIC 代理可以通过在链接发起端通过 `--enable-quic-proxy` 参数启用。

```sh
sudo easytier-core --enable-quic-proxy
```

接收端的 QUIC 代理可以通过 `--disable-quic-input` 参数禁用。

```sh
sudo easytier-core --disable-quic-input
```

发送端和接收端可以通过 `easytier-cli proxy` 命令查看 QUIC 代理的链接状态。

```bash
$ easytier-cli proxy
┌────────────────────┬───────────────────┬─────────────────────────┬───────────┬────────────────┐
│ src                │ dst               │ start_time              │ state     │ transport_type │
├────────────────────┼───────────────────┼─────────────────────────┼───────────┼────────────────┤
│ 10.126.126.7:51838 │ 10.147.223.128:22 │ 2025-02-07 10:39:08 UTC │ Connected │ Quic           │
└────────────────────┴───────────────────┴─────────────────────────┴───────────┴────────────────┘
```

::: tip 提示
QUIC 和 KCP 代理可以同时启用，但是 KCP 代理会优先于 QUIC 代理生效。

在同时启用后，仅在目的端关闭 KCP 输入后，QUIC 代理才会生效。
:::
