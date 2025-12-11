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

**Q: Is a WEB console absolutely necessary?**

**A:** EasyTier is **decentralized**, so it **does not have** and **does not need** a centralized control panel like ZeroTier or Tailscale to manage all devices.

---

**Q: What is the purpose of the WEB console?**

**A:** The purpose of the WEB console is to remotely manage/distribute configurations. If you start with the `-w <web console username>` parameter, the machine will attempt to connect to the specified server and identify itself with the given username.
At this point, in the panel, you can log in with this username and manage machines that are identified with that user.

In other words, you don't need to worry about someone impersonating your username to start the core, because as long as you don't distribute the same configuration to that machine as your other machines, your network information will not be leaked.
On the contrary, this would expose all internal network services of that machine to you.

---

**Q: Is the WEB console username the same as the network name?**

**A:** **No, they are not the same**.
Network name + network password must be completely identical to successfully establish a network and transmit valid information.

---

**Q: What should I do if I cannot see other networked machines in the WEB console?**

**A:** If these machines were started using other methods, their configuration files are managed by the machines themselves, so naturally they **cannot** be seen in the web panel.
If you need to check whether they are successfully connected, you can enter `easytier-cli node` or `easytier-cli peers` on the machine to view.
Alternatively, you can open any managed machine in the web panel (which uses the same network name as the machine you want to check), and see if the machine you want to check appears in its connected directory.

---

**Q: How to start multiple instances?**

**A:** A single machine may need to provide forwarding services for multiple networks simultaneously, but this may cause port conflict errors.
As long as the listener port is set without conflicting with other already started instances, it will work.
If RPC is configured, you also need to ensure that the port does not conflict.

---
