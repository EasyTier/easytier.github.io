# 协议介绍

## 什么是 RPC

RPC（Remote Procedure Call，远程过程调用）是一种允许程序调用另一个地址空间（通常是网络上的另一台机器）中的过程或函数的技术。EasyTier 提供了基于 TCP 的 RPC 接口，允许开发者通过编程方式控制和管理 EasyTier 节点。

## 适用场景

RPC 接口适用于以下场景：

- **自动化运维**：批量管理多个 EasyTier 节点
- **集成开发**：将 EasyTier 功能集成到自己的应用程序中
- **监控系统**：实时获取节点状态和网络信息
- **自定义管理工具**：开发个性化的网络管理界面

## 通信协议

### 基本信息

| 项目 | 说明 |
|------|------|
| 默认端口 | 15888-15899（动态选择空闲端口） |
| 传输协议 | TCP |
| 应用层协议 | ZCPacket（自定义协议） |
| 序列化 | Protobuf |
| 分片 | 支持 |
| 压缩支持 | Zstd |

::: tip 端口配置
- **默认行为**：EasyTier 会在 15888-15899 范围内自动选择空闲端口
- **指定端口**：使用 `--rpc-portal` 参数或环境变量 `ET_RPC_PORTAL` 指定固定端口
- **示例**：`easytier-core --rpc-portal 11224` 或设置 `ET_RPC_PORTAL=11224`
:::

### 协议结构

EasyTier RPC 使用自定义的 `ZCPacket` 协议进行数据传输，由三层组成：

```
+-------------------+
| TCPTunnelHeader   |  4 字节
+-------------------+
| PeerManagerHeader |  16 字节
+-------------------+
| RpcPacket         |  RPC 数据包
+-------------------+
```

<details>
<summary>TCPTunnelHeader 详情 (4字节)</summary>

TCP 隧道头部，用于标识整个数据包的长度。

| 字段 | 类型 | 说明 |
|------|------|------|
| length | u32 (LE) | 后续数据的总长度（不含 TCPTunnelHeader 自身） |

</details>

<details>
<summary>PeerManagerHeader 详情 (16字节)</summary>

对等体管理头部，用于路由和数据包分类。

| 字段 | 类型 | 说明 |
|------|------|------|
| from_peer_id | u32 (LE) | 发送方节点 ID |
| to_peer_id | u32 (LE) | 接收方节点 ID |
| packet_type | u8 | 数据包类型（8=RPC 请求，9=RPC 响应） |
| flags | u8 | 标志位 |
| forward_counter | u8 | 转发计数器 |
| reserved | u8 | 保留字段 |
| length | u32 (LE) | RpcPacket 的长度 |

</details>

<details>
<summary>RpcPacket 详情</summary>

RPC 数据包，包含完整的 RPC 调用信息。

| 字段 | 类型 | 说明 |
|------|------|------|
| from_peer | u32 | 发送方节点 ID |
| to_peer | u32 | 接收方节点 ID |
| transaction_id | i64 | 事务 ID，用于匹配请求和响应 |
| descriptor | RpcDescriptor | 服务描述符 |
| body | bytes | 请求/响应数据 |
| is_request | bool | 是否为请求 |
| total_pieces | u32 | 分片总数 |
| piece_idx | u32 | 当前分片索引 |
| trace_id | i32 | 追踪 ID |
| compression_info | RpcCompressionInfo | 压缩信息 |

**RpcDescriptor 服务描述符**：

| 字段 | 类型 | 说明 |
|------|------|------|
| domain_name | string | 域名（通常为 ""） |
| proto_name | string | Proto 名称（目前写服务名称） |
| service_name | string | 服务名称 |
| method_index | u32 | 方法索引 |

</details>

### 服务调用说明

EasyTier 将其提供的能力称为**服务（Service）**，服务按功能分类。每个服务包含一个或多个方法。

调用具体能力需要传递：
- **service_name**：服务名称（如 "PeerManageRpc"）
- **method_index**：方法索引

::: warning 重要提示
**method_index 从 1 开始**，不是从 0 开始！
:::

完整的服务列表和方法定义，请查看 [方法列表](./method-tables.md) 或源码 `easytier/src/proto/` 目录下的 proto 文件。

### 请求与响应

<details>
<summary>RpcRequest 请求体结构</summary>

body 字段存放的是 RpcRequest 序列化后的数据。

| 字段 | 类型 | 说明 |
|------|------|------|
| request | bytes | 实际的请求数据（各服务的 Request 消息序列化） |
| timeout_ms | i32 | 超时时间（毫秒） |

</details>

<details>
<summary>RpcResponse 响应体结构</summary>

响应时 body 字段存放的是 RpcResponse 序列化后的数据。

| 字段 | 类型 | 说明 |
|------|------|------|
| response | bytes | 实际的响应数据（各服务的 Response 消息序列化） |
| error | Error | 错误信息 |
| runtime_us | u64 | 执行时间（微秒） |

</details>

### 数据构造流程

1. 根据方法找到对应的 Request 消息定义（参考 [方法列表](./method-tables.md)）
2. 从 `easytier/src/proto/` 目录下的 proto 文件获取并生成代码
3. 创建 Request 对象并设置字段值
4. 序列化请求，包装到 RpcRequest 中
5. 发送请求并解析响应

完整 Python 示例请参考 [Python 示例](./python-example.md)。