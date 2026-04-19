# Secure Mode

Secure Mode is an enhanced security mechanism in EasyTier. Compared to the legacy mode, it improves security in several areas:

1. **End-to-End Encryption (E2EE)**: Any two nodes independently negotiate encryption keys. Even if traffic passes through a third-party shared node or public relay, the relay server cannot decrypt your data. In the legacy mode, all nodes in the same network rely on a shared `network_secret` for encryption; once the password is leaked, traffic across the entire network may be compromised.
2. **Safer Handshake and Key Management**: The handshake process uses the Noise protocol framework (the same standard used by modern VPNs like WireGuard) and includes built-in replay protection. Session keys are automatically rotated, so even if a key is compromised at a certain point in time, an attacker cannot retroactively decrypt historical traffic or replay captured packets to impersonate a legitimate node.
3. **Shared Node Identity Verification**: You can pin a shared node's public key to ensure you are connecting to the intended server and not a man-in-the-middle impostor.
4. **Temporary Credentials and Tiered Authorization**: Admin nodes can issue short-term credentials for visitors or temporary devices, restricting their permissions (e.g., prohibiting relay or subnet proxy). Credentials automatically expire or can be revoked without spreading the main password.

## What Problems Does It Solve

In the legacy mode, all nodes that know the `network_secret` are fully equal, which causes several practical issues:

- **Untrusted shared nodes**: When networking through a third-party shared node or public relay, you cannot confirm that you are connecting to the target server, creating a risk of man-in-the-middle hijacking.
- **No fine-grained permissions**: Temporary or guest devices must also obtain the main `network_secret`. Once leaked, the only remedy is to change the password for the entire network.
- **Difficult temporary authorization**: There is no way to grant a device a short-term permission that automatically expires after a few days.

Secure Mode separates these scenarios:

- Regular nodes in the same network still use `network_secret` for the strongest authentication.
- Shared nodes can prove "I am the server you want to connect to" through a fixed public key.
- Temporary nodes can join the network with a short-term credential without touching the main password.
- Credentials support TTL, manual revocation, and automatic synchronization across the entire network.

## Upgrade Notes

This is where mistakes are most commonly made. Please read this section before proceeding:

1. **Upgrade the server first, then the client**. A server with Secure Mode enabled can accept connections from legacy clients; however, a client with Secure Mode enabled cannot connect to a legacy server.
2. **The credential feature requires the entire chain to support Secure Mode**. Admin nodes, temporary nodes, and regular nodes that participate in propagating trust information all need to be upgraded to a version that supports Secure Mode.
3. **Web console / web client**: The web link also integrates with the secure tunnel. It is recommended to use the latest official build to avoid compatibility issues with early versions.

## Scenario 1: Enabling Secure Mode Between Regular Nodes

This is the simplest use case. All regular nodes keep their original `network_name` and `network_secret`, and add `--secure-mode`:

```sh
easytier-core -d \
  --network-name office \
  --network-secret 'replace-with-a-strong-secret' \
  --secure-mode \
  -p tcp://node-a.example.com:11010
```

Effect: Nodes first establish an encrypted channel and then verify each other's identity using the shared `network_secret`. This is suitable for scenarios where all nodes belong to the same trust domain and you simply want to upgrade transport security.

## Scenario 2: Connecting Through a Shared Node / Public Relay

If you connect through a shared node or public relay in your network, **enabling `--secure-mode` alone only guarantees traffic encryption; it does not ensure you are connecting to the correct shared node**. To prevent connecting to the wrong server or being replaced by a man-in-the-middle, you must configure a fixed public key for the shared node and pin that public key on the client.

### Shared Node Side: Fix the Public Key

The shared node must explicitly save a fixed private key. Otherwise, EasyTier will randomly generate a new key on each startup, causing the client's pin to become invalid.

```sh
easytier-core \
  --network-name public-relay \
  --secure-mode \
  --local-private-key '<relay-private-key-base64>' \
  -l tcp://0.0.0.0:11010 \
  -l udp://0.0.0.0:11010
```

- `--local-public-key` can usually be omitted; the program will automatically derive it from the private key.
- The shared node should distribute its corresponding public key to clients through a trusted channel (e.g., private message, internal documentation).

### Client Side: Pin the Shared Node's Public Key

It is recommended to specify `peer_public_key` in the configuration file:

