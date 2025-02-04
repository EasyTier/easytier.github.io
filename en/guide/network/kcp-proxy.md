# KCP Proxy

EasyTier is a remote networking software that uses a TUN device to create a virtual network and transmits data between nodes via the UDP protocol.

EasyTier typically uses the UDP protocol to transmit IP packets within the virtual network. However, some ISPs restrict UDP, which can lead to high packet loss and affect TCP performance within the virtual network.

To address this issue, EasyTier provides a KCP proxy feature that can proxy TCP connections in the virtual network and convert them to KCP for transmission. Thanks to KCP's more aggressive retransmission mechanism, it effectively reduces packet loss and improves TCP transmission speeds within the virtual network.

```mermaid
graph LR
    A[Application Client] -->|TCP| B(EasyTier</br>Node A)
    B -->|KCP over UDP| C(EasyTier</br>Node B)
    C -->|TCP| D[Application Server]

    classDef endpoint fill:#c1f0c1,stroke:#2d882d
    classDef easy fill:#b3d9ff,stroke:#0066cc
    classDef transport stroke:#ff6666,stroke-width:2px

    class A,D endpoint
    class B,C easy
    linkStyle 1 stroke:#ff6666,stroke-width:2px,stroke-dasharray:5 5

    style B stroke-width:2px
    style C stroke-width:2px
```

## Using the KCP Proxy

The KCP proxy feature requires that all EasyTier nodes in the virtual network be running version v2.2.0 or later.

To proxy TCP traffic on Node A to the KCP protocol, simply start EasyTier on Node A with the `--enable-kcp-proxy` parameter.

The KCP proxy ensures version compatibility by automatically reverting to the TCP protocol if it detects that the counterpart node does not support the KCP proxy.

## Disabling KCP Input

If you do not want traffic destined for a specific node to use the KCP protocol, start EasyTier on the target node with the `--disable-kcp-input` parameter.

For example, if you do not want Node B to receive KCP traffic, start EasyTier on Node B with the `--disable-kcp-input` parameter. In this case, even if Node A has enabled the KCP proxy, the traffic from Node A to Node B will continue to use the TCP protocol.
