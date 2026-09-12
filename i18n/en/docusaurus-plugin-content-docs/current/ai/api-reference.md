---
id: api-reference
title: API Reference
sidebar_label: API Reference
sidebar_position: 7
description: Complete documentation for the Novin Cloud AI API — endpoints, parameters, streaming, function calling, and error codes.
---

# API Reference

The Novin Cloud AI API is **fully compatible with the OpenAI standard**. Any library or tool that works with OpenAI connects to Novin Cloud by changing only the `base_url` and `api_key`.

## Base URL

```
https://iapi.novin.cloud/v1
```

## Authentication

Pass the API key in the `Authorization` header:

```
Authorization: Bearer sk-xxxxxxxxxxxxxxxxxxxx
```

To create a key, see [API Keys](./api-keys.md).

## Connecting official libraries

<details>
<summary>Python</summary>

```python
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["NOVIN_API_KEY"],
    base_url="https://iapi.novin.cloud/v1",
)
```
</details>

<details>
<summary>Node.js / TypeScript</summary>

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NOVIN_API_KEY,
  baseURL: "https://iapi.novin.cloud/v1",
});
```
</details>

<details>
<summary>LangChain</summary>

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="openai/gpt-4o",
    api_key=os.environ["NOVIN_API_KEY"],
    base_url="https://iapi.novin.cloud/v1",
)
```
</details>

<details>
<summary>Environment variables (no code changes)</summary>

Many tools read these two variables:

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxx"
export OPENAI_BASE_URL="https://iapi.novin.cloud/v1"
```
</details>

---

## `POST /v1/chat/completions`

The primary endpoint for conversing with models.

### Main parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `model` | string | ✅ | The model ID, e.g. `openai/gpt-4o` |
| `messages` | array | ✅ | The array of conversation messages |
| `stream` | boolean | ❌ | Receive the response incrementally (default `false`) |
| `max_tokens` | integer | ❌ | Maximum tokens in the response |
| `temperature` | number | ❌ | Degree of creativity, between `0` and `2` (default `1`) |
| `top_p` | number | ❌ | Nucleus sampling, between `0` and `1` |
| `stop` | string \| array | ❌ | Strings that, when encountered, stop generation |
| `tools` | array | ❌ | Definitions of callable functions |
| `response_format` | object | ❌ | Force output to JSON |

### `messages` structure

```json
[
  {"role": "system",    "content": "تو یک دستیار فارسی‌زبان هستی."},
  {"role": "user",      "content": "سلام"},
  {"role": "assistant", "content": "سلام! چطور می‌توانم کمک کنم؟"},
  {"role": "user",      "content": "پایتخت ایران کجاست؟"}
]
```

| Role | Use |
|---|---|
| `system` | Sets the model's overall behavior — placed at the start of the array |
| `user` | The user's message |
| `assistant` | The model's previous response, used to preserve history |

### `temperature` guide

| Value | Behavior | Suitable for |
|---|---|---|
| `0` to `0.3` | Precise and reproducible | Data extraction, classification, factual answers |
| `0.7` to `1.0` | Balanced | General conversation |
| `1.2` to `2.0` | Creative and varied | Brainstorming, storytelling |

### Example request

```bash
curl https://iapi.novin.cloud/v1/chat/completions \
  -H "Authorization: Bearer $NOVIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {"role": "system", "content": "تو یک دستیار فارسی‌زبان هستی."},
      {"role": "user", "content": "سه نکته برای یادگیری برنامه‌نویسی بگو"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

### Response structure

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1750000000,
  "model": "openai/gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "متن پاسخ مدل..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

### `finish_reason` values

| Value | Meaning |
|---|---|
| `stop` | The response finished naturally |
| `length` | Hit the `max_tokens` cap — the response is incomplete |
| `tool_calls` | The model has requested a function call |
| `content_filter` | Content was blocked by the safety filter |

---

## Streaming

With `stream: true`, the response is sent as **Server-Sent Events**.

Each line begins with `data: `, and the end of the stream is marked with `data: [DONE]`:

```
data: {"choices":[{"delta":{"content":"سلام"}}]}

data: {"choices":[{"delta":{"content":" دنیا"}}]}

data: [DONE]
```

### With the official library

```python
stream = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "یک شعر کوتاه بگو"}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

### Manual handling in JavaScript

```javascript
const response = await fetch(
  "https://iapi.novin.cloud/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: "سلام" }],
      stream: true,
    }),
  }
);

