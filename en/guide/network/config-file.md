# Configuration File

You can specify the configuration file path using the -c parameter.

```sh
easytier-core -c ./config.yaml
```

::: warning Note
Note: The configuration file has a higher priority. When a configuration file is specified at runtime, all other command line parameters except `-c` will be ignored and only the configuration file will take effect.
:::

Running with parameters can generate a configuration file with the corresponding parameters. The configuration file will be printed in the command line, and you can manually copy and save it as a toml file.

Running `easytier-core` directly without parameters will generate the minimal configuration file.

## Configuration File Generator

The official website provides a configuration file generator, which you can access via <a target="_blank" href="https://easytier.cn/web/index.html#config_generator">Configuration File Generator</a> to generate configuration files.
