---
id: create
title: Creating a Server
sidebar_label: Creating a server
sidebar_position: 2
description: Step-by-step guide to creating a cloud server on Novin Cloud — choosing location, operating system, plan, and configuration.
---

# Creating a Cloud Server

From the [Cloud Servers](https://console.novin.cloud/dashboard/cloud-servers/list) section, click Create New Server. The creation process is a multi-step wizard.

## Step 1 — Location

Choose the country and then the desired zone. Currently only **Iran** is active.

## Step 2 — Operating system

Choose the desired image from the available distributions. The list is read live based on the selected zone.

## Step 3 — Server type

There are two paths:

### Ready-made plan

A table of predefined plans with CPU, RAM, SSD disk, bandwidth, and hourly price. Choose one.

### Custom resources

If you enter via the **Calculator** page, sliders for setting resources are shown instead of the plan table:

| Resource | Range |
|---|---|
| CPU | 1 to 32 cores |
| Memory (RAM) | 1 to 64 GB |
| Disk | 20 to 512 GB |
| Bandwidth | 100 to 51200 GB |

The price updates live as you move the sliders.

## Step 4 — Add-ons

If you chose a ready-made plan, you can add extra disk, CPU, or RAM on top of it.

:::note
Adding a CPU or RAM add-on takes your server out of "ready-made plan" mode; in the plan-change section it will then be treated as a server with custom resources.
:::

## Step 5 — Configuration

| Field | Description |
|---|---|
| **IPv4** | Enabled by default |
| **IPv6** | Not yet available |
| **Username** | Has a default value based on the operating system |
| **Password** | Password for accessing the server |
| **Server name** | The server's identifier in the console |

:::warning Server naming rules
The server name must:

- Contain only **lowercase English letters and digits**
- Start with a **letter** (not a digit)
- Be at most **10 characters** long
- Contain no spaces or special characters (`@`, `-`, `_`, etc.)

Disallowed characters are rejected as you type.
:::

## Step 6 — Advanced settings (Linux only)

For Linux operating systems, you can edit `cloud-init` so that your custom commands or settings run on first boot. This step is optional, and the entered value is validated as `YAML` before you continue.

## Confirm and create

In the side column, an order summary and the **hourly and monthly total** are shown.

:::warning Wallet balance
To create a server, at least **one third of the total monthly cost** must be available in your wallet. If the balance is insufficient, the create button changes to **"Top Up Wallet"**.
:::

After clicking **"Confirm and Create Server"**, you'll be taken to the server list. Creating the server and preparing the operating system takes a few minutes.

## Next step

Once the server reaches the **Running** state, you can [connect to it](./access.md).
