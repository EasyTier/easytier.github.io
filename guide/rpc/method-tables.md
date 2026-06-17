# 方法列表
参考

本文档介绍 EasyTier RPC 接口中使用的所有服务(方法)定义。

**源码路径**：`easytier/src/proto/`

## Proto 文件列表

| 文件 | 说明 |
|------|------|
| `api_instance.proto` | 主要 RPC 服务（对等体、路由、连接器管理等） |
| `api_config.proto` | 配置管理（ConfigRpc） |
| `api_manage.proto` | 网络实例管理（WebClient 服务） |
| `api_logger.proto` | 日志配置管理（LoggerRpc） |
| `magic_dns.proto` | Magic DNS 管理（MagicDnsServerRpc） |
| `peer_rpc.proto` | 对等体底层 RPC（OSPF、穿透等） |
| `acl.proto` | ACL 规则管理 |
| `common.proto` | 通用数据类型定义 |
| `error.proto` | 错误类型定义 |

---

## PeerManageRpc 服务

对等体和路由管理的核心服务。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| ListPeer | 1 | 列出所有对等体 |
| ListRoute | 2 | 列出所有路由 |
| DumpRoute | 3 | 导出路由表 |
| ListForeignNetwork | 4 | 列出外部网络 |
| ListGlobalForeignNetwork | 5 | 列出全局外部网络 |
| ShowNodeInfo | 6 | 显示节点信息 |
| GetForeignNetworkSummary | 7 | 获取外部网络摘要 |

### ListPeer

获取当前节点连接的所有对等体信息。

```protobuf
message ListPeerRequest {
  InstanceIdentifier instance = 1;
}

message ListPeerResponse {
  repeated PeerInfo peer_infos = 1;
  NodeInfo my_info = 2;
}

message PeerInfo {
  uint32 peer_id = 1;
  repeated PeerConnInfo conns = 2;
  common.UUID default_conn_id = 3;
  repeated common.UUID directly_connected_conns = 4;
}

message PeerConnInfo {
  string conn_id = 1;
  uint32 my_peer_id = 2;
  uint32 peer_id = 3;
  repeated string features = 4;
  common.TunnelInfo tunnel = 5;
  PeerConnStats stats = 6;
  float loss_rate = 7;
  bool is_client = 8;
  string network_name = 9;
  bool is_closed = 10;
}

message PeerConnStats {
  uint64 rx_bytes = 1;
  uint64 tx_bytes = 2;
  uint64 rx_packets = 3;
  uint64 tx_packets = 4;
  uint64 latency_us = 5;
}
```

### ListRoute

获取路由表信息。

```protobuf
message ListRouteRequest {
  InstanceIdentifier instance = 1;
}

message ListRouteResponse {
  repeated Route routes = 1;
}

message Route {
  uint32 peer_id = 1;
  common.Ipv4Inet ipv4_addr = 2;
  uint32 next_hop_peer_id = 3;
  int32 cost = 4;
  int32 path_latency = 11;
  repeated string proxy_cidrs = 5;
  string hostname = 6;
  common.StunInfo stun_info = 7;
  string inst_id = 8;
  string version = 9;
  common.PeerFeatureFlag feature_flag = 10;
  optional uint32 next_hop_peer_id_latency_first = 12;
  optional int32 cost_latency_first = 13;
  optional int32 path_latency_latency_first = 14;
  common.Ipv6Inet ipv6_addr = 15;
}
```

### ShowNodeInfo

获取当前节点的详细信息。

```protobuf
message ShowNodeInfoRequest {
  InstanceIdentifier instance = 1;
}

message ShowNodeInfoResponse {
  NodeInfo node_info = 1;
}

message NodeInfo {
  uint32 peer_id = 1;
  string ipv4_addr = 2;
  repeated string proxy_cidrs = 3;
  string hostname = 4;
  common.StunInfo stun_info = 5;
  string inst_id = 6;
  repeated string listeners = 7;
  string config = 8;
  string version = 9;
  common.PeerFeatureFlag feature_flag = 10;
  peer_rpc.GetIpListResponse ip_list = 11;
}
```

### DumpRoute

导出路由表的详细信息，返回字符串格式。

```protobuf
message DumpRouteRequest {
  InstanceIdentifier instance = 1;
}

message DumpRouteResponse {
  string result = 1;
}
```

