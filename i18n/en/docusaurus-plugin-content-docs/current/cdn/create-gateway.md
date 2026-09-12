---
id: create-gateway
title: Creating a Gateway
sidebar_label: Creating a Gateway
sidebar_position: 2
description: Create a CDN gateway on Novin Cloud — with a custom domain or without one.
---

# Creating a CDN Gateway

From the [CDN](https://console.novin.cloud/dashboard/cdn) section, click **"Add Gateway"**.

## Step 1 — Choose a mode

There are two modes:

### Use an existing domain

The gateway is served on your own domain.

:::note Prerequisite
The domain must already be added and active in the [DNS](../dns/add-domain.md) section. Only domains registered under the same account are shown in the selection list.
:::

### CDN only

If you don't have a custom domain, Novin Cloud assigns a dedicated address to your gateway, shown on the gateway's details page after it's created.

## Step 2 — Details

| Field | Description |
|---|---|
| **Name** | The gateway's name for identification in the console |
| **Domain** | Only shown in "Use an existing domain" mode |

After submitting, the gateway is created and you can open its details page.

## Gateway tabs

The gateway details page has four tabs:

| Tab | Purpose |
|---|---|
| **Upstreams** | Define your origin server |
| **Locations** | Routing rules and cache settings |
| **TLS** | SSL certificate |
| **Firewall** | WAF rules |

## TLS settings

On the **TLS** tab, **"Automatic"** mode is enabled, and the SSL certificate is issued and renewed automatically.

:::note
The "No TLS" and "Private certificate" modes are shown in the console but are not yet available.
:::

## Next steps

After creating the gateway, [set up the upstream and location](./locations.md).
