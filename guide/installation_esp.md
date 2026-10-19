# 安装 Espressif 组件

**EasyTier-ESP** 是一个基于 EasyTier 组网协议的 C++ 轻量级实现，可在 ESP-IDF 中作为组件导入。

:::warning
EasyTier-ESP 现在为预览版本，仅实现了部分基础功能，接口在今后可能出现变更，且可能存在未知问题，请慎用于生产环境。
:::

## 通过 ESP-IDF 组件注册表导入

在应用的 `main/idf_component.yml` 中加入依赖：

```yaml
dependencies:
  myqfeng/easytier-esp: "^0.0.1"
  idf: ">=6.1"
```

或者用命令：

```bash
idf.py add-dependency "myqfeng/easytier-esp^0.0.1"
idf.py build
```

构建时组件会被下载到工程的 `managed_components/` 下。

## 本地源码导入

- 把 `components/easytier-esp` 拷贝或软链到应用的 `components/` 目录；或
- 在工程顶层 `CMakeLists.txt` 把本仓库的 `components` 目录加入 `EXTRA_COMPONENT_DIRS`。

然后在应用组件的 `CMakeLists.txt` 里声明依赖：

```cmake
idf_component_register(
    SRCS "main.cpp"
    INCLUDE_DIRS "."
    REQUIRES easytier-esp
)
```