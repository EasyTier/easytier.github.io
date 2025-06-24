# 常见问题 {#faq}

---

**Q：Windows 7 无法创建网络，程序崩溃或者报错无法创建虚拟网？**

**A：** Windows 7 需为 SP1 及以上版本，并安装以下补丁：
- [KB3063858](https://www.microsoft.com/en-us/download/details.aspx?id=47409)
- [KB4474419](https://www.catalog.update.microsoft.com/search.aspx?q=KB4474419)

---

**Q：Linux 命令行帮助是英文，如何切换为中文？**

**A：** 设置环境变量 `LANG=zh_CN`，命令如下：

```bash
export LANG=zh_CN
```

---

**Q：启动后提示 TunError 怎么办？**

**A：** 请确认 TUN 驱动已正确加载，并且 `/dev/net/tun` 文件存在。如果在 Docker 中运行，请确保开启特权模式。Linux 下加载 TUN 驱动的命令如下：

```bash
modprobe tun
mkdir -p /dev/net
sudo mknod /dev/net/tun c 10 200
```

---

**Q：启动后报错 `Address already in use`？**

**A：** 可能是端口冲突。请检查 11010 端口或启动参数指定的端口（如 `-l tcp:12345`）是否被其他程序占用。

---
