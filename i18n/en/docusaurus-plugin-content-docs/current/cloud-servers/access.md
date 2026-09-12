---
id: access
title: Connecting to a Server
sidebar_label: Connecting to a server
sidebar_position: 3
description: Ways to connect to a Novin Cloud cloud server — SSH, RDP, text console, and web-based VNC.
---

# Connecting to a Server

Once the server reaches the **Running** state, you have several ways to connect.

## SSH (Linux)

Copy the server's IP address from the server list:

```bash
ssh root@192.0.2.10
```

Enter the password you set when creating the server.

:::tip Extra security
After your first login, place your SSH public key on the server, then disable password login:

```bash
ssh-copy-id root@192.0.2.10
```

Then in the `/etc/ssh/sshd_config` file, set `PasswordAuthentication` to `no` and restart the service.
:::

## RDP (Windows)

Connect to the server's IP address using Remote Desktop, and sign in with the username `administrator` and the password you set.

## Web-based console

If for any reason you don't have network access to the server (for example, you misconfigured the firewall), use the web-based console. There are two options:

### VNC

A graphical view of the server's screen. Suitable for Windows and also for operating system installation steps. A button to send `Ctrl+Alt+Del` is also available on this page.

### Text console

Access to the server's serial console. Suitable for Linux servers.

:::note Console availability
- The console and VNC are only enabled when the server is in the **Running** state.
- On the server details page, in addition to being Running, the **server agent** must also be connected. Until then, the message "The operating system is being prepared" is shown.
- The text console is not shown for **Windows** servers; use VNC for Windows instead.
:::

## Changing the password

On the server details page, there is a **"Change Password"** option. The new password must be at least 6 characters.

:::warning
Applying the new password takes about **20 seconds or more**. Attempting to log in with the new password immediately after submitting it may fail.
:::

## Can't connect

1. Check the **server status**; it must be `Running`.
2. Log in via the **web-based console** and check that the `sshd` service is up.
3. Check the **firewall inside the server** — for example `ufw status` or `iptables -L`.
4. If you recently changed the password, wait a bit and try again.
