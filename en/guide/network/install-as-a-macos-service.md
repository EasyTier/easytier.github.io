# Installing as macOS service

Download and install [serviceman](https://webinstall.dev/serviceman)

Open terminal and run the following commands to register easytier service:

```bash
# Start easytier with configuration file
sudo serviceman add -name easytier -system \
--workdir /var/log/easytier \
-groupname wheel -username root \
-cap-net-bind \
-- easytier-core -c ~/.config/easytier.toml

# or you can register easytier service without configuration
sudo serviceman add -name easytier -system \
--workdir /var/log/easytier \
-groupname wheel -username root \
-cap-net-bind \
-- easytier-core --ipv4 x.x.x.x --network-name xxx --network-secret yyy --peers tcp://peer_host:11010
```

Start easytier service：

```bash
sudo serviceman start easytier
```

Stop easytier service:

```bash
sudo serviceman stop easytier
```
