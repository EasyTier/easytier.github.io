# Magic DNS

EasyTier supports a Magic DNS feature similar to Tailscale, allowing users to access other nodes via domain names without remembering virtual IP addresses. Simply add the `--accept-dns` parameter during startup to enable the Magic DNS feature.

Magic DNS uses `100.100.100.101` as the default DNS server address. You can `ping` this address to test whether Magic DNS is successfully enabled.

If Magic DNS is successfully enabled, and the hostname of Node A is `node-a`, other nodes can access Node A via `node-a.et.net`.

```sh
ping node-a.et.net
```

Hostnames support Chinese characters.

::: tip Note
Currently, Magic DNS only supports automatic configuration of system DNS on Windows and macOS. On Linux, you need to manually configure the DNS server to `100.100.100.101` for normal use.
:::

## Specify the Top-Level DNS Zone

Use `--tld-dns-zone <zone name>` to specify the top-level DNS zone for Magic DNS. The default zone name is `et.net.`.
