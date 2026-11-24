# Configuration File

Supports using the -c parameter to specify the configuration file path.

```sh
easytier-core -c ./config.yaml
```

::: warning Note
Note: Parameters in the configuration file can be overridden by command line parameters. For example, if `--hostname abc` is specified in the configuration file, but `--hostname xyz` is used in the command line, then the hostname parameter `xyz` from the command line will be used.
:::

Running with parameters can generate a configuration file with the corresponding parameters. The configuration file will be printed in the command line, and you can manually copy and save it as a toml file.

Running `easytier-core` directly without parameters will generate the minimal configuration file.

## EasyTier Assistant

If you do not want to write the configuration file manually, you can use [EasyTier Assistant](https://easytier.cn/assistant/) to generate one, then load it with the `-c` parameter:

```sh
easytier-core -c ./config.toml
```

## Assign public IPv6 addresses to peers

If your ISP delegates a public IPv6 prefix to your OpenWrt router, the router can share addresses from that prefix with peers on the same EasyTier network. Add the settings below to each node's existing TOML file, before any table header such as `[network_identity]` or `[flags]`.

**On the router** (the provider must run Linux), enable the TOML equivalent of `--ipv6-public-addr-provider`:

```toml
ipv6_public_addr_provider = true
```

EasyTier detects the prefix from system routes by default. If detection fails, add `ipv6_public_addr_prefix = "2001:db8:1234::/64"` in the same place. Replace the example with a prefix your ISP routes to the router and that is available for allocation.

**On each peer that needs a public IPv6 address**, enable the TOML equivalent of `--ipv6-public-addr-auto`:

```toml
ipv6_public_addr_auto = true
```

Restart the EasyTier service on each node, or run `easytier-core -c ./config.toml` on each node with its own configuration file.

## Multiple Configuration Files Startup

You can specify multiple configuration files through the `-c` parameter. EasyTier will load multiple configuration files in one process and start multiple virtual networks.

```sh
easytier-core -c ./config1.yaml -c ./config2.yaml
```
