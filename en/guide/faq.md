# Frequently Asked Questions {#faq}

---

**Q: Windows 7 cannot create a network, the program crashes or reports an error saying it cannot create a virtual network?**

**A:** Windows 7 requires SP1 or later versions, and the following patches must be installed:
- [KB3063858](https://www.microsoft.com/en-us/download/details.aspx?id=47409)
- [KB4474419](https://www.catalog.update.microsoft.com/search.aspx?q=KB4474419)

---

**Q: The Linux command-line help is in English, how can I switch to Chinese?**

**A:** Set the environment variable `LANG=zh_CN`. Use the following command:

```bash
export LANG=zh_CN
```

---

**Q: What should I do if TunError is displayed after startup?**

**A:** Please ensure that the TUN driver is correctly loaded and the `/dev/net/tun` file exists. If running in Docker, ensure privileged mode is enabled. The command to load the TUN driver on Linux is as follows:

```bash
modprobe tun
mkdir -p /dev/net
sudo mknod /dev/net/tun c 10 200
```

---

**Q: What should I do if the error `Address already in use` is reported after startup?**

**A:** This may be due to port conflicts. Please check whether port 11010 or the port specified by the startup parameter (e.g., `-l tcp:12345`) is occupied by other programs.

---