### ListForeignNetwork

列出本节点所连接的外部网络信息。

```protobuf
message ListForeignNetworkRequest {
  InstanceIdentifier instance = 1;
  bool include_trusted_keys = 2;
}

enum TrustedKeySourcePb {
  TRUSTED_KEY_SOURCE_PB_UNSPECIFIED = 0;
  TRUSTED_KEY_SOURCE_PB_OSPF_NODE = 1;
  TRUSTED_KEY_SOURCE_PB_OSPF_CREDENTIAL = 2;
}

message TrustedKeyInfoPb {
  bytes pubkey = 1;
  TrustedKeySourcePb source = 2;
  optional int64 expiry_unix = 3;
}

message ForeignNetworkEntryPb {
  repeated PeerInfo peers = 1;
  bytes network_secret_digest = 2;
  uint32 my_peer_id_for_this_network = 3;
  repeated TrustedKeyInfoPb trusted_keys = 4;
}

message ListForeignNetworkResponse {
  // foreign network in local
  map<string, ForeignNetworkEntryPb> foreign_networks = 1;
}
```

### ListGlobalForeignNetwork

列出整个网络中的外部网络信息。

```protobuf
message ListGlobalForeignNetworkRequest {
  InstanceIdentifier instance = 1;
}

message ListGlobalForeignNetworkResponse {
  // foreign network in the entire network
  message OneForeignNetwork {
    string network_name = 1;
    repeated uint32 peer_ids = 2;
    string last_updated = 3;
    uint32 version = 4;
  }

  message ForeignNetworks {
    repeated OneForeignNetwork foreign_networks = 1;
  }

  map<uint32, ForeignNetworks> foreign_networks = 1;
}
```

### GetForeignNetworkSummary

获取外部网络的摘要信息。

```protobuf
message GetForeignNetworkSummaryRequest {
  InstanceIdentifier instance = 1;
}

message GetForeignNetworkSummaryResponse {
  peer_rpc.RouteForeignNetworkSummary summary = 1;
}
```

---

## ConnectorManageRpc 服务

管理与其他节点的连接。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| ListConnector | 1 | 列出连接器 |

### ListConnector

列出所有连接器。

```protobuf
message ListConnectorRequest {
  InstanceIdentifier instance = 1;
}

message ListConnectorResponse {
  repeated Connector connectors = 1;
}

message Connector {
  common.Url url = 1;
  ConnectorStatus status = 2;
}

enum ConnectorStatus {
  CONNECTED = 0;
  DISCONNECTED = 1;
  CONNECTING = 2;
}
```

---

## MappedListenerManageRpc 服务

映射监听器管理。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| ListMappedListener | 1 | 列出映射监听器 |

### ListMappedListener

列出所有映射监听器。

```protobuf
message MappedListener {
  common.Url url = 1;
}

message ListMappedListenerRequest {
  InstanceIdentifier instance = 1;
}

message ListMappedListenerResponse {
  repeated MappedListener mappedlisteners = 1;
}
```

---

## VpnPortalRpc 服务

VPN 门户信息管理。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| GetVpnPortalInfo | 1 | 获取 VPN 门户信息 |

```protobuf
message GetVpnPortalInfoRequest {
  InstanceIdentifier instance = 1;
}

message GetVpnPortalInfoResponse {
  VpnPortalInfo vpn_portal_info = 1;
}

message VpnPortalInfo {
  string vpn_type = 1;
  string client_config = 2;
  repeated string connected_clients = 3;
}
```

---

## TcpProxyRpc 服务

TCP 代理管理。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| ListTcpProxyEntry | 1 | 列出 TCP 代理条目 |

```protobuf
message ListTcpProxyEntryRequest {
  InstanceIdentifier instance = 1;
}

message ListTcpProxyEntryResponse {
  repeated TcpProxyEntry entries = 1;
}

message TcpProxyEntry {
  common.SocketAddr src = 1;
  common.SocketAddr dst = 2;
  uint64 start_time = 3;
  TcpProxyEntryState state = 4;
  TcpProxyEntryTransportType transport_type = 5;
}

enum TcpProxyEntryTransportType {
  TCP = 0;
  KCP = 1;
  QUIC = 2;
}
```

---

## AclManageRpc 服务

