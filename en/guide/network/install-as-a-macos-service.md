# Install as a macOS Service

Download and install [serviceman](https://webinstall.dev/serviceman).

Open Terminal and run the following commands to register the service:

```bash
# Register the easytier service using a configuration file
sudo serviceman add -name easytier -system \
--workdir /var/log/easytier \
-groupname wheel -username root \
-cap-net-bind \
-- easytier-core -c ~/.config/easytier.toml

# Register the easytier service without using a configuration file
sudo serviceman add -name easytier -system \
--workdir /var/log/easytier \
-groupname wheel -username root \
-cap-net-bind \
-- easytier-core --ipv4 x.x.x.x --network-name xxx --network-secret yyy --peers tcp://peer_host:11010
```

Start the easytier service:

```bash
sudo serviceman start easytier
```

Stop the easytier service:

```bash
sudo serviceman stop easytier
```
