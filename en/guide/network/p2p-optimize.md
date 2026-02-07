# P2P Optimization

If you want EasyTier to establish P2P connections with other nodes more easily, you can optimize it in the following ways.

## IPv6

EasyTier supports P2P communication between nodes via IPv6. By default, EasyTier will randomly listen on an IPv6 UDP port.

In some cases, specifying the listening IPv6 address and port may be more beneficial for P2P communication between nodes.
You can use the `-l` option to configure the IPv6 listener. For example:

```sh
easytier-core -l 'tcp://[::]:12345' -l 'udp://[::]:12345'
```

## TCP Hole Punching

EasyTier has introduced support for TCP hole punching. Previously, P2P connections relied primarily on UDP hole punching. However, in some network environments (such as where firewalls are strict with UDP or ISP policies cause severe UDP packet loss), TCP hole punching can serve as an effective supplement to further improve P2P success rates.

TCP hole punching is automatically attempted between nodes without additional configuration. If your network environment strictly prohibits behaviors related to TCP hole punching, you can use the `--disable-tcp-hole-punching` parameter to disable it.

## Specify Public IP and Port

In some cases, the node has a public IP and port, but EasyTier cannot correctly identify them (e.g., NAT host). You can use the `--mapped-listeners` option to configure the public IP and port. For example:

```sh
easytier-core --mapped-listeners tcp://8.8.8.8:12345 -l tcp://0.0.0.0:11010
```

This EasyTier instance listens on the local 11010 TCP port, and this port is mapped to the public 12345 port. Other nodes will try to connect to the public 12345 port.

## P2P-Only Mode

In scenarios where security or latency requirements are extremely high, you may want nodes to communicate only when a P2P connection can be established, without forwarding traffic through relay nodes. You can use the `--p2p-only` parameter to enable this mode.

```sh
easytier-core --p2p-only ...
```

Once enabled, if a P2P connection cannot be established between two nodes, they will not be able to communicate with each other.

## Disable Internet Assistance Tools

Some internet assistance tools may affect the results of STUN tests, causing EasyTier to fail to identify the NAT type or to identify the wrong public IP and port. You can try disabling these tools.
