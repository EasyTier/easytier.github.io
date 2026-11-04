# aaPanel / 宝塔面板 EasyTier 插件

EasyTier Manager 是一款专为 [aaPanel](https://www.aapanel.com/) / 宝塔面板 打造的插件，让您可以在熟悉的面板界面中，一键完成 [EasyTier](https://github.com/EasyTier/EasyTier) 组网工具的下载、配置、启停与监控。

- **图形化操作** - 无需记忆命令，所有操作在面板中点击完成
- **服务端组网** - 让您的服务器轻松加入 EasyTier 虚拟网络
- **配置编辑** - 在面板中直接编辑 `config.toml`，保存即生效
- **日志查看** - 实时查看 EasyTier 运行日志，快速定位问题

## 功能特性

- **一键下载安装** - 自动从 GitHub 下载 EasyTier 并解压部署到 `/opt/easytier`
- **配置管理** - 在面板中直接编辑 `config.toml` 配置文件，可视化保存
- **服务控制** - 一键启动 / 停止 EasyTier 服务，以 nohup 方式后台运行
- **日志查看** - 实时查看 EasyTier 运行日志（最近 100 行）
- **状态监控** - 随时查看 EasyTier 运行状态
- **自动依赖检测** - 安装脚本自动检测并安装 `wget`、`unzip`
- **生命周期管理** - 提供完整的安装 / 卸载脚本，干净利落

## 系统要求

- **操作系统**: Linux (x86_64)
- **面板环境**: aaPanel / 宝塔 Linux 面板
- **系统依赖**: `wget`、`unzip`（安装脚本会自动检测并安装）

## 安装方式

### 方式一：通过插件目录安装（推荐）

1. 在 `面板地址/soft/other` 导入插件，上传[发行版](https://gitee.com/yalicdy/aa-panel-easytier/releases/download/%E6%AD%A3%E5%BC%8F%E7%89%88/easytier_bt.zip)
2. 在插件商店中查看已安装的插件列表，找到 **EasyTier Manager**
3. 点击安装即可

### 方式二：手动安装

```bash
# 1. 创建插件目录
mkdir -p /www/server/panel/plugin/easytier_manager

# 2. 复制文件
cp easytier_manager_main.py /www/server/panel/plugin/easytier_manager/
cp index.html               /www/server/panel/plugin/easytier_manager/
cp info.json                /www/server/panel/plugin/easytier_manager/
cp install.sh               /www/server/panel/plugin/easytier_manager/
cp config.toml              /www/server/panel/plugin/easytier_manager/

# 3. 执行安装脚本
bash /www/server/panel/plugin/easytier_manager/install.sh install
```

## 使用说明

安装完成后，在 aaPanel 面板左侧菜单栏中找到 **EasyTier 管理器**，即可进入管理页面。

### 操作流程

1. **下载安装** - 点击「下载安装」按钮，插件会自动下载并解压 EasyTier 到 `/opt/easytier` 目录
2. **编辑配置** - 在文本框中编辑 `config.toml` 配置文件，点击「保存配置」
3. **启动服务** - 点击「启动服务」按钮，EasyTier 将以 nohup 方式在后台运行
4. **查看日志** - 点击「刷新日志」查看运行状态

### 配置文件示例

见easytier官方文档。

更多配置项请参考 [配置文件](/guide/network/config-file) 和 [完整配置选项](/guide/network/configurations)。

## 目录结构

```
/www/server/panel/plugin/easytier_manager/
├── easytier_manager_main.py   # 插件后端逻辑
├── index.html                 # 前端管理页面
├── info.json                  # 插件信息
├── install.sh                 # 安装/卸载脚本
└── config.toml                # 默认配置文件
```

| 文件 | 说明 |
|------|------|
| `easytier_manager_main.py` | Python 后端，处理安装、配置、启停、日志等 API 请求 |
| `index.html` | 前端管理界面，提供可视化操作按钮和配置编辑区 |
| `info.json` | 插件元信息，包含名称、版本、作者等 |
| `install.sh` | 安装/卸载脚本，用于插件生命周期管理 |
| `config.toml` | EasyTier 默认配置文件模板 |

## 常见问题



1. 在 aaPanel 插件商店中卸载 EasyTier Manager
2. 或手动执行：`bash /www/server/panel/plugin/easytier_manager/install.sh uninstall`
3. 如需彻底清理，请手动删除 `/opt/easytier` 目录

## 开源协议

本项目采用 **MIT** 协议开源，欢迎自由使用、修改和分发。

## 相关链接

- [EasyTier GitHub](https://github.com/EasyTier/EasyTier)
- [aaPanel 官网](https://www.aapanel.com/)
- [插件仓库 Gitee](https://gitee.com/yalicdy/aa-panel-easytier)
