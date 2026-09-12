---
id: about
title: Cloud Servers
sidebar_label: Overview
sidebar_position: 1
description: Novin Cloud cloud servers — virtual machines with dedicated resources, hourly billing, and a full management console.
---

# Novin Cloud Cloud Servers

A Novin Cloud cloud server (VPS) is a virtual machine with dedicated resources that is provisioned in a few minutes, giving you full `root` or `administrator` access.

## Features

| Feature | Description |
|---|---|
| **Hourly billing** | Cost is calculated per hour and deducted from your Rial wallet |
| **Custom resources** | Choose a ready-made plan or set CPU, RAM, and disk precisely |
| **Wide range of operating systems** | Linux distributions, Windows Server, and RouterOS |
| **Web-based console** | VNC and text console access, no SSH required |
| **Snapshots** | Take a point-in-time snapshot of the server and restore it |
| **Extra disks** | Add and expand disks without creating a new server |

## Operating systems

The list of images is read live from the console and includes the following families:

- **Linux** — Ubuntu, Debian, CentOS, and other distributions
- **Windows Server**
- **RouterOS / MikroTik CHR**

:::note Username and password access
Creating a server on Novin Cloud is based on a **username and password**. The default username depends on the operating system:

| Operating system | Default username |
|---|---|
| Linux | `root` |
| Windows | `administrator` |
| RouterOS | `admin` (no password) |

After your first login to a Linux server, we recommend placing your SSH key on the server and disabling password login.
:::

## Location

Servers are currently offered in **Iran**. Other locations are shown in the console but are not yet active.

## Next steps

- 🚀 **[Create a server](./create.md)** — step-by-step guide to creating your first server
- 🔌 **[Connect to a server](./access.md)** — SSH, RDP, console, and VNC
- ⚙️ **[Manage a server](./manage.md)** — power on/off, plan changes, disks, and snapshots
- 💰 **[Cost and payment](./pricing.md)** — how hourly and monthly costs are calculated
