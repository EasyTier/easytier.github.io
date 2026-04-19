# 安全模式（Secure Mode）

安全模式是 EasyTier 的增强安全机制。相比旧模式，它在多个层面做了加强：

1. **端到端加密（E2EE）**：任意两个节点之间会独立协商加密密钥，即使流量经过第三方共享节点或公网中继，中继服务器也无法解密你的数据。旧模式下，同一个网络内的节点靠共享的 `network_secret` 进行通信加密，一旦密码泄露，整个网络的流量都可能被窃听。
2. **更安全的握手与密钥管理**：握手流程采用 Noise 协议框架（WireGuard 等现代 VPN 也在使用的标准），并内置防重放保护。会话密钥支持自动轮换，即使某一时刻的密钥被泄露，攻击者也无法回溯解密历史流量，或者截获旧数据包重复发送来冒充合法节点。
3. **共享节点身份验证**：你可以锁定共享节点的公钥，确保自己连到的就是目标服务器，而不是被中间人劫持的假冒节点。
4. **临时凭据与分级授权**：管理节点可以为访客或临时设备签发短期凭据，限制其权限（如禁止中继、禁止代理子网），凭据到期或撤销后自动失效，无需扩散主密码。

## 它能解决什么问题

在旧模式下，所有知道 `network_secret` 的节点都是完全平等的，这会带来几个实际困扰：

- **共享节点不可信**：你通过第三方共享节点或公网中继组网时，无法确认自己连到的就是目标服务器，存在被中间人劫持的风险。
- **权限无法细分**：临时设备、访客设备也必须拿到主 `network_secret`，一旦泄露只能整体换密码。
- **临时授权困难**：没法给某台设备发一个"几天后自动失效"的短期权限。

安全模式把这些场景拆开处理：

- 同网正式节点仍用 `network_secret` 做最强认证。
- 共享节点可以通过固定公钥证明"我就是你要连的那台服务器"。
- 临时节点可以只拿一份短期凭据加入网络，不必接触主密码。
- 凭据支持设置有效期、手动撤销，并会自动同步到全网生效。

## 升级注意事项

这是最容易踩坑的地方，请先读完再操作：

1. **先升级服务端，再升级客户端**。开启安全模式的服务端可以接受旧客户端连接；但反过来，开启安全模式的客户端连不上旧服务端。
2. **凭据功能要求整条链路都支持安全模式**。管理节点、临时节点、以及参与传播可信信息的正式节点，都需要升级到支持安全模式的版本。
3. **Web 控制台/网页客户端**：网页链路也接入了安全隧道，建议使用官方最新版本构建，避免早期版本的兼容性问题。

## 场景一：正式节点之间启用安全模式

这是最简单的用法。所有正式节点保留原来的 `network_name` 和 `network_secret`，再加一个 `--secure-mode` 即可：

```sh
easytier-core -d \
  --network-name office \
  --network-secret 'replace-with-a-strong-secret' \
  --secure-mode \
  -p tcp://node-a.example.com:11010
```

效果：节点之间会先建立加密通道，再用共同的 `network_secret` 确认彼此身份。适合"所有节点都属同一信任域，只想升级传输安全性"的场景。

## 场景二：通过共享节点/公网中继接入

如果你通过网络中的共享节点或公网中继接入，**只开 `--secure-mode` 只能保证流量加密，并不能确保你连到的就是正确的共享节点**。要防止连错服务器或被中间人替换，必须给共享节点配置固定公钥，并在客户端"锁定"（pin）这个公钥。

### 共享节点侧：固定公钥

共享节点必须显式保存一份固定的私钥。如果不提供，EasyTier 每次启动都会随机生成新密钥，导致客户端的锁定失效。

```sh
easytier-core \
  --network-name public-relay \
  --secure-mode \
  --local-private-key '<relay-private-key-base64>' \
  -l tcp://0.0.0.0:11010 \
  -l udp://0.0.0.0:11010
```

- `--local-public-key` 通常可以省略，程序会自动由私钥派生。
- 共享节点应把对应的公钥通过可信渠道（如私聊、内部文档）发给客户端。

### 客户端侧：锁定共享节点公钥

