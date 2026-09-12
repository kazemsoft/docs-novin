---
id: about
title: DNS Service
sidebar_label: Overview
sidebar_position: 1
description: Manage the DNS records for your domains on Novin Cloud — add a domain, configure nameservers, and manage records.
---

# Novin Cloud DNS Service

With Novin Cloud's DNS service, you can manage your domain's records from inside the [user console](https://console.novin.cloud/dashboard/dns) — no need for your domain registrar's panel.

## Overview

Your domain is registered with a **domain registrar** (such as IRNIC or any other registrar). What Novin Cloud does is **host the DNS records** for that domain. To do this, you need to point the domain's nameservers to Novin Cloud's nameservers in your registrar's panel.

```
    Domain registrar               Novin Cloud                  End user
   (IRNIC, etc.)
         │                             │                           │
         │  Nameservers point          │                           │
         │  to Novin Cloud    ────────►│                           │
         │                             │  ◄──── example.ir request │
         │                             │                           │
         │                             │  Response based on your   │
         │                             │  defined records ────────►│
```

## How it works

1. **Add the domain** — Register the domain in the console. Its status becomes `Pending`.
2. **Configure the nameservers** — Enter the nameservers shown by the console into your domain registrar's panel.
3. **Activate** — Click **"Recheck"** to check the status. Once verified, the status becomes `Active`.
4. **Manage records** — Add `A`, `CNAME`, `MX`, and other records.

Step-by-step guide: [Adding a domain](./add-domain.md)

## Supported record types

The console lets you create the following record types:

| Type | Purpose |
|---|---|
| `A` | Points the domain to an IPv4 address |
| `AAAA` | Points the domain to an IPv6 address |
| `CNAME` | An alias for another domain |
| `MX` | Specifies the domain's mail server |
| `TXT` | Text value (ownership verification, SPF, DKIM) |
| `SRV` | Advertises a service on a specific host and port |

Details for each type: [Managing records](./records.md)

## Next steps

- 🌐 **[Adding a domain](./add-domain.md)** — from registering a domain to activating it
- 📝 **[Managing records](./records.md)** — create, edit, and delete records
- 🛠 **[Troubleshooting](./troubleshooting.md)** — why isn't my domain becoming active?
