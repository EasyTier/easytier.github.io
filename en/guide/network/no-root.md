# No TUN Mode (No Root Permission Required)

::: danger Warning
`no_tun` mode has a security vulnerability in versions **2.4.5 and earlier**. Please upgrade to **2.5.0 or later** to stay secure.

Fixed in [PR #1435](https://github.com/EasyTier/EasyTier/pull/1435).
:::

Since creating a TUN device requires ROOT permissions, EasyTier provides a method that does not rely on TUN for environments where Root permissions cannot be obtained. Simply add the `--no-tun` parameter when starting EasyTier.

When using the no TUN mode for networking, nodes can be accessed via virtual IP (TCP, UDP, and ICMP are all supported), and can also act as subnet proxies (using the -n parameter). However, they cannot actively initiate access to other nodes.

To actively access other nodes in no TUN mode, you can use EasyTier's [SOCKS5 server feature](/guide/network/socks5).