ACL 规则管理。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| GetAclStats | 1 | 获取 ACL 统计 |
| GetWhitelist | 2 | 获取白名单 |

```protobuf
message GetAclStatsRequest {
  InstanceIdentifier instance = 1;
}

message GetAclStatsResponse {
  acl.AclStats acl_stats = 1;
}

message GetWhitelistRequest {
  InstanceIdentifier instance = 1;
}

message GetWhitelistResponse {
  repeated string tcp_ports = 1;
  repeated string udp_ports = 2;
}
```

---

## PortForwardManageRpc 服务

端口转发管理。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| ListPortForward | 1 | 列出端口转发 |

```protobuf
message ListPortForwardRequest {
  InstanceIdentifier instance = 1;
}

message ListPortForwardResponse {
  repeated common.PortForwardConfigPb cfgs = 1;
}
```

---

## StatsRpc 服务

统计信息获取。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| GetStats | 1 | 获取统计信息 |
| GetPrometheusStats | 2 | 获取 Prometheus 格式统计 |

```protobuf
message GetStatsRequest {
  InstanceIdentifier instance = 1;
}

message GetStatsResponse {
  repeated MetricSnapshot metrics = 1;
}

message MetricSnapshot {
  string name = 1;
  uint64 value = 2;
  map<string, string> labels = 3;
}

message GetPrometheusStatsRequest {
  InstanceIdentifier instance = 1;
}

message GetPrometheusStatsResponse {
  string prometheus_text = 1;
}
```

---

## CredentialManageRpc 服务

凭证管理。

**服务定义**：`api_instance.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| GenerateCredential | 1 | 生成凭证 |
| RevokeCredential | 2 | 撤销凭证 |
| ListCredentials | 3 | 列出凭证 |

### GenerateCredential

生成新的凭证。

```protobuf
message GenerateCredentialRequest {
  repeated string groups = 1;   // optional: ACL groups for this credential
  bool allow_relay = 2;         // optional: allow relay through credential node
  repeated string allowed_proxy_cidrs = 3; // optional: restrict proxy_cidrs
  int64 ttl_seconds = 4;        // must be > 0: credential TTL in seconds (0 / omitted is invalid)
  optional string credential_id = 5; // optional: user-specified credential id, reused if already exists
  InstanceIdentifier instance = 6;   // target network instance
}

message GenerateCredentialResponse {
  string credential_id = 1;       // UUID
  string credential_secret = 2;   // private key base64
}
```

### RevokeCredential

撤销指定凭证。

```protobuf
message RevokeCredentialRequest {
  string credential_id = 1;
  InstanceIdentifier instance = 2;   // target network instance
}

message RevokeCredentialResponse {
  bool success = 1;
}
```

### ListCredentials

列出所有凭证信息。

```protobuf
message ListCredentialsRequest {
  InstanceIdentifier instance = 1;   // target network instance
}

message CredentialInfo {
  string credential_id = 1;       // UUID
  repeated string groups = 2;
  bool allow_relay = 3;
  int64 expiry_unix = 4;
  repeated string allowed_proxy_cidrs = 5;
}

message ListCredentialsResponse {
  repeated CredentialInfo credentials = 1;
}
```

---

## WebClientService 服务

网络实例管理服务。

**服务定义**：`api_manage.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| ValidateConfig | 1 | 验证配置 |
| RunNetworkInstance | 2 | 运行网络实例 |
| RetainNetworkInstance | 3 | 保留网络实例 |
| CollectNetworkInfo | 4 | 收集网络信息 |
| ListNetworkInstance | 5 | 列出网络实例 |
| DeleteNetworkInstance | 6 | 删除网络实例 |
| GetNetworkInstanceConfig | 7 | 获取网络实例配置 |
| ListNetworkInstanceMeta | 8 | 列出网络实例元数据 |

### ValidateConfig

验证网络配置是否有效。

```protobuf
message ValidateConfigRequest {
  NetworkConfig config = 1;
}

message ValidateConfigResponse {
  string toml_config = 1;
}
```

### RunNetworkInstance

运行一个新的网络实例。

```protobuf
message RunNetworkInstanceRequest {
  common.UUID inst_id = 1;
  NetworkConfig config = 2;
  bool overwrite = 3;
}

message RunNetworkInstanceResponse {
  common.UUID inst_id = 1;
}
```

