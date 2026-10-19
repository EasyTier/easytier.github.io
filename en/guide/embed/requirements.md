# Environment Requirements

## Software Environment

| Item | Requirement |
| --- | --- |
| ESP-IDF | **6.1.x** (verified); the component declares `>=6.1`; behavior consistency is not guaranteed for unverified versions |
| C++ standard | C++20 |
| Target chip | **ESP32-S3** (currently verified only on the N16R8 module) |
| Flash | The example uses a 16 MB module; actual firmware usage depends on the build |
| PSRAM | **Strongly recommended** |

The component source disables exceptions and RTTI; the component implementation depends on `esp_netif`, `lwip`, `freertos`, and `mbedtls` (PSA Crypto).

## Memory Requirements

| Item | Approximate size | Description |
| --- | --- | --- |
| Single instance resident | About **100 KiB** | Component runtime context |
| Per peer connection | About 12 KiB | 6 by default at most |
| Task stack | About 24 KiB | Total for component tasks; adjustable via Kconfig |
| Queues/buffers | Tens of KiB | Depends on the queue depth configuration |

The figures above are approximate, not hard guarantees; actual usage depends on build logs and runtime measurements. **PSRAM is recommended**, otherwise the default configuration may easily fail during allocation.

## Sockets and Main Task Stack

The example writes the following two settings to `sdkconfig.defaults`:

```ini
CONFIG_LWIP_MAX_SOCKETS=24
CONFIG_ESP_MAIN_TASK_STACK_SIZE=8192
```

- `LWIP_MAX_SOCKETS`: The default of 10 may not be enough for peer entry connections + application sockets + lwIP internal usage;
- `MAIN_TASK_STACK_SIZE`: TOML parsing and `Inst` construction run on the caller's task stack; at least 8 KiB is recommended.

If you construct `et::Inst` in another task, make sure that task's stack is large enough as well, and use `uxTaskGetStackHighWaterMark()` to check the remaining margin.


## Verified Combinations

- ESP32-S3-N16R8 module
- ESP-IDF 6.1
- EasyTier 2.6.4 ~ 2.7.0

Other versions are not "explicitly unsupported"; they are simply **unverified**. Before using in production, complete your own build, real-device integration testing, and stability testing.