const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = "";

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split("\n");
  buffer = lines.pop() ?? "";

  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6).trim();
    if (data === "[DONE]") break;

    const chunk = JSON.parse(data);
    const delta = chunk.choices?.[0]?.delta?.content;
    if (delta) process.stdout.write(delta);
  }
}
```

:::note
In streaming mode, the `usage` field is usually sent at the end of the stream. For an accurate usage report, see the [Usage](./usage-billing.md) page.
:::

---

## `GET /v1/models`

The list of models available to your key.

```bash
curl https://iapi.novin.cloud/v1/models \
  -H "Authorization: Bearer $NOVIN_API_KEY"
```

```json
{
  "object": "list",
  "data": [
    {
      "id": "openai/gpt-4o",
      "object": "model",
      "created": 1750000000,
      "owned_by": "openai"
    }
  ]
}
```

The `id` value is exactly what you should send in the `model` parameter.

---

## JSON output

To get a structured, machine-readable response:

```python
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        {"role": "system", "content": "خروجی را فقط به صورت JSON بده."},
        {"role": "user", "content": "نام و پایتخت سه کشور آسیایی"},
    ],
    response_format={"type": "json_object"},
)
```

:::tip
When using `response_format`, also mention the word "JSON" in the system message so the model produces a more correctly structured output.
:::

---

## Function calling

Models with this capability can determine that, in order to respond to the user, a function on your side needs to be called.

```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "دریافت وضعیت آب و هوای یک شهر",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "نام شهر"}
            },
            "required": ["city"],
        },
    },
}]

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "هوای تهران چطوره؟"}],
    tools=tools,
)

tool_call = response.choices[0].message.tool_calls[0]
print(tool_call.function.name)       # get_weather
print(tool_call.function.arguments)  # {"city": "تهران"}
```

The model doesn't execute the function itself; it only indicates which function should be called with which inputs. Executing the function and returning the result to the model is your responsibility.

For the list of models that support this capability, see [Models](./models.md).

---

## Error codes

| Code | Meaning | Action |
|---|---|---|
| `400` | Invalid request | Check the `messages` structure and parameters |
| `401` | Invalid key | Check the key; it may have been deleted or expired |
| `402` | Insufficient balance | [Top up your wallet](https://console.novin.cloud/dashboard/wallet) |
| `404` | Model not found | Match the model ID against `/v1/models` |
| `429` | Rate limit exceeded | Wait, or increase the key's `RPM`/`TPM` limit |
| `500` / `502` / `503` | Service-side error | Retry with increasing delay |

### Smart retries

For `429` and `5xx` errors, retry with **exponential backoff**:

```python
import time
from openai import RateLimitError, APIError

def ask_with_retry(messages, model="openai/gpt-4o", retries=4):
    for attempt in range(retries):
        try:
            return client.chat.completions.create(
                model=model, messages=messages
            )
        except (RateLimitError, APIError):
            if attempt == retries - 1:
                raise
            time.sleep(2 ** attempt)  # 1, 2, 4, 8 seconds
```

:::warning
Do not retry `401`, `402`, and `404` errors — these errors aren't resolved by retrying and only add unnecessary load.
:::

## Next steps

- [Quickstart](./quickstart.md) — practical examples
- [Models](./models.md) — model IDs and capabilities
- [Usage & Billing](./usage-billing.md) — controlling costs
