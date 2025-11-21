# Install as a macOS Service

Download and install [serviceman](https://webinstall.dev/serviceman).

Open Terminal and run the following commands to register the service:

```bash
# Register the easytier service using a configuration file
sudo serviceman add --name easytier --daemon \         
--workdir /var/log/easytier \
--group wheel --user root \
-- easytier-core -c ~/.config/easytier.toml

# Register the easytier service without using a configuration file
sudo serviceman add --name easytier --daemon \
--workdir /var/log/easytier \
--group wheel --user root \
-- easytier-core --ipv4 x.x.x.x --network-name xxx --network-secret yyy --peers tcp://peer_host:11010
```

Start the easytier service:

```bash
sudo launchctl start easytier
# Load task, -w option will restart on next login/restart.
launchctl load -w /Library/LaunchDaemons/easytier.plist
```

Stop the easytier service:

```bash
sudo launchctl stop easytier
# Unload task, -w option will not be executed on next login/restart.
launchctl unload -w /Library/LaunchDaemons/easytier.plist
```
View Logs:

```bash
sudo tail -f /var/log/easytier.log
```