```toml
[network_identity]
network_name = "office"
network_secret = "replace-with-a-strong-secret"

[secure_mode]
enabled = true

[[peer]]
uri = "tcp://relay.example.com:11010"
peer_public_key = "<relay-public-key-base64>"
```

Effect: Even if the shared node does not know your business network password, the client can confirm it has connected to the correct server. Without pinning the public key, you only get an "encrypted but unauthenticated" connection, which significantly reduces security.

::: warning Important
If you connect through a shared node or public relay, **be sure to configure `peer_public_key` pinning**. Enabling `--secure-mode` alone does not mean "the shared node's identity has been verified".
:::

## Scenario 3: Issuing Network Credentials for Temporary Devices

This is one of the most practical features of Secure Mode. An admin node can issue short-term credentials for the network, allowing temporary devices to join using only the credential without knowing the main `network_secret`.

### 1. Start the Admin Node

The admin node itself is still a regular node and must retain `network_secret`. It is recommended to configure a credential persistence file; otherwise, issued credentials will be lost after a restart:

```sh
easytier-core -d \
  --network-name office \
  --network-secret 'replace-with-a-strong-secret' \
  --secure-mode \
  --credential-file /var/lib/easytier/credentials.json \
  -p tcp://node-a.example.com:11010
```

### 2. Generate a Credential

```sh
easytier-cli credential generate --ttl 86400
```

A more complete example (with permission restrictions):

```sh
easytier-cli credential generate \
  --ttl 86400 \
  --groups guest \
  --allow-relay \
  --allowed-proxy-cidrs 192.168.10.0/24
```

After generation, two key fields are returned:

- `credential_id`: The management ID of the credential, used for subsequent listing and revocation.
- `credential_secret`: The private key that the temporary device actually needs. **This is equivalent to a highly sensitive password; please transmit it securely**.

### 3. Temporary Node Joins the Network

```sh
easytier-core -d \
  --network-name office \
  --secure-mode \
  --credential '<credential-secret-base64>' \
  -p tcp://admin.example.com:11010
```

- `--credential` implicitly enables Secure Mode. **You do not need to provide `--network-secret`**.

### 4. List and Revoke Credentials

List currently valid credentials:

```sh
easytier-cli credential list
```

Manually revoke a credential:

```sh
easytier-cli credential revoke <credential_id>
```

Behavioral characteristics:

- Credentials automatically expire after the `ttl` ends.
- After revocation, the trust list is synchronized through route propagation, and **already connected temporary nodes will be automatically removed**.
- It is best to issue one credential per device to facilitate tracking and revocation.

### Credential Permission Restrictions

Constraints can be attached when generating credentials to implement the principle of least privilege:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `groups` | Assign ACL groups to the node for tiered authorization with ACL policies | None |
| `allow_relay` | Whether the node is allowed to participate in relaying/forwarding traffic for other nodes | `false` |
| `allowed_proxy_cidrs` | Restrict which subnet proxy CIDRs the node can advertise | Empty (no proxy CIDRs allowed) |

By default, temporary nodes **cannot** relay traffic and **cannot** proxy subnets. These must be explicitly enabled via parameters.

## Configuration Parameters Quick Reference

| Parameter | Description |
|-----------|-------------|
| `--secure-mode` | Enable Secure Mode |
| `--local-private-key` | Local static private key (base64). Shared nodes should explicitly specify this to avoid public key changes after restart |
| `--local-public-key` | Local static public key (base64); usually can be omitted, automatically derived from the private key |
| `--credential` | Credential private key used when joining as a temporary node |
| `--credential-file` | File path for the admin node to persist the credential database |

Complete configuration file example:

```toml
credential_file = "/var/lib/easytier/credentials.json"

[network_identity]
network_name = "office"
network_secret = "replace-with-a-strong-secret"

[secure_mode]
enabled = true
local_private_key = "<optional-base64-private-key>"
```

## Migration Recommendations

If you plan to migrate an existing network to Secure Mode, it is recommended to proceed in the following order:

1. First upgrade all shared nodes, entry nodes, and admin nodes to a version that supports Secure Mode.
2. Enable `--secure-mode` between regular nodes while keeping the original `network_secret` unchanged.
3. Fix `local_private_key` for shared nodes and gradually configure `peer_public_key` pinning for clients.
4. Introduce the credential mechanism when there is a need for visitor or temporary devices, avoiding further spreading of the main password.
