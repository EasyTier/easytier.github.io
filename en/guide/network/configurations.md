# Complete Configuration Options

You can use `easytier-core --help` to view all configuration options.

## Basic Settings

- **Startup and Version**

  - `-h, --help`: Print help information.
  - `-V, --version`: Print version information.

- **Configuration File**

  - `-c, --config-file <CONFIG_FILE>`: Path to the configuration file. If this option is set, all other options will be ignored.

- **Instance Identification**
  - `--hostname <HOSTNAME>`: Hostname to identify this device.
  - `-m, --instance-name <INSTANCE_NAME>`: Instance name, default is `default`.

## Network Configuration

- **Server and Network**

  - `-w, --config-server <CONFIG_SERVER>`: Configuration server address.
  - `--network-name <NETWORK_NAME>`: Network name, default is `default`.
  - `--network-secret <NETWORK_SECRET>`: Network secret, default is empty.

- **IP Configuration**
  - `-i, --ipv4 <IPV4>`: IPv4 address of this node, empty means only forwarding packets.
  - `-d, --dhcp`: Automatically set IP address, default starts from 10.0.0.1.
  - `--dev-name <DEV_NAME>`: Optional TUN interface name.
  - `--mtu <MTU>`: MTU of the TUN device, default is 1380 for non-encrypted, 1360 for encrypted.

## Connection Management

- **Listeners and Portals**

  - `-l, --listeners [<LISTENERS>...]`: Listeners to accept connections.
  - `--mapped-listeners [<MAPPED_LISTENERS>...]`: Specify public addresses for listeners.
  - `--no-listener`: Do not listen on any port.
  - `--vpn-portal <VPN_PORTAL>`: Define the URL of the VPN portal.
  - `--rpc-portal <RPC_PORTAL>`: Management RPC portal address, default is 15888.

- **Nodes and Routing**
  - `-p, --peers [<PEERS>...]`: Initial peers to connect to.
  - `-e, --external-node <EXTERNAL_NODE>`: Use public shared nodes to discover peers.
  - `--exit-nodes [<EXIT_NODES>...]`: Exit nodes to forward all traffic.
  - `--enable-exit-node`: Allow this node to become an exit node.
  - `--manual-routes [<MANUAL_ROUTES>...]`: Manually assign route CIDR.
  - `--relay-network-whitelist [<RELAY_NETWORK_WHITELIST>...]`: Only forward traffic for whitelisted networks.

## Logging and Debugging

- **Log Level**

  - `--console-log-level <CONSOLE_LOG_LEVEL>`: Console log level.
  - `--file-log-level <FILE_LOG_LEVEL>`: File log level.

- **Log Storage**
  - `--file-log-dir <FILE_LOG_DIR>`: Directory to store log files.

## Advanced Features

- **Performance Optimization**

  - `--latency-first`: Latency first mode.
  - `--multi-thread`: Run with multi-threading.
  - `--disable-udp-hole-punching`: Disable UDP hole punching.

- **Security and Privacy**

  - `-u, --disable-encryption`: Disable encryption, default is false.
  - `--disable-ipv6`: Do not use IPv6.
  - `--compression <COMPRESSION>`: Compression algorithm to use, default is `none`.

- **Proxy and Forwarding**

  - `--proxy-networks <PROXY_NETWORKS>`: Export local networks to other peers.
  - `--socks5 <SOCKS5>`: Enable socks5 server.
  - `--ipv6-listener <IPV6_LISTENER>`: IPv6 listener URL.
  - `--no-tun`: Do not create TUN device.
  - `--use-smoltcp`: Enable smoltcp stack.
  - `--bind-device <BIND_DEVICE>`: Bind socket to physical device.
  - `--relay-all-peer-rpc`: Forward all peer RPC packets.

- **Communication Restrictions**
  - `--disable-p2p`: Disable P2P communication.
  - `--no-tun`: Do not create TUN device to use subnet proxy to access nodes.
