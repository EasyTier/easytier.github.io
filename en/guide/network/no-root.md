# No TUN Mode (No Root Permission Required)

Since creating a TUN device requires ROOT permission, EasyTier also provides a method of use that does not depend on TUN for environments where ROOT permission cannot be obtained. Simply add the `--no-tun` parameter when starting EasyTier.

When networking in No TUN mode, nodes can be accessed via virtual IPs (supporting TCP, UDP, and ICMP), and can also act as subnet proxies (using the -n parameter). However, they cannot initiate visits to other nodes.

To actively access other nodes in No TUN mode, EasyTier supports the creation of a SOCKS5 server. Other programs on the node can access the virtual network and other proxy subnets within the virtual network by setting the proxy to EasyTier's SOCKS5 service.

The parameter for starting the SOCKS5 service is `--socks5 12333`. By adding this parameter to the easytier-core start command, the local port 12333 can serve SOCKS5 clients. Currently, the SOCKS5 server does not require username and password authentication and can be used directly.