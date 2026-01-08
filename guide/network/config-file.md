# 配置文件

支持使用 -c 参数指定配置文件路径。

```sh
easytier-core -c ./config.yaml
```

::: warning 注意
注意：配置文件中的参数可以被命令行覆盖，比如配置文件中指定了 `--hostname abc`，但在命令行中使用 `--hostname xyz`，则会使用命令行中的主机名参数 `xyz`。
:::

使用参数运行可以获得对应参数的配置文件。配置文件会打印在命令行中，可以手动复制对应配置保存为toml文件即可。

在不使用参数的情况下直接运行 `easytier-core` 可以获得最小配置文件。

## 多配置文件启动

可以通过 `-c` 参数指定多个配置文件，EasyTier 会在一个进程中加载多个配置文件并启动多个虚拟网络。

```sh
easytier-core -c ./config1.yaml -c ./config2.yaml
```

## 配置文件生成工具

官网提供了配置文件生成工具，可以通过访问 <a target="_blank" href="https://easytier.cn/web/index.html#config_generator">配置文件生成工具</a> 来生成配置文件。
