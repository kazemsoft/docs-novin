---
id: waf
title: Firewall (WAF)
sidebar_label: Firewall
sidebar_position: 4
description: Web application firewall rules in Novin Cloud's CDN service.
---

# Web Application Firewall (WAF)

From the **"Firewall"** tab on the gateway page, you can define rules that inspect and manage incoming traffic based on custom conditions.

## Creating a rule

Creating a rule is done in two steps:

1. **Action** — determine what happens when the condition is met.
2. **Conditions** — the conditions used to inspect traffic.

Conditions can be combined in groups, nested, and joined with **AND** and **OR** operators to build more precise rules.

## Managing rules

| Operation | Status |
|---|---|
| Add rule | Available |
| Enable/disable rule | Available |
| Delete rule | Available |
| Edit rule | Not yet available |

:::note Editing a rule
Editing an existing rule isn't enabled yet. To change a rule, delete it and create a new one.
:::

:::tip Before enabling
Define firewall rules with a narrow scope first and monitor your site's behavior. An overly strict rule might block your real users too.
:::
