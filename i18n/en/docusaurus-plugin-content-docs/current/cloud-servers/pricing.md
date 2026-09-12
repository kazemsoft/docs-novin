---
id: pricing
title: Cost and Payment
sidebar_label: Cost and payment
sidebar_position: 5
description: How Novin Cloud cloud server costs are calculated — hourly pricing, tax, and the wallet balance requirement.
---

# Cloud Server Cost and Payment

## Calculation basis

Server cost is calculated based on **hourly resource pricing**:

```
Hourly total  =  CPU cost + memory cost + disk cost
Monthly total =  Hourly total × 24 × 30
```

**10% VAT** is added to this amount.

:::note Bandwidth
Network traffic cost is not included in the displayed total; traffic is billed separately based on **actual usage**.
:::

## Currency

All amounts in the console are displayed in **Rial**.

## Balance requirement when creating a server

To create a server, at least **one third of the total monthly cost** must be available in your wallet. If the balance is lower, the create-server button changes to **"Top Up Wallet"**, and you must first [top up your wallet](../wallet/top-up.md).

## Deductions

Server cost is deducted continuously from your wallet balance. You can view the itemized deducted costs in the **Payment** tab of the [Wallet](../wallet/transactions.md) section; for each record, the breakdown of CPU, memory, network, and disk cost, along with tax, is shown.

:::warning Billing does not stop automatically
Cost is calculated as long as the server has not been **deleted** — even if the server is powered off, since resources remain reserved for you.

If you no longer need the server, delete it.
:::

## Estimating cost before creating a server

From the [Calculator](https://console.novin.cloud/dashboard/cloud-servers/calculator) page, you can adjust CPU, memory, and disk values to see the hourly and monthly cost before creating a server.