### RetainNetworkInstance

保留指定的网络实例，删除其他实例。

```protobuf
message RetainNetworkInstanceRequest {
  repeated common.UUID inst_ids = 1;
}

message RetainNetworkInstanceResponse {
  repeated common.UUID remain_inst_ids = 1;
}
```

### CollectNetworkInfo

收集网络实例的运行信息。

```protobuf
message CollectNetworkInfoRequest {
  repeated common.UUID inst_ids = 1;
}

message CollectNetworkInfoResponse {
  NetworkInstanceRunningInfoMap info = 1;
}

message NetworkInstanceRunningInfo {
  string dev_name = 1;
  MyNodeInfo my_node_info = 2;
  repeated string events = 3;
  repeated api.instance.Route routes = 4;
  repeated api.instance.PeerInfo peers = 5;
  repeated api.instance.PeerRoutePair peer_route_pairs = 6;
  bool running = 7;
  optional string error_msg = 8;
  peer_rpc.RouteForeignNetworkSummary foreign_network_summary = 9;
}

message NetworkInstanceRunningInfoMap {
  map<string, NetworkInstanceRunningInfo> map = 1;
}

message MyNodeInfo {
  common.Ipv4Inet virtual_ipv4 = 1;
  string hostname = 2;
  string version = 3;
  peer_rpc.GetIpListResponse ips = 4;
  common.StunInfo stun_info = 5;
  repeated common.Url listeners = 6;
  optional string vpn_portal_cfg = 7;
  uint32 peer_id = 8;
}
```

### ListNetworkInstance

列出所有网络实例的 ID。

```protobuf
message ListNetworkInstanceRequest {}

message ListNetworkInstanceResponse {
  repeated common.UUID inst_ids = 1;
}
```

### DeleteNetworkInstance

删除指定的网络实例。

```protobuf
message DeleteNetworkInstanceRequest {
  repeated common.UUID inst_ids = 1;
}

message DeleteNetworkInstanceResponse {
  repeated common.UUID remain_inst_ids = 1;
}
```

### GetNetworkInstanceConfig

获取指定网络实例的配置。

```protobuf
message GetNetworkInstanceConfigRequest {
  common.UUID inst_id = 1;
}

message GetNetworkInstanceConfigResponse {
  NetworkConfig config = 1;
}
```

### ListNetworkInstanceMeta

列出网络实例的元数据。

```protobuf
message ListNetworkInstanceMetaRequest {
  repeated common.UUID inst_ids = 1;
}

message NetworkMeta {
  common.UUID inst_id = 1;
  string network_name = 2;
  uint32 config_permission = 3;
  string instance_name = 4;
}

message ListNetworkInstanceMetaResponse {
  repeated NetworkMeta metas = 1;
}
```

---

## ConfigRpc 服务

配置管理服务。

**服务定义**：`api_config.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| PatchConfig | 1 | 修补配置 |
| GetConfig | 2 | 获取配置 |

### PatchConfig

动态修补网络实例配置。

```protobuf
enum ConfigPatchAction {
  ADD = 0;
  REMOVE = 1;
  CLEAR = 2;
}

message InstanceConfigPatch {
  optional string hostname = 1;
  optional common.Ipv4Inet ipv4 = 2;
  optional common.Ipv6Inet ipv6 = 3;
  repeated PortForwardPatch port_forwards = 4;
  optional AclPatch acl = 5;
  repeated ProxyNetworkPatch proxy_networks = 6;
  repeated RoutePatch routes = 7;
  repeated ExitNodePatch exit_nodes = 8;
  repeated UrlPatch mapped_listeners = 9;
  repeated UrlPatch connectors = 10;
}

message PortForwardPatch {
  ConfigPatchAction action = 1;
  common.PortForwardConfigPb cfg = 2;
}

message StringPatch {
  ConfigPatchAction action = 1;
  string value = 2;
}

message UrlPatch {
  ConfigPatchAction action = 1;
  common.Url url = 2;
}

message AclPatch {
  optional acl.Acl acl = 1;
  repeated StringPatch tcp_whitelist = 2;
  repeated StringPatch udp_whitelist = 3;
}

message ProxyNetworkPatch {
  ConfigPatchAction action = 1;
  common.Ipv4Inet cidr = 2;
  optional common.Ipv4Inet mapped_cidr = 3;
}

