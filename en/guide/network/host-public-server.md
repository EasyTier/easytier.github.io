# Setting Up a Shared Node

Users can use their own public nodes to set up a public shared node for networking without a public IP, making it easier for other users without a public IP to network. Simply start EasyTier without any parameters, and the node can be used as a public server (no root privileges required):

```
easytier-core
```

Additionally, EasyTier supports shared node clusters. Each virtual network (created with the same network name and key) can act as a shared node cluster, and nodes from other networks can connect to any node in the shared node cluster, discovering each other without a public IP. Running a self-built public server cluster is the same as running a virtual network, but you can skip configuring the IPv4 address.

If you wish to contribute a public server to the EasyTier community, you can contact the administrator, and we will inform you how to add your node to the community shared node list. Of course, this requires your node to have a certain level of bandwidth and stability.

## Disable Forwarding

By default, each EasyTier node allows forwarding services for other virtual networks, even if the node has specified a network name (`--network-name`) and network key (`--network-secret`), and has joined a virtual network.

To change this behavior, you can use the `--relay-network-whitelist` parameter to specify a whitelist of network names that can be forwarded (a space-separated list of wildcards, such as `"ab* abc"`). When this parameter's list is empty, it will not provide forwarding services for any other networks.

EasyTier can avoid forwarding network packets for other virtual networks and only help them establish P2P links by setting the whitelist to empty and configuring it to only forward RPC traffic. The reference command is:

```
easytier-core --relay-network-whitelist --relay-all-peer-rpc
```

## Private Mode

If you want EasyTier to only provide services in your virtual network and don't want nodes from other virtual networks to connect to your node, you can start EasyTier with the `--private-mode true` parameter.

```
sudo easytier-core --private-mode true --network-name my-network --network-secret my-secret
```

This will only allow nodes with network name `my-network` and key `my-secret` to connect to this EasyTier node.

## Frontend Rate Limiting

If a shared node is exposed to the public Internet, put a reverse proxy, L4 gateway, or firewall in front of EasyTier whenever possible. The allocator can help RSS drop after traffic spikes, but it is not a replacement for connection limiting. During CC attacks, prioritize limiting new connections, concurrent connections, slow handshakes, and abnormally large requests.

### WebSocket Entry

If you expose `ws://` or `wss://`, NGINX HTTP reverse proxy can limit request rate and concurrent connections per client IP:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=easytier_req_per_ip:20m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=easytier_conn_per_ip:20m;
    limit_conn_zone $server_name zone=easytier_conn_total:20m;

    server {
        listen 443 ssl http2;
        server_name example.com;

        location / {
            limit_req zone=easytier_req_per_ip burst=20 nodelay;
            limit_conn easytier_conn_per_ip 20;
            limit_conn easytier_conn_total 20000;

            proxy_pass http://127.0.0.1:11010;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_read_timeout 300s;
            proxy_send_timeout 30s;
            client_header_timeout 5s;
            client_body_timeout 5s;
            client_max_body_size 1m;
            large_client_header_buffers 4 8k;
        }
    }
}
```

For trusted users, increase `limit_conn easytier_conn_per_ip` as needed. During an active attack, lowering it to `3` to `5` is usually a safer starting point.

### TCP Entry

If you expose `tcp://`, NGINX stream can limit L4 connections:

```nginx
stream {
    limit_conn_zone $binary_remote_addr zone=easytier_tcp_per_ip:20m;

    server {
        listen 11010;
        proxy_pass 127.0.0.1:11011;

        limit_conn easytier_tcp_per_ip 10;
        proxy_connect_timeout 3s;
        proxy_timeout 300s;
    }
}
```

In this example, NGINX listens on `11010`, while EasyTier listens on `127.0.0.1:11011`.

### UDP and QUIC Entry

For `udp://` and `quic://`, prefer firewall rules or cloud-provider L4 protection. For example, nftables can apply coarse rate limiting to new UDP traffic:

```shell
sudo nft add rule inet filter input udp dport 11010 ct state new limit rate over 100/second burst 200 packets drop
```

Tune the threshold according to bandwidth, CPU capacity, and user scale. Public nodes should keep a whitelist mechanism to avoid blocking many users behind the same NAT egress IP.

### Memory Reclaim Tuning

In CI release builds, common x86 Linux packages use `jemalloc`, while some platforms such as Windows, aarch64, riscv64, loongarch64, and FreeBSD use `mimalloc`.

After v2.6.4, `jemalloc` builds include a more aggressive RSS decay configuration by default. If you need to override it temporarily, add an environment variable to your systemd service:

```ini
Environment=MALLOC_CONF=background_thread:true,dirty_decay_ms:10000,muzzy_decay_ms:10000,retain:false
```

For `mimalloc` platforms, use:

```ini
Environment=MIMALLOC_PURGE_DELAY=100
Environment=MIMALLOC_PURGE_DECOMMITS=1
```

A smaller purge delay makes RSS drop faster, but can cost more CPU. A larger delay favors performance, but memory will return to the OS more slowly after attack traffic stops.
