---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 4
description: Answers to frequently asked questions from Novin Cloud users.
---

# Frequently Asked Questions

## Account

### Why can't I log into the console?

You can't use the console until you verify your mobile number. After logging in, the mobile verification window is shown.

### I didn't receive the verification email.

Check your spam folder. You can request another one from the verification page (with a 2-minute interval).

### Can I change my account's email?

Not from the console. Request it via a [support ticket](https://console.novin.cloud/dashboard/tickets).

## Wallet and payments

### What's the minimum top-up amount?

**200,000 Rial** (equal to 20,000 Toman).

### Are amounts in Rial or Toman?

All amounts in the console are in **Rial**. 10 Rial equals 1 Toman.

### Money was deducted from my account but my wallet wasn't topped up.

The amount is automatically refunded within **24 hours**. If it isn't, open a ticket with the tracking code.

### How do I get an official invoice?

Request one via a ticket to the **Finance** department.

## Cloud servers

### Why can't I create a server?

You need at least **one-third of the server's monthly cost** available in your wallet. If your balance is too low, the create button changes to "Top up wallet."

### Can I create a server with an SSH key?

When creating a server, access is set up with a **username and password**. After your first login, you can place your own SSH key on the server.

### I set the wrong server name — how do I change it?

The server name can't be changed after creation. The "Edit" option in the server list changes the **password**, not the name.

### I powered off my server — am I still being charged?

Yes. As long as the server hasn't been **deleted**, its resources remain reserved and are billed.

### I changed the server's password but it's not working.

Applying the new password takes about **20 seconds**. Wait a moment and try again.

### VNC and the console are disabled.

The server must be in the `Running` state with its agent connected. If you see "Operating system is preparing," wait a few minutes.

## DNS

### My domain isn't activating.

**Replace** the domain's nameservers at your registrar with the values shown in the console, then click "Recheck." Propagation can take up to 24 hours. [Full guide](../dns/troubleshooting.md)

### Why can't I create a CNAME on the root domain?

This is a standard DNS restriction. Use an `A` record for the root domain.

### I changed a record but it's not taking effect.

The old response is served from cache until the previous `TTL` expires. [Troubleshooting guide](../dns/troubleshooting.md)

## AI

### I'm getting a 402 error.

Your wallet balance is insufficient. [Top up your wallet](../wallet/top-up.md).

### I'm getting a 429 error.

You've hit your key's rate limit. Wait a moment, or increase your key's `RPM`/`TPM` limit.

## Other

### When will Kubernetes and cloud storage be activated?

These services are in development. Updates will be announced through the console.

### My question wasn't answered here.

Ask via a [support ticket](https://console.novin.cloud/dashboard/tickets), or if you think this is a gap in the documentation, [contribute to improving the docs](./contributing.md).
