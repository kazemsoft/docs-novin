---
id: troubleshooting
title: DNS Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 4
description: Resolve common DNS issues on Novin Cloud — a domain that won't activate, a record that isn't applying, and other common errors.
---

# Troubleshooting Common DNS Issues

## Domain stuck in "Pending" status

A domain won't become active until its nameservers point to Novin Cloud.

**Check that:**

1. You've **replaced** the nameservers in your domain registrar's panel (not added them to the existing list).
2. You've entered both nameservers, not just one.
3. You copied the values exactly from that domain's page in the console.

**Then:**

```bash
dig NS example.ir +short
```

If the output still shows the old nameservers, the change hasn't propagated yet — this usually takes up to 24 hours, and in rare cases up to 48 hours. Click **"Recheck"** in the console afterward.

## I created a record but it isn't applying

**1. Wait for the cache to expire.** If you edited a record, DNS servers will keep serving the old response until the previous `TTL` expires.

**2. See the actual response:**

```bash
dig A www.example.ir +short
```

To bypass intermediate caches and query the nameserver directly:

```bash
dig A www.example.ir @ns1.example-ns.ir
```

**3. Clear your own system's cache:**

```bash
# macOS
sudo dscacheutil -flushcache

# Linux (systemd)
sudo systemd-resolve --flush-caches

# Windows
ipconfig /flushdns
```

## The form won't accept my domain name

Enter the domain without `http://`, without `www`, and without a trailing slash — just `example.ir`.

For a **subdomain** (such as `blog.example.ir`), add the root domain first, then create the subdomain as a **record** named `blog` inside that domain.

## A CNAME record can't be created on the root domain

This is a standard DNS restriction, not a Novin Cloud limitation. You cannot create a `CNAME` on the domain root (`@`). Use an `A` record pointing to the destination IP address instead.

## Emails aren't being received

- Make sure you've created an `MX` record named `@`.
- The `MX` value must point to a **domain name**, not an IP.
- Set up an `SPF` record (of type `TXT`) to prevent your outgoing emails from being marked as spam.

## Still having trouble

Open a ticket from the [support tickets](https://console.novin.cloud/dashboard/tickets) section. For a faster review, include the output of the `dig` command and the domain name in your ticket.
