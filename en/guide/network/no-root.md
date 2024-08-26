# No TUN Mode (No Root Permission Required)

Since creating a TUN device requires ROOT permission, EasyTier also provides a method of use that does not depend on TUN for environments where ROOT permission cannot be obtained. Simply add the `--no-tun` parameter when starting EasyTier.

When networking in No TUN mode, nodes can be accessed via virtual IPs (supporting TCP, UDP, and ICMP), and can also act as subnet proxies (using the -n parameter). However, they cannot initiate visits to other nodes.

To actively access other nodes in No TUN mode, you can use EasyTier's [SOCKS5 server functionality](/en/guide/network/socks5).
