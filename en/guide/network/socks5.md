# SOCKS5

EasyTier supports the creation of a SOCKS5 server, allowing other programs on the node to access the virtual network and other proxy subnets within the virtual network by setting their proxy to the EasyTier SOCKS5 service.

The parameter to start the SOCKS5 service is `--socks5 12333`. By adding this parameter to the easytier-core startup command, the local port 12333 can serve SOCKS5 clients. Currently, the SOCKS5 server does not require username and password authentication and can be used directly.
