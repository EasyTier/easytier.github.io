# SOCKS5

EasyTier supports creating SOCKS5 servers. Other programs on the node can access the virtual network and other proxy subnets within the virtual network by setting the proxy to EasyTier's SOCKS5 service.

The parameter to enable the SOCKS5 service is `--socks5 12333`. Adding this parameter to the easytier-core startup command will allow the local 12333 port to serve SOCKS5 clients. Currently, the SOCKS5 server does not require username and password authentication and can be used directly.