message RoutePatch {
  ConfigPatchAction action = 1;
  common.Ipv4Inet cidr = 2;
}

message ExitNodePatch {
  ConfigPatchAction action = 1;
  common.IpAddr node = 2;
}

message PatchConfigRequest {
  InstanceConfigPatch patch = 1;
  api.instance.InstanceIdentifier instance = 2;
}

message PatchConfigResponse {}
```

### GetConfig

获取当前网络实例的完整配置。

```protobuf
message GetConfigRequest {
  api.instance.InstanceIdentifier instance = 1;
}

message GetConfigResponse {
  NetworkConfig config = 1;
}
```

---

## MagicDnsServerRpc 服务

Magic DNS 服务端 RPC。

**服务定义**：`magic_dns.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| Handshake | 1 | 握手 |
| Heartbeat | 2 | 心跳 |
| UpdateDnsRecord | 3 | 更新 DNS 记录 |
| GetDnsRecord | 4 | 获取 DNS 记录 |

### Handshake

与 DNS 服务器建立连接握手。

```protobuf
message HandshakeRequest {}

message HandshakeResponse {}
```

### Heartbeat

发送心跳保持连接活跃。

```protobuf
rpc Heartbeat(common.Void) returns (common.Void);
```

### UpdateDnsRecord

更新 DNS 记录。

```protobuf
message DnsRecordA {
  string name = 1;
  common.Ipv4Addr value = 2;
  int32 ttl = 3;
}

message DnsRecordSOA {
  string name = 1;
  string value = 2;
}

message DnsRecord {
  oneof record {
    DnsRecordA a = 1;
    DnsRecordSOA soa = 2;
  }
}

message DnsRecordList {
  repeated DnsRecord records = 1;
}

message UpdateDnsRecordRequest {
  string zone = 1;
  repeated api.instance.Route routes = 2;
}
```

### GetDnsRecord

获取当前 DNS 记录。

```protobuf
message GetDnsRecordResponse {
  map<string, DnsRecordList> records = 1;
}
```

---

## LoggerRpc 服务

日志配置管理服务。

**服务定义**：`api_logger.proto`

### 方法列表

| 方法 | 索引 | 说明 |
|------|------|------|
| SetLoggerConfig | 1 | 设置日志配置 |
| GetLoggerConfig | 2 | 获取日志配置 |

### SetLoggerConfig

设置日志级别配置。

```protobuf
enum LogLevel {
  DISABLED = 0;
  ERROR = 1;
  WARNING = 2;
  INFO = 3;
  DEBUG = 4;
  TRACE = 5;
}

message SetLoggerConfigRequest {
  LogLevel level = 1;
}

message SetLoggerConfigResponse {}
```

### GetLoggerConfig

获取当前日志配置。

```protobuf
message GetLoggerConfigRequest {}

message GetLoggerConfigResponse {
  LogLevel level = 1;
}
```

---

## 常用数据类型

### InstanceIdentifier

实例标识符，用于指定目标网络实例。

```protobuf
message InstanceIdentifier {
  message InstanceSelector {
    optional string name = 1;
  }

  oneof selector {
    common.UUID id = 1;
    InstanceSelector instance_selector = 2;
  }
}
```

### common.Ipv4Inet

```protobuf
message Ipv4Inet {
  Ipv4Addr address = 1;
  uint32 network_length = 2;
}

message Ipv4Addr {
  uint32 addr = 1;  // 网络字节序
}
```

### common.TunnelInfo

```protobuf
message TunnelInfo {
  string tunnel_type = 1;  // tcp, udp, ws, wss, wg, quic
  Url local_addr = 2;
  Url remote_addr = 3;
}
```

---

## 错误处理

RPC 调用可能返回以下错误（定义在 `error.proto`）：

```protobuf
message Error {
  oneof error_kind {
    OtherError other_error = 1;
    InvalidMethodIndex invalid_method_index = 2;
    InvalidService invalid_service = 3;
    ProstDecodeError prost_decode_error = 4;
    ProstEncodeError prost_encode_error = 5;
    ExecuteError execute_error = 6;
    MalformatRpcPacket malformat_rpc_packet = 7;
    Timeout timeout = 8;
  }
}