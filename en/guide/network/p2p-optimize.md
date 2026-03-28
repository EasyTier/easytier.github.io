# P2P Optimization

If you want EasyTier to establish P2P connections with other nodes more easily, you can optimize it in the following ways.

## IPv6

EasyTier supports P2P communication between nodes via IPv6. By default, EasyTier will randomly listen on an IPv6 UDP port.

In some cases, specifying the listening IPv6 address and port may be more beneficial for P2P communication between nodes.
You can use the `-l` option to configure the IPv6 listener. For example:

::: code-group

```sh [CLI Flags]
easytier-core -l 'tcp://[::]:12345' -l 'udp://[::]:12345'
```

```toml [Config File]
listeners = [
  "tcp://[::]:12345",
  "udp://[::]:12345",
]
```

:::

Save the configuration above as `config.toml`, then start it with `easytier-core -c ./config.toml`.

## Specify Public IP and Port

In some cases, the node has a public IP and port, but EasyTier cannot correctly identify them (e.g., NAT host). You can use the `--mapped-listeners` option to configure the public IP and port. For example:

::: code-group

```sh [CLI Flags]
easytier-core --mapped-listeners tcp://8.8.8.8:12345 -l tcp://0.0.0.0:11010
```

```toml [Config File]
listeners = ["tcp://0.0.0.0:11010"]
mapped_listeners = ["tcp://8.8.8.8:12345"]
```

:::

Save the configuration above as `config.toml`, then start it with `easytier-core -c ./config.toml`.

This EasyTier instance listens on the local 11010 TCP port, and this port is mapped to the public 12345 port. Other nodes will try to connect to the public 12345 port.

## Disable Internet Assistance Tools

Some internet assistance tools may affect the results of STUN tests, causing EasyTier to fail to identify the NAT type or to identify the wrong public IP and port. You can try disabling these tools.
