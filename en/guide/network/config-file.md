# Configuration File

Supports specifying the configuration file path using the -c parameter.

Note: The configuration file has a higher priority. When a configuration file is specified at runtime, all command line parameters except for -c will be ignored and only the configuration file will take effect.

```sh
./easytier-core -c ./config.toml
```

You can run `./easytier-core` directly without using any parameters to obtain the minimal configuration file. By running the command with parameters, you can get a configuration file corresponding to those parameters. The configuration file will be printed on the command line, and you can manually copy the relevant configuration and save it as a TOML file.

Below is an example of a configuration file along with annotations for various configuration options.

```toml
# instance name to identify this node in same machine
instance_name = ""
# Hostname, used to identify the hostname of this device
hostname = ""
# Instance ID, usually a UUID, unique within the same network
instance_id = ""
# The IPv4 address of this node. If left empty, this node will only forward packets and will not create a TUN device
ipv4 = ""
# Automatically determined and assigned IP address by EasyTier, starting from 10.0.0.1 by default. Warning: When using DHCP, if an IP conflict occurs within the network, the IP address will be automatically changed.
dhcp = false

# List of listeners, used for accepting connections
listeners = [
  "tcp://0.0.0.0:11010",
  "udp://0.0.0.0:11010",
  "wg://0.0.0.0:11011",
  "ws://0.0.0.0:11011/",
  "wss://0.0.0.0:11012/",
]

# List of exit nodes
exit_nodes = []

# Rpc portal address to listen for management
rpc_portal = "127.0.0.1:15888"

[network_identity]
# network name to identify this virtual network
network_name = ""
# network secret to verify this node belongs to the virtual network
network_secret = ""

# This is the configuration for peer connection nodes, allowing multiple entries to support multiple peer connections
[[peer]]
uri = ""

[[peer]]
uri = ""

# This is the configuration for subnet proxy nodes, where multiple entries can be configured to support multiple subnets
[[proxy_network]]
cidr = "10.0.1.0/24"

[[proxy_network]]
cidr = "10.0.2.0/24"

# wg configuration information
[vpn_portal_config]
# The subnet where the wg client is located, as shown in the example below.
client_cidr = "10.14.14.0/24"
# The port that wg listens to (please do not conflict with the listeners' wg).
wireguard_listen = "0.0.0.0:11012"

[flags]
# default protocol to use when connecting to peers
default_protocol = "tcp"
# TUN device name. If left empty, the default name will be used
dev_name = ""
# enable encryption for peers communication
enable_encryption = true
# enable IPv6 support
enable_ipv6 = true
# mtu of the TUN device
mtu = 1380
# latency priority mode will attempt to forward traffic using the path with the lowest latency. By default, the shortest path is used
latency_first = false
# configure this node as an exit node
enable_exit_node = false
# disable TUN device
no_tun = false
# enable smoltcp stack for subnet proxy
use_smoltcp = false
# only forward traffic from the whitelist networks, supporting wildcard strings, multiple network names can be separated by spaces. if this parameter is empty, forwarding is disabled. by default, all networks are allowed. e.g.: '*' (all networks), 'def*' (networks with the prefix 'def'), 'net1 net2' (only allow net1 and net2)
foreign_network_whitelist = "*"
```
