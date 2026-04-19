# P2P Optimization

This document covers two ways to optimize the P2P experience in EasyTier:

1. **Control P2P connection behavior**: Adjust whether nodes proactively build direct links, use on-demand hole punching, or stay quiet.
2. **Improve P2P success rate**: Configure the network environment (IPv6, NAT optimization, public port mapping, etc.) to help nodes establish direct connections more easily.

## Control P2P Connection Behavior

By default, EasyTier actively attempts to establish P2P direct connections with all ordinary nodes in the background. If you want to change this behavior, you can adjust it on demand with the following three parameters.

### On-demand hole punching: `--lazy-p2p`

By default, EasyTier actively tries to punch holes to all nodes. After enabling `--lazy-p2p`, the node no longer actively punches holes in the background. **P2P is only triggered when there is real traffic destined for the peer**.

Actual effect:

- In the initial stage, communication goes through relay first, and the route cost may be `2`.
- After real traffic appears, a direct connection is gradually established, and the route cost becomes `1`.

Suitable for:

- Networks with many nodes where not all nodes need frequent direct connections with each other.
- Reducing background hole-punching attempts and idle resource consumption.

### Prioritize being directly connected: `--need-p2p`

`--need-p2p` signals to other nodes "please prioritize establishing P2P with me". Even if the other side has `--lazy-p2p` enabled, it will still actively connect to this node.

Suitable for:

- Game servers/hosts, fixed entry nodes, or latency-sensitive endpoints.
- Scenarios where you want a direct link formed quickly instead of waiting for relay "warm-up".

### Reduce automatic hole punching: `--disable-p2p`

`--disable-p2p` causes this node to **opt out of ordinary automatic hole punching**:

- No longer proactively initiates P2P attempts to ordinary nodes.
- Ordinary nodes will not proactively connect to this node either.
- However, it will still establish P2P with nodes that have `--need-p2p` enabled.
- Traffic can still continue to be forwarded via relay without impact.

Suitable for:

- Only wanting direct links with a few key nodes, not automatically connecting with all nodes.
- Turning P2P into an "on-demand whitelist" mode.

### Combined usage recommendations

| Your need | Recommended parameters |
|-----------|------------------------|
| Many nodes, want to save resources, don't mind first packet going through relay | `--lazy-p2p` |
| I am a server/host and want others to directly connect to me quickly | `--need-p2p` |
| Only want P2P with specific nodes, don't want to be bothered by ordinary nodes | `--disable-p2p` + `--need-p2p` |
| Completely quiet, only use relay, don't build any P2P | `--disable-p2p` (without `--need-p2p`) |

### P2P direct only: `--p2p-only`

`--p2p-only` requires all traffic to use only established P2P direct connections. If there is no P2P direct link with a node yet, traffic destined for it will be dropped directly and will not be relayed.

Suitable for: Security-sensitive environments where all traffic must be end-to-end direct and cannot be forwarded through third-party relay nodes.

::: warning Note
If you enable both `--lazy-p2p` and `--p2p-only`, the first attempt to reach a node without an established direct connection may fail (because `p2p-only` does not allow relay). The failure itself triggers on-demand hole punching; subsequent communication resumes after the direct link is built. Therefore, do not use this combination for highly real-time traffic. If low latency is required, enable `--need-p2p` on the destination node to establish the direct link in advance.
:::

### Disable specific hole-punching methods

If you find that a particular hole-punching method frequently fails or is unstable in your current network environment, you can disable it individually to avoid wasting resources on ineffective attempts.

| Parameter | Effect | Suitable for |
|-----------|--------|--------------|
| `--disable-udp-hole-punching` | Completely disable UDP hole punching | Networks that completely block UDP (e.g., some corporate firewalls), or where UDP hole punching frequently fails |
| `--disable-tcp-hole-punching` | Completely disable TCP hole punching | Networks where TCP hole punching is unstable |
| `--disable-sym-hole-punching` | Disable UDP hole punching for symmetric NAT (NAT4) | Symmetric NAT hole punching is based on port prediction (birthday attack principle) and may be identified and blocked by ISPs in some networks. After enabling, symmetric NAT nodes will no longer attempt UDP hole punching with each other (traffic will go through relay), but symmetric NAT nodes can still punch holes with cone NAT nodes using normal logic |

## IPv6

