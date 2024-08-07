# 其他

可使用 `easytier-core --help` 查看全部配置项

```sh
A full meshed p2p VPN, connecting all your devices in one network with one command.

Usage: easytier-core [OPTIONS]

Options:
  -c, --config-file <CONFIG_FILE>
          path to the config file, NOTE: if this is set, all other options will be ignored
      --network-name <NETWORK_NAME>
          network name to identify this vpn network [default: default]
      --network-secret <NETWORK_SECRET>
          network secret to verify this node belongs to the vpn network [default: ]
  -i, --ipv4 <IPV4>
          ipv4 address of this vpn node, if empty, this node will only forward packets and no TUN device will be
          created
  -d, --dhcp
          automatically determine and set IP address by Easytier, and the
          IP address starts from 10.0.0.1 by default. Warning, if there is an IP
          conflict in the network when using DHCP, the IP will be automatically
          changed.
  -p, --peers [<PEERS>...]
          peers to connect initially
  -e, --external-node <EXTERNAL_NODE>
          use a public shared node to discover peers
  -n, --proxy-networks <PROXY_NETWORKS>
          export local networks to other peers in the vpn
  -r, --rpc-portal <RPC_PORTAL>
          rpc portal address to listen for management. 0 means random
          port, 12345 means listen on 12345 of localhost, 0.0.0.0:12345 means
          listen on 12345 of all interfaces. default is 0 and will try 15888 first [default: 0]
  -l, --listeners [<LISTENERS>...]
          listeners to accept connections, allow format:
          a port number: 11010, means tcp/udp will listen on 11010, ws/wss will listen on 11010 and 11011, wg will
          listen on 11011
          url: tcp://0.0.0.0:11010, tcp can be tcp, udp, ring, wg, ws, wss,
          proto:port: wg:11011, means listen on 11011 with wireguard protocol
          url and proto:port can occur multiple times.
                       [default: 11010]
      --no-listener
          do not listen on any port, only connect to peers
      --console-log-level <CONSOLE_LOG_LEVEL>
          console log level [possible values: trace, debug, info, warn, error, off]
      --file-log-level <FILE_LOG_LEVEL>
          file log level [possible values: trace, debug, info, warn, error, off]
      --file-log-dir <FILE_LOG_DIR>
          directory to store log files
      --hostname <HOSTNAME>
          host name to identify this device
  -m, --instance-name <INSTANCE_NAME>
          instance name to identify this vpn node in same machine [default: default]
      --vpn-portal <VPN_PORTAL>
          url that defines the vpn portal, allow other vpn clients to connect.
          example: wg://0.0.0.0:11010/10.14.14.0/24, means the vpn portal is a wireguard server listening on
          vpn.example.com:11010,
          and the vpn client is in network of 10.14.14.0/24
      --default-protocol <DEFAULT_PROTOCOL>
          default protocol to use when connecting to peers
  -u, --disable-encryption
          disable encryption for peers communication, default is false, must be same with peers
      --multi-thread
          use multi-thread runtime, default is single-thread
      --disable-ipv6
          do not use ipv6
      --dev-name <DEV_NAME>
          optional tun interface name
      --mtu <MTU>
          mtu of the TUN device, default is 1420 for non-encryption, 1400 for encryption
      --latency-first
          latency first mode, will try to relay traffic with lowest latency path, default is using shortest path
      --exit-nodes [<EXIT_NODES>...]
          exit nodes to forward all traffic to, a virtual ipv4 address, priority is determined by the order of the
          list
      --enable-exit-node
          allow this node to be an exit node, default is false
      --no-tun
          do not create TUN device, can use subnet proxy to access node
      --use-smoltcp
          enable smoltcp stack for subnet proxy
      --manual-routes [<MANUAL_ROUTES>...]
          assign routes cidr manually, will disable subnet proxy and
          wireguard routes propogated from peers. e.g.: 192.168.0.0/16
      --relay-network-whitelist [<RELAY_NETWORK_WHITELIST>...]
          only relay traffic of whitelisted networks, input is a wildcard
          string, e.g.: '*' (all networks), 'def*' (network prefixed with def), can specify multiple networks
          disable relay if arg is empty. default is allowing all networks
  -h, --help
          Print help
  -V, --version
          Print version
```
