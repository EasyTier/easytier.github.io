# Configurations

You can use ``easytier-core --help`` to view all configuration items


```` sh
Options:
      --network-name <NETWORK_NAME>
          network name to identify this vpn network 
          [default: default]
      --network-secret <NETWORK_SECRET>
          network secret to verify this node belongs to the vpn network 
          [default: ]
  -i, --ipv4 <IPV4>
          ipv4 address of this vpn node
  -p, --peers <PEERS>
          peers to connect initially
  -e, --external-node <EXTERNAL_NODE>
          use a public shared node to discover peers
  -n, --proxy-networks <PROXY_NETWORKS>
          export local networks to other peers in the vpn
  -r, --rpc-portal <RPC_PORTAL>
          rpc portal address to listen for management 
          [default: 127.0.0.1:15888]
  -l, --listeners <LISTENERS>
          listeners to accept connections, pass '' to avoid listening. 
          [default: tcp://0.0.0.0:11010 udp://0.0.0.0:11010 wg://0.0.0.0:11011]
      --net-ns <NET_NS>
          specify the linux network namespace, default is the root  namespace
      --console-log-level <CONSOLE_LOG_LEVEL>
          console log level 
          [possible values: trace, debug, info, warn, error, off]
      --file-log-level <FILE_LOG_LEVEL>
          file log level 
          [possible values: trace, debug, info, warn, error, off]
      --file-log-dir <FILE_LOG_DIR>
          directory to store log files
  -m, --instance-name <INSTANCE_NAME>
          instance name to identify this vpn node in same machine  
          [default: default]
  -d, --instance-id <INSTANCE_ID>
          instance uuid to identify this vpn node in whole vpn network example: 123e4567-e89b-12d3-a456-426614174000    
      --vpn-portal <VPN_PORTAL>
          url that defines the vpn portal, allow other vpn clients to connect.
          example: wg://0.0.0.0:11010/10.14.14.0/24, means the vpn portal is a wireguard server listening on vpn.example.com:11010, and the vpn client is in network of 10.14.14.0/24        
      --default-protocol <DEFAULT_PROTOCOL>
          default protocol to use when connecting to peers
  -u, --disable-encryption
          disable encryption for peers communication, default is false, must be same with peers
      --multi-thread
          use multi-thread runtime, default is single-thread       
      --disable-ipv6
          do not use ipv6
  -h, --help
          Print help
  -V, --version
          Print version
````