建议在配置文件里指定 `peer_public_key`：

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

效果：即使共享节点不知道你的业务网络密码，客户端也能确认自己连到了正确的服务器。如果没有锁定公钥，只能得到"已加密但未确认身份"的连接，安全性大打折扣。

::: warning 重要
如果你是通过共享节点或公网中继接入，**务必配置 `peer_public_key` 做锁定**。单独打开 `--secure-mode` 不等于"已经确认共享节点身份"。
:::

## 场景三：给临时设备发放入网凭据

这是安全模式最实用的功能之一。管理节点可以为网络签发短期凭据，临时设备只凭凭据加入，不需要知道主 `network_secret`。

### 1. 启动管理节点

管理节点本身是正式节点，仍需保留 `network_secret`。建议配置凭据持久化文件，否则重启后已签发的凭据会全部失效：

```sh
easytier-core -d \
  --network-name office \
  --network-secret 'replace-with-a-strong-secret' \
  --secure-mode \
  --credential-file /var/lib/easytier/credentials.json \
  -p tcp://node-a.example.com:11010
```

### 2. 生成凭据

```sh
easytier-cli credential generate --ttl 86400
```

更完整的例子（限制权限）：

```sh
easytier-cli credential generate \
  --ttl 86400 \
  --groups guest \
  --allow-relay \
  --allowed-proxy-cidrs 192.168.10.0/24
```

生成后会返回两个关键字段：

- `credential_id`：凭据的管理 ID，用于后续查看和撤销。
- `credential_secret`：临时设备真正需要拿的私钥，**等价于高敏感度密码，请妥善传递**。

### 3. 临时节点加入网络

```sh
easytier-core -d \
  --network-name office \
  --secure-mode \
  --credential '<credential-secret-base64>' \
  -p tcp://admin.example.com:11010
```

- `--credential` 会隐式开启安全模式，**不需要再提供 `--network-secret`**。

### 4. 查看与撤销凭据

列出当前有效的凭据：

```sh
easytier-cli credential list
```

手动撤销某条凭据：

```sh
easytier-cli credential revoke <credential_id>
```

行为特点：

- `ttl` 到期后凭据自动失效。
- 撤销后，可信列表会随路由同步传播，**已接入的临时节点会被自动移除**。
- 一份凭据最好只发给一台设备，便于追踪和撤销。

### 凭据的权限限制

生成凭据时可以附加约束，实现最小权限原则：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `groups` | 给该节点附加 ACL 分组，用于配合 ACL 策略做分级授权 | 无 |
| `allow_relay` | 是否允许该节点参与中继/转发其他节点的流量 | `false` |
| `allowed_proxy_cidrs` | 限制该节点能对外宣告哪些子网代理网段 | 空（不允许宣告任何代理网段） |

默认情况下，临时节点**不能**中继流量，也**不能**代理子网，需要通过参数显式放开。

## 配置参数速查

| 参数 | 说明 |
|------|------|
| `--secure-mode` | 开启安全模式 |
| `--local-private-key` | 本地固定私钥（base64）。共享节点建议显式指定，避免重启后公钥变化 |
| `--local-public-key` | 本地固定公钥（base64），通常可省略，由私钥自动派生 |
| `--credential` | 作为临时节点加入时使用的凭据私钥 |
| `--credential-file` | 管理节点持久化凭据数据库的文件路径 |

完整的配置文件示例：

```toml
credential_file = "/var/lib/easytier/credentials.json"

[network_identity]
network_name = "office"
network_secret = "replace-with-a-strong-secret"

[secure_mode]
enabled = true
local_private_key = "<optional-base64-private-key>"
```

## 迁移建议

如果你准备把已有网络迁移到安全模式，建议按以下顺序操作：

1. 先升级所有共享节点、入口节点、管理节点到支持安全模式的版本。
2. 在正式节点之间开启 `--secure-mode`，保持原有 `network_secret` 不变。
3. 为共享节点固定 `local_private_key`，并逐步给客户端配置 `peer_public_key` 锁定。
4. 有访客/临时设备需求时，再引入凭据机制，避免继续扩散主密码。
