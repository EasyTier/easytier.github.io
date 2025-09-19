# Easytier ACL 功能指南 🛡️

## 📖 目录

1. [核心概念](#-核心概念)
2. [工作原理](#-工作原理)
3. [配置详解](#-配置详解)
4. [常用场景示例](#-常用场景示例)
5. [最佳实践与注意事项](#-最佳实践与注意事项)

---

## 🧠 核心概念

理解以下几个关键概念是配置 ACL 的基础：

- **ACL（访问控制列表）**：一组规则的集合，用于允许或拒绝网络流量。Easytier 自 2.4.0 版本起支持基于 IP 的 ACL，2.4.3 版本新增基于身份组（Group）的零信任 ACL 机制，策略配置更加灵活。
- **链（Chain）**：规则的集合。链有不同的类型，例如 `chain_type = 1` 表示入站链，用于处理发送到本机的流量。
- **规则（Rule）**：定义流量匹配条件（如协议、端口、源/目标组）及匹配后的执行动作（允许或拒绝）。
- **组（Group）**：一个逻辑上的身份标签。节点（服务器、电脑等）可以声明自己属于一个或多个组（如 `admin`、`database`）。
- **组声明（Group Declaration）**：节点需预先知道所有可能通信的组名及其对应的共享密钥，密钥用于验证其他节点声明的组成员身份是否有效。
- **优先级（Priority）**：规则按优先级数值从高到低匹配。一旦流量匹配某条规则，将执行其动作并停止后续匹配。

---

## 🔧 配置详解

ACL 配置需添加到 Easytier 的配置文件 `config.yaml` 中。

### 1. 定义组与密钥

这是最关键的一步。每个节点需在配置中声明其所属的组，并配置所有相关组的共享密钥。

```yaml
# 本节定义本节点要加入的组（用于生成身份证明）
[acl.acl_v1.group]
members = ["admin", "web-server"]  # 本节点身份：既是管理员，也是Web服务器

# 本节定义本节点“已知”的所有组及其密钥（用于验证对方身份）
[[acl.acl_v1.group.declares]]
group_name = "admin"
group_secret = "super-secret-admin-key" # 请使用更复杂的密钥！

[[acl.acl_v1.group.declares]]
group_name = "web-server"
group_secret = "web-server-secret-key"

[[acl.acl_v1.group.declares]]
group_name = "database"
group_secret = "database-secret-key"

[[acl.acl_v1.group.declares]]
group_name = "guest"
group_secret = "guest-secret-key"
```

> **⚠️ 重要提示**：
> - `members`：定义本节点的身份。
> - `declares`：相当于节点的“通讯录”，必须包含网络中所有可能通信的组的定义。所有节点的 `declares` 必须完全一致。
> - `group_secret`：是安全的核心，必须使用高强度、独一无二的密钥，且所有节点共享相同的密钥定义。

---

### 2. 配置规则链 (Chain)

规则链决定了如何处理流量。

```yaml
# 定义一个入站链
[[acl.acl_v1.chains]]
name = "my_acl_policy"    # 链名称
chain_type = 1            # 0：未指定，1：入站链（处理发给本机的流量），2：出站（处理本机发出的流量），3：转发（子网代理）
description = "我的安全策略"
enabled = true            # 启用此链
default_action = 2        # 默认动作：1(允许) 2(拒绝)
```

---

### 3. 配置规则 (Rules)

规则是策略的核心，定义在链内部。

```yaml
# 上面定义的链中的规则列表
[[acl.acl_v1.chains.rules]]
name = "allow_admin_rdp"
description = "允许管理员通过RDP连接本机"
priority = 1000              # 优先级，数字越大优先级越高（0-65535）
action = 1                   # 动作：0(无操作) 1(允许) 2(拒绝)
source_groups = ["admin"]    # 规则匹配：源设备必须属于 admin 组
protocol = 1                 # 协议：0(未指定) 1(TCP) 2(UDP) 3(ICMP) 4(ICMPv6) 5(任何)
ports = ["3389"]             # 本机允许端口：3389(RDP)
enabled = true               # 启用此规则

[[acl.acl_v1.chains.rules]]
name = "deny_guest_to_db"
description = "拒绝访客访问数据库"
priority = 900               # 优先级较低
action = 2                   # 动作：0(无操作) 1(允许) 2(拒绝)
source_groups = ["guest"]    # 规则匹配：源设备必须属于 guest 组
destination_groups = ["database"]  # 目标设备属于 database 组时匹配
enabled = true               # 启用规则
protocol = 1                 # TCP协议
ports = []                   # 留空，则匹配所有端口
source_ips = []              # 留空，则匹配所有源IP范围；格式 `10.144.144.2/32`
destination_ips = []         # 留空，则匹配所有目标IP范围
source_ports = []            # 留空，则匹配所有源端口
rate_limit = 0               # 速率限制（bps），0 = 无限制
burst_limit = 0              # 突发的最高带宽（bps）
stateful = true              # 启用连接跟踪
```

---

## 🧪 常用场景示例

### 场景 1：极简安全组 - “密钥相同即放行”

**目标**：实现一个私有网络，只要设备拥有相同的密钥，就能互通；没有密钥的设备无法接入。

**配置**：

```yaml
[acl.acl_v1.group]
members = ["my-net"]  # 所有设备都加入同一个组

[[acl.acl_v1.group.declares]]
group_name = "my-net"
group_secret = "my-net-secret-key"  # 所有设备使用相同密钥

[[acl.acl_v1.chains]]
name = "default_inbound"
chain_type = 1
enabled = true
default_action = 2  # 默认拒绝

# 核心规则：允许组内所有通信
[[acl.acl_v1.chains.rules]]
name = "allow_whole_group"
description = "允许组内所有流量"
priority = 1000
action = 1
source_groups = ["my-net"]      # 源是组内成员
destination_groups = ["my-net"] # 目标是组内成员
protocol = 1
enabled = true
```

---

### 场景 2：三层网络架构

**目标**：模拟经典 Web-DB 架构，只允许 Web 服务器访问数据库的特定端口。

**节点配置**：

- Web 服务器：`members = ["web"]`
- 数据库服务器：`members = ["db"]`
- 管理员机器：`members = ["admin"]`

**数据库服务器上的 ACL 规则**：

```yaml
[[acl.acl_v1.chains]]
name = "db_server_policy"
chain_type = 1
enabled = true
default_action = 2  # 默认拒绝所有连接

# 规则 1: 允许Web服务器访问数据库端口
[[acl.acl_v1.chains.rules]]
name = "allow_web_to_mysql"
description = "允许Web组访问MySQL"
priority = 100
action = 1
source_groups = ["web"]
destination_groups = ["db"]  # 目标是本机（db组）
protocol = 1
ports = ["3306"]  # 只开放MySQL端口
enabled = true

# 规则 2: 允许管理员访问所有端口（例如用于管理）
[[acl.acl_v1.chains.rules]]
name = "allow_admin_to_all"
description = "允许管理员访问所有服务"
priority = 110  # 优先级比上一条更高
action = 1
source_groups = ["admin"]
destination_groups = ["db"]  # 目标是本机（db组）
protocol = 1
enabled = true
```

---

## ✅ 最佳实践与注意事项

1. **密钥管理**：
   - **重要性**：`group_secret` 是安全的基石，一旦泄露，攻击者可随意加入您的网络。
   - **建议**：使用密码生成器创建长且复杂的密钥，并定期更换。
   - **安全存储**：不要将配置文件提交到公共代码仓库。

2. **配置一致性**：
   - 确保网络中所有节点的 `[[acl.acl_v1.group.declares]]` 部分完全一致（相同的组名和密钥），否则会导致组验证失败，网络不通。

3. **调试技巧**：
   - 从宽松策略（`default_action = 1`）开始，搭配日志确认网络连通性。
   - 逐步添加拒绝规则（`action = 2`）来限制访问。
   - 最后，改为 `default_action = 2` ，形成“白名单”模式。
   - 充分利用 `description` 字段，为每个规则添加清晰注释，便于后期维护。
   - `easytier-cli acl stats` 命令可查看 ACL 统计信息。

4. **操作顺序**：
   - 修改 ACL 配置后，通常需要重启 Easytier 进程才能生效。
   - 使用 `easytier-core -d --tcp-whitelist 端口号` 等命令可以自动生成简单的端口白名单规则，可作为学习起点。

---

希望这份文档能帮助您更好地理解和使用 Easytier 的 ACL 功能！如有任何问题，欢迎在社区讨论。🎉