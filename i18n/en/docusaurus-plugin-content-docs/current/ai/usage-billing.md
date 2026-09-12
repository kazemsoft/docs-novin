---
id: usage-billing
title: Usage & Billing
sidebar_label: Usage & Billing
sidebar_position: 6
description: How Novin Cloud AI billing is calculated, how to track token usage, and how to control costs.
---

# Usage & Billing

Novin Cloud AI is billed **based on actual usage**. There's no monthly subscription, fixed fee, or minimum usage — you only pay for the tokens you consume.

## How is cost calculated?

Every request has two cost components:

```
Total cost  =  (input tokens × model's input price)
             + (output tokens × model's output price)
```

**Input tokens** — everything sent to the model: your message, the system message, and the entire conversation history.

**Output tokens** — the text the model generates.

The output price is usually three to five times the input price, because generating text is more expensive than reading it.

### Viewing usage per request

In the response to every API request, the `usage` field returns the exact token counts:

```json
{
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 42,
    "total_tokens": 60
  }
}
```

- `prompt_tokens` — input tokens
- `completion_tokens` — output tokens
- `total_tokens` — the total

## Wallet

Costs are deducted from your account's **Rial wallet** — the same wallet you use for other Novin Cloud services. There's no need for a separate wallet for AI.

Your current balance is shown at the top of the [AI](https://console.novin.cloud/dashboard/ai) page and in the [Wallet](https://console.novin.cloud/dashboard/wallet) section.

:::warning Insufficient balance
If your wallet balance is insufficient, requests are rejected with a `402` error. The service does not allow you to go into debt, and usage without a balance isn't possible.
:::

To top up, go to the [Add Funds](https://console.novin.cloud/dashboard/wallet) section.

## Usage page

The **AI → Usage** section of the [user console](https://console.novin.cloud/dashboard/ai/usage) shows a complete report of your usage.

### Time ranges

You can view the report over three ranges:

- **Last 7 days**
- **Last 30 days** (default)
- **Last 3 months**

### Overview metrics

These figures are displayed at the top of the page:

| Metric | Description |
|---|---|
| Total tokens | The sum of input and output tokens in the selected range |
| Total cost | The amount deducted from your wallet in the selected range |
| Number of requests | The total number of calls |
| Average tokens per request | Useful for spotting unusually heavy requests |

### Usage-by-model chart

Shows which models account for the largest share of your usage. This chart is the most effective tool for reducing costs: if an expensive model has a large share, check whether some of that work could be shifted to a cheaper model.

### Usage detail table

A line-by-line list of requests with these columns:

| Column | Description |
|---|---|
| Date | Time of the request |
| Model | The model used |
| Input tokens | Number of tokens sent |
| Output tokens | Number of tokens received |
| Cost | Amount deducted |

## Cost control

### 1. Budget cap on the key

The most effective safeguard. When creating a key, set a budget cap in **Advanced settings**. That key's usage will never exceed this cap, even if your wallet has a balance.

Details: [API Keys](./api-keys.md).

### 2. Rate limiting

Set `RPM` and `TPM` to prevent sudden spikes in usage — for example, when a bug causes requests to be sent repeatedly.

### 3. Choosing the right model for the task

The biggest savings usually come from here. For text classification or simple summarization, a lightweight model is sufficient and can be tens of times cheaper. See the selection guide: [Models](./models.md).

### 4. Keeping history short

In long conversations, the history is resent with every request, and the input cost keeps climbing. For a new topic, start a new conversation, or delete/summarize older messages.

### 5. Limiting response length

Use the `max_tokens` parameter to cap the response length and avoid generating unnecessarily long text:

```python
response = client.chat.completions.create(
    model="openai/gpt-4o-mini",
    messages=[{"role": "user", "content": "این متن را در یک جمله خلاصه کن: ..."}],
    max_tokens=100,
)
```

### 6. A separate key for each project

By creating a separate key for each project or environment, you can identify where costs are coming from in the usage report.

## Frequently asked questions

**Does a failed request cost anything?**
Requests rejected with a `401`, `402`, `429`, or `404` error incur no cost, since they never reached the model.

**What happens if I stop a response midway?**
Tokens generated up to the moment of stopping are billed.

**Does Persian text consume more tokens?**
Yes. Persian text usually consumes more tokens than an equivalent amount of English text.

**Why does the chat counter differ slightly from the usage report?**
The in-chat counter is a quick estimate for real-time display. **The usage report page is the authoritative figure.**

**Is usage from chat.novin.cloud also recorded here?**
Yes, all usage from every channel is aggregated in this same report.

## Next steps

- [API Keys](./api-keys.md) — setting budget caps and rate limits
- [Models](./models.md) — choosing a cost-effective model
- [API Reference](./api-reference.md) — usage-control parameters
