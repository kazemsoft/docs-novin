---
id: models
title: Models
sidebar_label: Models
sidebar_position: 4
description: The list of AI models available on Novin Cloud, their context windows, capabilities, and a guide to choosing the right model.
---

# Models

Novin Cloud provides access to dozens of language models from various providers. All of them are available through a single API with a single key.

The live model list is available in the **AI → Models** section of the [user console](https://console.novin.cloud/dashboard/ai/models).

:::info Viewing models in the console
To see the model list in the console, you must first have an active API key and select it from the menu at the top of the page. The model list is shown based on that key's access.
:::

## Model ID

Every model has a **Model ID** used in requests. IDs follow the pattern `provider/model-name`:

```json
{
  "model": "anthropic/claude-sonnet-4-5",
  "messages": [...]
}
```

:::warning
The model ID must match the list **exactly**. `gpt-4o` without the `openai/` prefix is not valid and returns a `404` error.
:::

To get the exact list of IDs programmatically:

```bash
curl https://iapi.novin.cloud/v1/models \
  -H "Authorization: Bearer $NOVIN_API_KEY"
```

## Model specifications

Each model's card in the console shows the following information:

### Context window

The maximum number of tokens the model can process in a single request — including the **total** of the input message, conversation history, and generated response.

If the total exceeds this limit, the request fails with an error. For long conversations or processing large documents, choose a model with a larger context window.

| Window size | Approximate use case |
|---|---|
| 64K tokens | Everyday conversations, short text |
| 128K tokens | Long documents, large codebases |
| 200K tokens | Multiple documents at once, full projects |
| 1M tokens | Books, entire code repositories |

:::note What is a token?
A token is the unit of text processing used by models. Roughly, one token is equivalent to three to four characters of English text. Persian text usually consumes more tokens than an equivalent amount of English text.
:::

### Capabilities

Each model may support the following capabilities:

| Capability | Description |
|---|---|
| **Vision** | The ability to receive and analyze images alongside text |
| **Function Calling** | The ability to call tools and functions you define — the foundation for building agents |
| **Streaming** | Sending the response incrementally, word by word |

### Input and output pricing

Each model has two separate prices:

- **Input price** — for the tokens you send to the model (message and history)
- **Output price** — for the tokens the model generates

The output price is usually **three to five times** the input price.

:::info Up-to-date pricing
Prices may change. Always check the current price for each model on the [Models page in the console](https://console.novin.cloud/dashboard/ai/models). The figures on this page are provided only for relative comparison between models.
:::

## Providers and model families

### Anthropic — the Claude family

Claude models excel at reasoning, long-form writing, and coding, and have a 200K-token context window.

| Model | Notes |
|---|---|
| `anthropic/claude-opus-4` | The most capable model in the family, for complex tasks |
| `anthropic/claude-sonnet-4-5` | A good balance of quality and cost |
| `anthropic/claude-haiku-4-5` | Fast and inexpensive, for simple, high-volume tasks |
| `anthropic/claude-3.5-haiku` | The previous generation of the fast model |

### OpenAI — the GPT and o-series families

| Model | Notes |
|---|---|
| `openai/gpt-4o` | A multimodal model with image support |
| `openai/gpt-4o-mini` | A lightweight, inexpensive version of `gpt-4o` |
| `openai/gpt-4-turbo` | The previous generation, still capable |
| `openai/o1`, `openai/o3` | Reasoning models for complex math and logic problems |
| `openai/o4-mini` | A lighter reasoning model |

:::tip Reasoning models
The o-series models work through reasoning steps before responding. They're more accurate for complex math, logic, and programming problems, but slower and more expensive. Don't use them for simple questions.
:::

### Google — the Gemini family

The defining feature of this family is its **very large context window (over one million tokens)** — suited to processing large documents and code repositories.

| Model | Notes |
|---|---|
| `google/gemini-2.5-pro` | The most capable model in the family |
| `google/gemini-2.5-flash` | Fast, with the same large context window |
| `google/gemini-2.5-flash-lite` | The lightest and cheapest option |

### Meta — the Llama family

Open-source models with good quality and reasonable pricing.

| Model | Notes |
|---|---|
| `meta-llama/llama-3.3-70b-instruct` | Good quality at a balanced cost |
| `meta-llama/llama-3.1-405b-instruct` | The largest model in the family |
| `meta-llama/llama-3.2-11b-vision-instruct` | Supports images |

### DeepSeek

Cost-effective models focused on reasoning and coding.

| Model | Notes |
|---|---|
| `deepseek/deepseek-chat-v3.1` | The cheapest option for general tasks |
| `deepseek/deepseek-r1` | A reasoning model |
| `deepseek/deepseek-r1-distill-llama-70b` | A distilled, lighter version of the reasoning model |

### Mistral

| Model | Notes |
|---|---|
| `mistralai/mistral-large-2411` | The flagship model |
| `mistralai/codestral-2508` | Specialized for coding, 256K-token context window |
| `mistralai/mistral-nemo` | Lightweight and inexpensive |

### Qwen

| Model | Notes |
|---|---|
| `qwen/qwen3-235b-a22b` | The largest model in the family |
| `qwen/qwen3-coder` | Specialized for coding |
| `qwen/qwen-plus` | Cost-effective for everyday tasks |

## Model selection guide

| Your need | Recommendation |
|---|---|
| Simple, high-volume tasks (classification, short summarization) | Lightweight models: `gpt-4o-mini`, `claude-haiku-4-5`, `gemini-2.5-flash-lite` |
| General conversation with good quality | `gpt-4o`, `claude-sonnet-4-5`, `gemini-2.5-flash` |
| Long-form, high-quality writing | `claude-sonnet-4-5`, `claude-opus-4` |
| Coding | `codestral-2508`, `qwen3-coder`, `claude-sonnet-4-5` |
| Complex math and logic problems | `openai/o1`, `openai/o3`, `deepseek-r1` |
| Processing very large documents | The `gemini-2.5` family (million-token window) |
| Image analysis | Models with vision capability |
| Lowest cost | `deepseek-chat-v3.1`, `mistral-nemo`, `qwen-plus` |

:::tip A practical approach to choosing
Start with a mid-tier model. If the response quality is sufficient, try a cheaper model to find the lowest acceptable cost. If it's not sufficient, move up to a more capable model. Testing with the [console chat](./chat.md) is the fastest way to compare.
:::

## Filtering and search

On the models page in the console, you can filter the list by **provider** and **capability**, or search by model name.

## Next steps

- [Chat](./chat.md) — quickly try out models without writing code
- [API Reference](./api-reference.md) — using models in code
- [Usage & Billing](./usage-billing.md) — comparing the actual cost of models
