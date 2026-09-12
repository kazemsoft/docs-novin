---
id: add-domain
title: Adding a Domain
sidebar_label: Adding a Domain
sidebar_position: 2
description: Add a domain to Novin Cloud's DNS service, configure its nameservers, and activate it.
---

# Adding a Domain

## Step 1 — Register the domain in the console

Go to the [DNS](https://console.novin.cloud/dashboard/dns) section and click **"Add Site"**. Three options are shown:

| Option | Status |
|---|---|
| **Connect domain** | Active — connect a domain you already own to Novin Cloud |
| Transfer domain | Coming soon |
| Buy domain | Coming soon |

Choose **Connect domain**, enter the domain name, and click **"Continue"**.

:::note Domain name format
Enter the domain without `http://`, without `www`, and without a trailing slash — just `example.ir`.

The input form currently accepts single-level domains (such as `example.ir` or `example.com`). For subdomains, add the root domain first, then create the subdomain as a **record** inside that domain.
:::

After registering, you'll return to the domain list, where the domain appears with the status **Pending**.

## Step 2 — Configure the nameservers

Click the domain to open its details page. The **"Novin Cloud Nameservers"** section shows two nameservers.

:::warning Read these values from the console
Nameservers **are assigned per domain, on the server side**. Be sure to copy the exact values shown on your own domain's page, and don't rely on example values from any guide.
:::

Now log in to your **domain registrar's** panel (wherever you purchased the domain — e.g., IRNIC) and replace the domain's current nameservers with these two values.

## Step 3 — Activation

After changing the nameservers, go back to the domain's page in the console and click **"Recheck"**.

If the change hasn't propagated across the internet yet, the domain stays in the "Pending" state. This is normal — nameserver propagation usually takes anywhere from a few minutes up to 24 hours (and in rare cases up to 48 hours). Click **"Recheck"** again after a while.

:::tip Check it yourself
You can verify nameserver propagation yourself:

```bash
dig NS example.ir +short
```
:::

Once the status changes to **Active**, you can [manage the records](./records.md).

## Deleting a domain

The domain's details page includes a section for deleting the domain.

:::danger
Deleting a domain destroys all of its records, and any services connected to that domain will stop working. This action cannot be undone.
:::
