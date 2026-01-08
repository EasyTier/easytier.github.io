# KCP Proxy

EasyTier typically uses the UDP protocol to transmit IP packets within the virtual network. However, some ISPs restrict UDP, which can lead to high packet loss and affect TCP performance within the virtual network.

To address this issue, EasyTier provides a KCP proxy feature that can proxy TCP connections in the virtual network and convert them to KCP for transmission. Thanks to KCP's more aggressive retransmission mechanism, it effectively reduces packet loss and improves TCP transmission speeds within the virtual network.

::: danger Warning
KCP proxy has a security vulnerability in versions **2.4.5 and earlier**. Please upgrade to **2.5.0 or later** to stay secure.

Fixed in [PR #1435](https://github.com/EasyTier/EasyTier/pull/1435).

If you cannot upgrade yet, disable KCP inbound traffic with `--disable-kcp-input` and turn off `--enable-kcp-proxy`.

_(QUIC proxy does not have this issue.)_
:::

## Network Topology

Assume the network topology is as follows:

```mermaid
graph LR
    A[Application Client] -->|TCP| B(EasyTier<br/>Node A)
    B -->|KCP over UDP| C(EasyTier<br/>Node B)
    C -->|TCP| D[Application Server]

    classDef endpoint fill:#1e90ff,stroke:#ffffff,color:#ffffff
    classDef easy fill:#4682b4,stroke:#ffffff,color:#ffffff
    classDef transport stroke:#ffa500,stroke-width:2px

    class A,D endpoint
    class B,C easy
    linkStyle 1 stroke:#ffa500,stroke-width:2px,stroke-dasharray:5 5

    style B stroke-width:2px
    style C stroke-width:2px
```

## Using KCP Proxy

### Enable KCP Proxy

To proxy TCP traffic on Node A to the KCP protocol, simply start EasyTier on Node A with the `--enable-kcp-proxy` parameter.

```sh
sudo easytier-core --enable-kcp-proxy
```

- `--enable-kcp-proxy` enables the KCP proxy feature.

The KCP proxy ensures version compatibility by automatically reverting to the TCP protocol if it detects that the counterpart node does not support the KCP proxy.

### Switch to User-Space Network Stack

By default, the KCP proxy uses the kernel's network stack, which may not work correctly due to system firewall settings. You can try using the `--use-smoltcp` parameter to switch to the user-space network stack.

```sh
sudo easytier-core --enable-kcp-proxy --use-smoltcp
```

- `--use-smoltcp` switches to the user-space network stack.

### Disable KCP Input

If you do not want traffic destined for a specific node to use the KCP protocol, start EasyTier on the target node with the `--disable-kcp-input` parameter.

For example, if you do not want Node B to receive KCP traffic, start EasyTier on Node B with the following command:

```sh
sudo easytier-core --disable-kcp-input
```

- `--disable-kcp-input` disables KCP inbound traffic.

In this case, even if Node A has enabled the KCP proxy, the traffic from Node A to Node B will continue to use the TCP protocol.

## Subnet-to-Subnet KCP Support

If Node A is a router, and the subnet under A needs to access other EasyTier nodes or other proxied subnets, it can also use the KCP proxy. However, Node A must use the user-space network stack by specifying the `--use-smoltcp` parameter.

```sh
sudo easytier-core --enable-kcp-proxy --use-smoltcp
```

Otherwise, the TCP protocol will still be used.

## Checking KCP Proxy Status

You can check the status of KCP proxy connections using the EasyTier CLI tool.

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

## QUIC Proxy

EasyTier v2.3.2 introduced support for QUIC proxy, which works similarly to KCP proxy, but QUIC's BBR algorithm can achieve higher bandwidth in high packet loss environments (while KCP proxy can significantly reduce latency, but has a lower bandwidth ceiling).

QUIC proxy can be enabled on the connection initiator side using the `--enable-quic-proxy` parameter.

```sh
sudo easytier-core --enable-quic-proxy
```

QUIC proxy on the receiving end can be disabled using the `--disable-quic-input` parameter.

```sh
sudo easytier-core --disable-quic-input
```

Both the sender and receiver can check the QUIC proxy connection status using the `easytier-cli proxy` command.

```bash
$ easytier-cli proxy
┌────────────────────┬───────────────────┬─────────────────────────┬───────────┬────────────────┐
│ src                │ dst               │ start_time              │ state     │ transport_type │
├────────────────────┼───────────────────┼─────────────────────────┼───────────┼────────────────┤
│ 10.126.126.7:51838 │ 10.147.223.128:22 │ 2025-02-07 10:39:08 UTC │ Connected │ Quic           │
└────────────────────┴───────────────────┴─────────────────────────┴───────────┴────────────────┘
```

::: tip Note
QUIC and KCP proxies can be enabled simultaneously, but KCP proxy takes precedence over QUIC proxy.

When both are enabled, QUIC proxy will only take effect after the destination end closes KCP input.
:::
