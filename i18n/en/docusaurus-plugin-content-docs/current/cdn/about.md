---
id: about
title: CDN Service
sidebar_label: Overview
sidebar_position: 1
description: Novin Cloud's content delivery network — gateway, location, cache, TLS certificate, and WAF firewall.
---

# Novin Cloud CDN Service

Novin Cloud's CDN service routes your site's traffic through Novin Cloud's network to speed up load times, reduce load on your origin server, and add a layer of protection in front of your service.

## Core concepts

| Concept | Description |
|---|---|
| **Gateway** | The main unit of the service; each of your sites or services has one gateway |
| **Upstream** | Your origin server, where content is read from |
| **Location** | A routing rule: which URL path goes to which upstream |
| **TLS** | The SSL certificate used to serve your site over `https` |
| **WAF** | Rules that protect against malicious traffic |

```
    User  ──►  Novin Cloud Gateway  ──►  Upstream (your server)
                       │
                 ┌─────┴─────┐
                 │           │
             Content cache  Firewall
```

## How it works

1. Create a **gateway**.
2. Add an **upstream** (the address of your origin server).
3. Define a **location** to determine which path goes to which upstream.
4. Add **firewall** rules if needed.

## Next steps

- 🚀 **[Creating a gateway](./create-gateway.md)** — set up your first gateway
- ⚙️ **[Upstream and location](./locations.md)** — routing and cache settings
- 🛡 **[Firewall (WAF)](./waf.md)** — protection rules
