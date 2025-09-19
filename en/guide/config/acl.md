# Easytier ACL Feature Guide 🛡️

## 📖 Table of Contents

1. [Core Concepts](#-core-concepts)
2. [How It Works](#-how-it-works)
3. [Configuration Details](#-configuration-details)
4. [Common Use Case Examples](#-common-use-case-examples)
5. [Best Practices and Notes](#-best-practices-and-notes)

---

## 🧠 Core Concepts

Understanding the following key concepts is essential for configuring ACL:

- **ACL (Access Control List)**: A set of rules used to allow or deny network traffic. Easytier's 2.4.0 update introduced IP-based ACL control, and version 2.4.3 added a zero-trust ACL mechanism based on identity groups, making policies more flexible.
- **Chain**: A collection of rules. Chains have types; for example, `chain_type = 1` represents an inbound chain, processing traffic sent to the local machine.
- **Rule**: Defines traffic matching conditions (such as protocol, port, source/target groups) and the action to take upon a match (allow or deny).
- **Group**: A logical identity tag. A node (server, computer, etc.) can declare that it belongs to one or more groups (e.g., `admin`, `database`).
- **Group Declaration**: A node needs to know in advance all the group names it might communicate with and their corresponding shared secrets. The secret is used to verify whether the group membership claimed by other nodes is valid.
- **Priority**: Rules are matched in descending order of priority value. Once traffic matches a rule, its action is executed, and subsequent matching stops.

---

## 🔧 Configuration Details

ACL configuration must be added to Easytier's configuration file `config.yaml`.

### 1. Define Groups and Secrets

This is the most critical step. Each node needs to declare which groups it belongs to in its configuration and configure the shared secrets for all related groups.

```yaml
# This section defines the groups this node will join (for generating identity proof)
[acl.acl_v1.group]
members = ["admin", "web-server"]  # This node's identity: both an administrator and a web server

# This section defines all groups "known" to this node and their secrets (for verifying peer identities)
[[acl.acl_v1.group.declares]]
group_name = "admin"
group_secret = "super-secret-admin-key" # Please use a more complex key!

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

> **⚠️ Important Notes**:
> - `members`: Defines this node's identity.
> - `declares`: Acts as the node's "address book" and must include definitions for all groups in the network that might communicate. The `declares` section must be completely consistent across all nodes.
> - `group_secret`: The cornerstone of security. Must use a strong, unique secret, and all nodes must share the same secret definitions.

---

### 2. Configure Rule Chains

Rule chains determine how traffic is handled.

```yaml
# Define an inbound chain
[[acl.acl_v1.chains]]
name = "my_acl_policy"    # Chain name
chain_type = 1            # 0: Unspecified, 1: Inbound chain (processes traffic sent to this machine), 2: Outbound (processes traffic sent from this machine), 3: Forwarding (subnet proxy)
description = "My security policy"
enabled = true            # Enable this chain
default_action = 2        # Default action: 1(Allow) 2(Deny)
```

---

### 3. Configure Rules

Rules are the core of the policy and are defined within chains.

```yaml
# List of rules within the chain defined above
[[acl.acl_v1.chains.rules]]
name = "allow_admin_rdp"
description = "Allow administrators to RDP to this machine"
priority = 1000              # Priority, higher number means higher priority (0-65535)
action = 1                   # Action: 0(No operation) 1(Allow) 2(Deny)
source_groups = ["admin"]    # Rule match: source device must belong to the admin group
protocol = 1                 # Protocol: 0(Unspecified) 1(TCP) 2(UDP) 3(ICMP) 4(ICMPv6) 5(Any)
ports = ["3389"]             # Local allowed port: 3389 (RDP)
enabled = true               # Enable this rule

[[acl.acl_v1.chains.rules]]
name = "deny_guest_to_db"
description = "Deny guests access to the database"
priority = 900               # Lower priority
action = 2                   # Action: 0(No operation) 1(Allow) 2(Deny)
source_groups = ["guest"]    # Rule match: source device must belong to the guest group
destination_groups = ["database"]  # Match when the target device belongs to the database group
enabled = true               # Enable the rule
protocol = 1                 # TCP protocol
ports = []                   # If empty, matches all ports
source_ips = []              # If empty, matches all source IP ranges; format `10.144.144.2/32`
destination_ips = []         # If empty, matches all destination IP ranges
source_ports = []            # If empty, matches all source ports
rate_limit = 0               # Rate limit (bps), 0 = unlimited
burst_limit = 0              # Maximum burst bandwidth (bps)
stateful = true              # Enable connection tracking
```

---

## 🧪 Common Use Case Examples

### Use Case 1: Minimal Security Group - "Same Secret Allows Access"

**Goal**: Implement a private network where devices with the same secret can communicate; devices without the secret cannot join.

**Configuration**:

```yaml
[acl.acl_v1.group]
members = ["my-net"]  # All devices join the same group

[[acl.acl_v1.group.declares]]
group_name = "my-net"
group_secret = "my-net-secret-key"  # All devices use the same secret

[[acl.acl_v1.chains]]
name = "default_inbound"
chain_type = 1
enabled = true
default_action = 2  # Deny by default

# Core rule: Allow all communication within the group
[[acl.acl_v1.chains.rules]]
name = "allow_whole_group"
description = "Allow all traffic within the group"
priority = 1000
action = 1
source_groups = ["my-net"]      # Source is a group member
destination_groups = ["my-net"] # Destination is a group member
protocol = 1
enabled = true
```

---

### Use Case 2: Three-Tier Network Architecture

**Goal**: Simulate a classic Web-DB architecture, only allowing web servers to access specific ports on the database.

**Node Configuration**:

- Web Server: `members = ["web"]`
- Database Server: `members = ["db"]`
- Admin Machine: `members = ["admin"]`

**ACL Rules on the Database Server**:

```yaml
[[acl.acl_v1.chains]]
name = "db_server_policy"
chain_type = 1
enabled = true
default_action = 2  # Deny all connections by default

# Rule 1: Allow web servers to access the database port
[[acl.acl_v1.chains.rules]]
name = "allow_web_to_mysql"
description = "Allow the web group to access MySQL"
priority = 100
action = 1
source_groups = ["web"]
destination_groups = ["db"]  # Target is this machine (db group)
protocol = 1
ports = ["3306"]  # Only open MySQL port
enabled = true

# Rule 2: Allow admins access to all ports (e.g., for management)
[[acl.acl_v1.chains.rules]]
name = "allow_admin_to_all"
description = "Allow administrators access to all services"
priority = 110  # Higher priority than the previous rule
action = 1
source_groups = ["admin"]
destination_groups = ["db"]  # Target is this machine (db group)
protocol = 1
enabled = true
```

---

## ✅ Best Practices and Notes

1.  **Secret Management**:
    - **Importance**: `group_secret` is the foundation of security. If leaked, attackers can freely join your network.
    - **Recommendation**: Use a password generator to create long and complex secrets, and rotate them periodically.
    - **Secure Storage**: Do not commit the configuration file to public code repositories.

2.  **Configuration Consistency**:
    - Ensure the `[[acl.acl_v1.group.declares]]` section is completely consistent (same group names and secrets) across all nodes in the network. Otherwise, group verification will fail, and the network will not function correctly.

3.  **Debugging Tips**:
    - Start with a relaxed policy (`default_action = 1`) and use logs to confirm network connectivity.
    - Gradually add deny rules (`action = 2`) to restrict access.
    - Finally, change the `default_action` to deny (`2`) to implement a "whitelist" model.
    - Make full use of the `description` field to add clear comments for each rule, facilitating future maintenance.
    - The `easytier-cli acl stats` command can be used to view ACL statistics.

4.  **Operation Order**:
    - After modifying ACL configuration, the Easytier process usually needs to be restarted to take effect.
    - Commands like `easytier-core -d --tcp-whitelist port number` can automatically generate simple port whitelist rules, which can serve as a starting point for learning.

---

We hope this document helps you better understand and use Easytier's ACL features! If you have any questions, welcome to discuss them in the community. 🎉