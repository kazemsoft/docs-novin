---
id: about
title: Novin Cloud AI
sidebar_label: Overview
sidebar_position: 1
description: An introduction to the Novin Cloud AI service — access to large language models through a single OpenAI-compatible API.
---

# Novin Cloud AI

Novin Cloud AI is a **single gateway** for accessing dozens of large language models. Instead of creating a separate account, obtaining a key, and paying a foreign-currency bill for every provider, you get access to all models with **one API key** and **Rial payments from your Novin Cloud wallet**.

## Why use this service?

| Without Novin Cloud | With Novin Cloud |
|---|---|
| A separate account for every provider | One user account |
| A separate API key for every service | One key for all models |
| Requires an international credit card | Rial payment from your wallet |
| Access issues from Iran | Direct access, no intermediary |
| Different code for every provider | One standard, OpenAI-compatible API |

## Full OpenAI compatibility

The most important feature of this service is **full compatibility with the OpenAI API standard**. This means any library, framework, or tool that works with OpenAI connects to Novin Cloud by changing just two values:

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-API-key",                 # Your Novin Cloud key
    base_url="https://iapi.novin.cloud/v1"  # Novin Cloud endpoint
)
```

That's it. Without changing another line of code, you now have access to every model. This means LangChain, LlamaIndex, Cursor, Continue, and any other tool that supports OpenAI works without needing a special plugin.

## Available models

Models from several providers are available:

- **Anthropic** — the Claude family (Opus, Sonnet, Haiku)
- **OpenAI** — the GPT family and the o-series reasoning models
- **Google** — the Gemini family, with a very large context window
- **Meta** — the Llama family
- **DeepSeek** — chat and reasoning models
- **Mistral** — including Codestral for coding
- **Qwen** — including Qwen Coder

The full, up-to-date list of models, with pricing and specifications, is available on the [Models](./models.md) page and in the **Models** section of the user console.

:::tip
The model list is read live from the gateway. For the most accurate status, check the [user console](https://console.novin.cloud/dashboard/ai/models) or use the standard `/v1/models` endpoint.
:::

## How the service works

```
       You / your application
               │
               │  Authorization: Bearer sk-...
               ▼
    ┌──────────────────────┐
    │  iapi.novin.cloud    │   AI gateway
    └──────────┬───────────┘
               │
               ▼
        AI model providers
```

**Gateway** — All requests pass through `iapi.novin.cloud`. This layer routes each request to the relevant provider, enforces your key's limits, and counts the tokens consumed.

**Authentication** — API keys are tied to your user account and are created and managed from the user console.

**Cost calculation** — The cost of each request is calculated from the input and output tokens and deducted from your Rial wallet. See details on the [Usage & Billing](./usage-billing.md) page.

## Two ways to use it

### 1. Through the API

For use in applications, scripts, and development tools. Create an API key and use it:

```bash
curl https://iapi.novin.cloud/v1/chat/completions \
  -H "Authorization: Bearer $NOVIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

Full guides: [Quickstart](./quickstart.md) and [API Reference](./api-reference.md).

### 2. Through the chat interface

If you want to work with the models without writing code, you have two options:

- **In-console chat** — the [Chat](https://console.novin.cloud/dashboard/ai/chat) section of the user console, for quick conversations and trying out models. Guide: [Chat](./chat.md)
- **Dedicated chat interface** — [chat.novin.cloud](https://chat.novin.cloud), with more complete features, using the same Novin Cloud account to sign in

## How billing works

Costs are calculated **based on actual usage** — there is no monthly subscription or fixed fee. You only pay for the tokens you actually consume, and the cost is deducted from your Rial wallet balance.

Each model's price is calculated separately based on the **number of input tokens** and the **number of output tokens**. Output tokens are usually more expensive than input tokens.

:::warning Insufficient balance
If your wallet balance is insufficient, requests are rejected with a `402` error. Make sure your wallet is topped up before use.
:::

## Next steps

<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>

- 🚀 **[Quickstart](./quickstart.md)** — from creating a key to your first request, in a few minutes
- 🔑 **[API Keys](./api-keys.md)** — creating keys, setting budgets and rate limits
- 🧠 **[Models](./models.md)** — choosing the right model for your task
- 💬 **[Chat](./chat.md)** — using the console chat interface
- 📊 **[Usage & Billing](./usage-billing.md)** — tracking costs
- 📖 **[API Reference](./api-reference.md)** — complete endpoint documentation

</div>