EasyTier supports P2P communication between nodes via both IPv4 and IPv6. By default, EasyTier listens on both IPv4 and IPv6 addresses on each listener.

As long as the listener address is `0.0.0.0`, EasyTier will automatically listen on the IPv6 address as well. This behavior can be disabled with the `--disable-ipv6` parameter.

You can also manually configure listening on IPv6 addresses only. For example:

```sh
easytier-core -l 'tcp://[::]:12345' -l 'udp://[::]:12345'
```

If your nodes all have public IPv6 addresses and can accept inbound connections (i.e., accessible from the external network), you can establish P2P connections through the listener address plus the default listening port (11010).

If your nodes all have public IPv6 addresses but cannot accept inbound connections (i.e., not accessible from the external network), you can use EasyTier's IPv6 hole-punching feature (version 2.3.0 and above) for P2P connections. This feature is enabled by default.

Of course, if you can modify the public IPv6 firewall to allow inbound connections, the P2P success rate can also be greatly improved.

If your IPv6 uses NAT66 (network address translation), you can refer to the IPv4 section. If possible, it is recommended to disable NAT66.

## IPv4

If your nodes have public IPv4 addresses and can accept inbound connections (i.e., accessible from the external network), you can establish P2P connections through the listener address plus the default listening port (11010).

If your nodes have public IPv4 addresses but cannot accept inbound connections (i.e., not accessible from the external network), you can use EasyTier's IPv4 hole-punching feature for P2P connections. This feature is enabled by default.

If your nodes are on ordinary home broadband without a public IPv4 address, you need to modify the NAT type to improve the P2P success rate. The following situations apply (you can search online for how to modify NAT types):

For NAT type knowledge, please refer to this article: [Explanation of Various NAT Types](https://nacldragon.top/2023/NAT-Type/)

**NAT1 (In RFC3489: Full Cone NAT; In RFC5780: Endpoint-Independent Mapping + Endpoint-Independent Filtering)**

For EasyTier, if your device is NAT1 type, the peer's NAT type can be NAT1, NAT2, NAT3, or NAT4 when establishing a P2P connection.

**NAT2 (In RFC3489: Restricted Cone NAT; In RFC5780: Endpoint-Independent Mapping + Address-Dependent Filtering)**

For EasyTier, if your device is NAT2 type, the peer's NAT type can be NAT1, NAT2, NAT3, or NAT4 when establishing a P2P connection.

**NAT3 (In RFC3489: Port Restricted Cone NAT; In RFC5780: Endpoint-Independent Mapping + Address and Port-Dependent Filtering)**

For EasyTier, if your device is NAT3 type, the peer's NAT type can be NAT1, NAT2, NAT3, or NAT4 when establishing a P2P connection.

**NAT4 (In RFC3489: Symmetric NAT; In RFC5780: Address and Port-Dependent Mapping + Address and Port-Dependent Filtering)**

For EasyTier, if your device is NAT4 type, the peer's NAT type can be NAT1, NAT2, NAT3, or NAT4 (partially).

Note: For NAT4 type, due to certain reasons, some NAT4 devices use incrementally or decrementally allocated ports for each connection. P2P can be achieved through port prediction technology. This type of NAT4 can be referred to as NAT4E / Symmetric Incremental.

::: warning Note
Due to certain firewall policies, commonly found in schools and companies, even if the NAT type is 1, 2, or 3, P2P connections may not be established.
Some regional ISPs may adopt policies to block P2P connections, even if the NAT type is 1, P2P connections may not be possible!
IPv6 with NAT66 enabled behaves the same as IPv4 NAT44 and also falls into the above types.
:::

## Specify Public IP and Port

In some cases, a node has a public IP and port, but EasyTier cannot correctly identify them (e.g., NAT host). You can use the `--mapped-listeners` option to configure the public IP and port. For example:

```sh
easytier-core --mapped-listeners tcp://8.8.8.8:12345 -l tcp://0.0.0.0:11010
```

This EasyTier instance listens on the local 11010 TCP port, and this port is mapped to the public 12345 port. Other nodes will try to connect to the public 12345 port.

## Disable Internet Assistance Tools

Some internet assistance tools may affect the results of STUN tests, causing EasyTier to fail to identify the NAT type or to identify the wrong public IP and port. You can try disabling these tools.
