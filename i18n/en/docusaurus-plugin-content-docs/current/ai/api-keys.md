---
id: api-keys
title: API Keys
sidebar_label: API Keys
sidebar_position: 3
description: Creating, managing, and restricting Novin Cloud AI API keys — budgets, rate limits, and expiration.
---

# API Keys

An API key is an identifier that tells the AI gateway who you are and what you're allowed to access. All requests are authenticated with this key, and their cost is deducted from your wallet.

Keys are managed from the **AI → API Keys** section of the [user console](https://console.novin.cloud/dashboard/ai/api-keys).

## Creating a new key

Click the **+ Create New Key** button. The key creation form includes these fields:

### Key name (required)

A name to identify the key. This name is for your own reference only and isn't used in requests. It's recommended to choose a descriptive name so you'll later know where each key is used:

- ✅ `mobile-app-production`
- ✅ `local-test`
- ❌ `key-1`

### Allowed models

You can specify that this key only has access to certain models. If you don't select any model, the key will have access to **all models**.

This feature is very useful for cost control — for example, you can create a key that only has access to lower-cost models.

### Expiration

The date after which the key automatically stops working:

| Option | Description |
|---|---|
| No expiration | The key remains valid until you delete it yourself |
| 30 days | Suitable for testing and short-term projects |
| 90 days | Suitable for medium-term projects |
| 1 year | Suitable for stable, ongoing services |

:::tip Key rotation
Setting an expiration date is good security practice. Even for permanent services, setting a one-year expiration forces you to rotate keys periodically.
:::

## Advanced settings

The **Advanced settings** section of the key creation form gives you four optional limits.

### Budget cap

The maximum amount (in Toman) this key is allowed to spend. Once the key's usage reaches this cap, subsequent requests are rejected — even if your wallet still has a balance.

This is the most effective safeguard against unintended usage. If a key is leaked or code gets stuck in an infinite loop, your loss is capped at this limit.

### Budget renewal period

Specifies when the budget cap resets to zero:

| Option | Behavior |
|---|---|
| Never | The budget cap is a one-time allowance; once exhausted, the key stops working |
| Monthly | The budget resets at the start of every month |
| Weekly | The budget resets at the start of every week |

Example: a budget cap of `500,000` Toman with `Monthly` renewal means this key can spend at most 500,000 Toman per month.

### Requests per minute limit (RPM)

The maximum number of requests this key can send per minute. Exceeding this limit returns a `429` response.

Use case: preventing a sudden surge of requests, for example when a bug causes requests to be sent repeatedly.

### Tokens per minute limit (TPM)

The maximum number of tokens this key can consume per minute. Unlike RPM, which counts the number of requests, TPM controls the actual volume of usage.

:::note RPM or TPM?
A single request with very long text can consume as many tokens as hundreds of short requests. If you're concerned about cost, `TPM` is the more precise measure; if you're concerned about load on the service, use `RPM`.
:::

## The key after creation

After you confirm the form, the key is displayed in a dialog.

:::danger This key is shown only once
The full key is visible **only at this moment**. After you close the dialog, it can no longer be recovered — the key list will only show its last four digits.

If you lose the key, you must delete the old one and create a new one.
:::

Click the **Copy Key** button and store it somewhere safe.

## Key list

The keys table displays the following information:

| Column | Description |
|---|---|
| Key name | The name you chose when creating the key |
| Key | The last four digits of the key, shown as `••••xxxx` |
| Status | Active / Expired / Disabled |
| Budget | The configured budget cap |
| Expiration | The key's expiration date |
| Actions | Edit and delete |

### Key statuses

- **Active** — the key is working
- **Expired** — the expiration date has passed; requests are rejected
- **Disabled** — the key has been temporarily deactivated

## Editing a key

Clicking **Edit** lets you change the name, allowed models, budget, rate limits, and expiration date.

:::info
The key value itself cannot be changed. If you want a different key, you must create a new one and delete the old one.
:::

## Deleting a key

Clicking **Delete** and confirming immediately deactivates the key.

:::warning Irreversible action
Deleting a key cannot be undone. Any application using this key will immediately receive a `401` error. Before deleting, make sure the key isn't in use anywhere.
:::

## Security recommendations

**Don't put the key in your code.** Use an environment variable instead:

```python
# ❌ Wrong
client = OpenAI(api_key="sk-xxxxxxxxxxxx")

# ✅ Correct
client = OpenAI(api_key=os.environ["NOVIN_API_KEY"])
```

**Don't commit the key to git.** Add the `.env` file to `.gitignore`:

```
.env
.env.local
```

**Create a separate key for each environment.** Keep your development, testing, and production keys separate so that if one is leaked, the others remain safe.

**Don't use the key in the browser.** If you put the key in client-side code (browser JavaScript or a mobile app), anyone can extract it. Send requests from your own server instead.

**If a key is leaked, delete it immediately.** Deleting the key is the fastest way to stop usage.

## Next steps

- [Models](./models.md) — choosing a model and valid IDs
- [Usage & Billing](./usage-billing.md) — tracking usage per key
- [API Reference](./api-reference.md) — using the key in requests
