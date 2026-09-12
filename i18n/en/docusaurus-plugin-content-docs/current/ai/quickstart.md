---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
sidebar_position: 2
description: From creating an API key to sending your first request to a Novin Cloud AI model, in under five minutes.
---

# Quickstart

This guide walks you from zero to your first model response. The whole process takes less than five minutes.

## Prerequisites

- A [Novin Cloud](https://console.novin.cloud) user account
- Sufficient wallet balance

:::tip Top up your wallet
If your wallet is empty, top up your balance from the [Wallet](https://console.novin.cloud/dashboard/wallet) section of the console. Without a balance, requests are rejected with a `402` error.
:::

## Step 1 — Create an API key

1. Sign in to the [user console](https://console.novin.cloud).
2. From the side menu, go to **AI → API Keys**.
3. Click the **+ Create New Key** button.
4. Choose a **key name** — something that will later remind you what the key is used for, such as `store-project` or `local-test`.
5. Click **Create Key**.

:::danger The key is shown only once
After creation, the key is displayed in a dialog and **can only be viewed that one time**. Copy it and store it somewhere safe. If you close the dialog, the key cannot be recovered and you will need to create a new one.
:::

The generated key looks something like this:

```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

You can also set a budget limit, rate limit, and expiration date when creating the key. See details on the [API Keys](./api-keys.md) page.

## Step 2 — Store the key in an environment variable

Don't write the key directly into your code. Keep it in an environment variable instead:

```bash
export NOVIN_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
```

For Windows (PowerShell):

```powershell
$env:NOVIN_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
```

## Step 3 — Your first request

### With cURL

```bash
curl https://iapi.novin.cloud/v1/chat/completions \
  -H "Authorization: Bearer $NOVIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {"role": "user", "content": "در یک جمله بگو هوش مصنوعی چیست؟"}
    ]
  }'
```

The response will look something like this:

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1750000000,
  "model": "openai/gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "هوش مصنوعی شاخه‌ای از علوم کامپیوتر است که..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 42,
    "total_tokens": 60
  }
}
```

The `usage` field shows how many tokens were consumed — this is the number your cost is calculated from.

### With Python

First, install the official OpenAI library:

```bash
pip install openai
```

Then:

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["NOVIN_API_KEY"],
    base_url="https://iapi.novin.cloud/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        {"role": "user", "content": "در یک جمله بگو هوش مصنوعی چیست؟"}
    ],
)

print(response.choices[0].message.content)
```

### With Node.js

```bash
npm install openai
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NOVIN_API_KEY,
  baseURL: "https://iapi.novin.cloud/v1",
});

const response = await client.chat.completions.create({
  model: "openai/gpt-4o",
  messages: [
    { role: "user", content: "در یک جمله بگو هوش مصنوعی چیست؟" },
  ],
});

console.log(response.choices[0].message.content);
```

## Step 4 — Getting a streamed response

To have the response displayed word by word without waiting, simply add `stream: true`:

```python
stream = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "یک داستان کوتاه بنویس"}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

## Step 5 — Multi-turn conversations

Models have no memory. To continue a conversation, you must send **all previous messages** with every request:

```python
messages = [
    {"role": "system", "content": "تو یک دستیار فارسی‌زبان هستی."},
    {"role": "user", "content": "پایتخت ایران کجاست؟"},
]

response = client.chat.completions.create(
    model="openai/gpt-4o", messages=messages
)
answer = response.choices[0].message.content

# Add the model's response to the history
messages.append({"role": "assistant", "content": answer})
# Now the next question
messages.append({"role": "user", "content": "جمعیتش چقدر است؟"})

response = client.chat.completions.create(
    model="openai/gpt-4o", messages=messages
)
print(response.choices[0].message.content)
```

:::note Cost of long conversations
The longer the conversation history grows, the more input tokens each request uses and the higher the cost gets. For long conversations, remove or summarize older messages.
:::

## Message roles

| Role | Use |
|---|---|
| `system` | Sets the model's behavior and persona — placed at the start of the conversation |
| `user` | The user's message |
| `assistant` | The model's previous response — used to preserve history |

## Common errors

| Code | Meaning | Solution |
|---|---|---|
| `401` | Invalid key | Check the key; make sure it hasn't been deleted or expired |
| `402` | Insufficient wallet balance | Top up your wallet |
| `429` | Rate limit exceeded | Wait a moment or increase the key's rate limit |
| `404` | Model not found | Match the model ID against the [Models](./models.md) list |

## Next steps

- [API Keys](./api-keys.md) — setting budgets and limits for keys
- [Models](./models.md) — choosing the right model and comparing prices
- [API Reference](./api-reference.md) — all parameters and endpoints
- [Usage & Billing](./usage-billing.md) — tracking costs
