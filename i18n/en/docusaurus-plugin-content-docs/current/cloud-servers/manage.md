---
id: manage
title: Managing a Server
sidebar_label: Managing a server
sidebar_position: 4
description: Managing a Novin Cloud cloud server — power on/off, plan changes, disks, snapshots, and deleting a server.
---

# Managing a Server

Clicking the server's name in the list takes you to its details page. This page includes tabs for information, disks, snapshots, plan changes, and add-ons.

## Power operations

| Operation | Description |
|---|---|
| **Shut down** | Shutdown with a suitable grace period for services to close cleanly |
| **Cold shutdown** | Immediate power-off of the server, with no grace period |
| **Restart** | Normal restart |
| **Cold restart** | Immediate restart, equivalent to pressing the reset button |

:::tip
Always try the normal option first. Only use the "cold" mode when the server is unresponsive — it carries a risk of filesystem damage.
:::

## Disks

From the **Disks** tab, you can create a new disk, expand an existing one, or delete it.

:::note Limitations
- **The operating system disk cannot be resized or deleted.**
- A newly created disk becomes visible inside the operating system only after a **server restart**.
- Deleting a disk is also finalized only after a server restart.
:::

After adding a disk, you need to partition and mount it inside the operating system.

## Snapshots

From the **Snapshots** tab, you can take a point-in-time snapshot of the server, restore it, or delete it.

:::warning A snapshot is not a substitute for backup
A snapshot is stored on the same underlying infrastructure as your server. For critical data, also keep a backup copy elsewhere.
:::

## Changing the plan

From the **Change Plan** tab, you can change the server's resources. Servers created with a ready-made plan can select a different plan, while servers with custom resources set the CPU and RAM values directly.

## Traffic add-on

From the **Add-ons** tab, you can purchase an additional traffic package. The initial and remaining amount of each package is shown.

:::note
Each server can have only **one active traffic package** at a time.
:::

## Reinstalling the operating system

The **"Reinstall OS"** option rebuilds the server from the original image.

:::danger All data will be erased
This operation deletes the operating system disk and rebuilds it from scratch. **All data on the main disk is lost and cannot be recovered.** Back up your data before proceeding.
:::

## Deleting a server

To delete a server, you must enter the **exact server name** in the confirmation box.

:::danger
Deleting a server destroys all its disks and data, and billing stops. This action cannot be undone.
:::

:::note About the "Edit" option
In the server list, there is an option labeled "Edit." This option **changes the server's password** and does not change the server's name; the server name cannot be changed after creation.
:::
