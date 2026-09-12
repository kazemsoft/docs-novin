---
id: records
title: Managing Records
sidebar_label: Managing Records
sidebar_position: 3
description: Create, edit, and delete DNS records on Novin Cloud — record types, TTL, and proxy mode.
---

# Managing DNS Records

Once your [domain is active](./add-domain.md), you can manage its records from the domain's details page.

## Adding a record

Click **"Add Record"** and fill in the following fields:

| Field | Description |
|---|---|
| **Type** | One of `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV` |
| **Name** | The subdomain — e.g., `www`. Use `@` for the root domain itself |
| **Value** | The record's target (depends on type: IP, domain, text, etc.) |
| **TTL** | How long the response is cached |
| **Proxy** | Shown only for `A`, `AAAA`, and `CNAME` |

The **Name** field also accepts `*` (for a wildcard record) and `@` (for the domain root).

## Record types

### A and AAAA

Point the domain to an IP address. `A` is for IPv4, `AAAA` is for IPv6.

```
Type: A     Name: @      Value: 192.0.2.10
Type: A     Name: www    Value: 192.0.2.10
```

The value of these records is validated; it must be a valid IP address.

### CNAME

Points the domain to another domain.

```
Type: CNAME    Name: www    Value: example.ir
```

:::warning CNAME restriction
A `CNAME` record cannot be created on the domain root (`@`). Use an `A` record for the root instead.
:::

### MX

Specifies the domain's mail server. The value can include a priority number; a lower number means higher priority.

```
Type: MX    Name: @    Value: 10 mail.example.ir
```

### TXT

A text value, used for domain ownership verification, `SPF`, `DKIM`, and `DMARC`.

```
Type: TXT    Name: @    Value: v=spf1 include:_spf.example.ir ~all
```

If you leave the Name field empty for a `TXT` record, it defaults to `@` automatically.

### SRV

Advertises a specific host and port for a service.

## TTL value

TTL determines how many seconds a record's response is cached on DNS servers. Available options:

| Option | Seconds |
|---|---|
| 1 minute | 60 |
| 2 minutes | 120 |
| 5 minutes | 300 |
| 10 minutes | 600 |
| 15 minutes | 900 |
| 30 minutes | 1800 |
| 1 hour | 3600 |
| 2 hours | 7200 |
| 12 hours | 43200 |
| 1 day | 86400 |

The default value when creating a new record is **1 minute**.

:::tip Choosing a TTL
Before migrating servers, lower the TTL a few hours in advance (1 to 5 minutes) so the IP change propagates quickly. Once things have stabilized, you can raise it again to reduce load on DNS.
:::

## Proxy mode

For `A`, `AAAA`, and `CNAME` records, a **Proxy** toggle is shown:

- **DNS only** — the DNS response returns your server's IP directly.
- **Proxy enabled** — traffic passes through Novin Cloud's network, and your origin server's IP stays hidden.

For other record types (`MX`, `TXT`, `SRV`), this option doesn't apply and isn't shown.

## Editing and deleting

Every record in the list has **"Edit"** and **"Delete"** buttons. Changes take effect after propagating across the DNS network; propagation time depends on that record's previous TTL value.
