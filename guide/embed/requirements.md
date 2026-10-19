# 使用环境要求

## 软件环境

| 项目 | 要求 |
| --- | --- |
| ESP-IDF | **6.1.x**（已验证）；组件声明 `>=6.1`，未验证版本不承诺行为一致 |
| C++ 标准 | C++20 |
| 目标芯片 | **ESP32-S3**（当前只在 N16R8 模组验证） |
| Flash | 示例使用 16 MB 模组；具体固件占用以实际构建为准 |
| PSRAM | **强烈建议开启** |

组件源码关闭异常与 RTTI；组件实现依赖 `esp_netif`、`lwip`、`freertos`、`mbedtls`（PSA Crypto）。

## 内存要求

| 项目 | 量级 | 说明 |
| --- | --- | --- |
| 单实例常驻 | 约 **100 KiB** | 组件运行上下文 |
| 每条Peer连接 | 约 12 KiB | 默认最多 6 条 |
| 任务栈 | 约 24 KiB | 组件任务合计，可通过 Kconfig 调整 |
| 队列/缓冲 | 数十 KiB | 与队列深度配置相关 |

以上是量级，不是硬性承诺；实际占用以构建日志和运行时测量为准。**建议开启 PSRAM**，否则默认配置很容易在分配阶段失败。

## Socket 与主任务栈

示例把以下两项写入 `sdkconfig.defaults`：

```ini
CONFIG_LWIP_MAX_SOCKETS=24
CONFIG_ESP_MAIN_TASK_STACK_SIZE=8192
```

- `LWIP_MAX_SOCKETS`：默认 10 不一定足够 Peer 的入口连接 + 应用 socket + lwIP 内部占用；
- `MAIN_TASK_STACK_SIZE`：TOML 解析与 `Inst` 构造在调用者任务栈上执行，建议至少 8 KiB。

如果你在其他任务里构造 `et::Inst`，也要保证该任务栈足够，并用 `uxTaskGetStackHighWaterMark()` 核对余量。


## 已经验证的组合

- ESP32-S3-N16R8 模组
- ESP-IDF 6.1
- EasyTier 2.6.4 ~ 2.7.0

其余版本并非“明确不支持”，而是**没有验证**。用于生产前请自行完成构建、真机联调与稳定性测试。