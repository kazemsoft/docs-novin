---
id: api-reference
title: مرجع API
sidebar_label: مرجع API
sidebar_position: 7
description: مستندات کامل API هوش مصنوعی نوین کلاود — endpoint‌ها، پارامترها، استریمینگ، فراخوانی تابع و کدهای خطا.
---

# مرجع API

API هوش مصنوعی نوین کلاود **کاملاً سازگار با استاندارد OpenAI** است. هر کتابخانه یا ابزاری که با OpenAI کار می‌کند، تنها با تغییر `base_url` و `api_key` به نوین کلاود متصل می‌شود.

## آدرس پایه

```
https://iapi.novin.cloud/v1
```

## احراز هویت

کلید API را در هدر `Authorization` قرار دهید:

```
Authorization: Bearer sk-xxxxxxxxxxxxxxxxxxxx
```

ساخت کلید: [کلیدهای API](./api-keys.md).

## اتصال کتابخانه‌های رسمی

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
<summary>متغیر محیطی (بدون تغییر کد)</summary>

بسیاری از ابزارها این دو متغیر را می‌خوانند:

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxx"
export OPENAI_BASE_URL="https://iapi.novin.cloud/v1"
```
</details>

---

## `POST /v1/chat/completions`

اصلی‌ترین endpoint برای گفتگو با مدل‌ها.

### پارامترهای اصلی

| پارامتر | نوع | الزامی | توضیح |
|---|---|---|---|
| `model` | string | ✅ | شناسه مدل، مثل `openai/gpt-4o` |
| `messages` | array | ✅ | آرایه پیام‌های گفتگو |
| `stream` | boolean | ❌ | دریافت پاسخ به‌صورت تدریجی (پیش‌فرض `false`) |
| `max_tokens` | integer | ❌ | حداکثر توکن پاسخ |
| `temperature` | number | ❌ | میزان خلاقیت، بین `0` تا `2` (پیش‌فرض `1`) |
| `top_p` | number | ❌ | نمونه‌گیری تجمعی، بین `0` تا `1` |
| `stop` | string \| array | ❌ | رشته‌هایی که با دیدن آن‌ها تولید متوقف شود |
| `tools` | array | ❌ | تعریف توابع قابل فراخوانی |
| `response_format` | object | ❌ | اجبار خروجی به JSON |

### ساختار `messages`

```json
[
  {"role": "system",    "content": "تو یک دستیار فارسی‌زبان هستی."},
  {"role": "user",      "content": "سلام"},
  {"role": "assistant", "content": "سلام! چطور می‌توانم کمک کنم؟"},
  {"role": "user",      "content": "پایتخت ایران کجاست؟"}
]
```

| نقش | کاربرد |
|---|---|
| `system` | تعیین رفتار کلی مدل — در ابتدای آرایه |
| `user` | پیام کاربر |
| `assistant` | پاسخ قبلی مدل، برای حفظ تاریخچه |

### راهنمای `temperature`

| مقدار | رفتار | مناسب برای |
|---|---|---|
| `0` تا `0.3` | دقیق و قابل تکرار | استخراج داده، دسته‌بندی، پاسخ واقعی |
| `0.7` تا `1.0` | متعادل | گفتگوی عمومی |
| `1.2` تا `2.0` | خلاقانه و متنوع | ایده‌پردازی، داستان‌نویسی |

### نمونه درخواست

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

### ساختار پاسخ

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

### مقادیر `finish_reason`

| مقدار | معنی |
|---|---|
| `stop` | پاسخ به‌طور طبیعی تمام شد |
| `length` | به سقف `max_tokens` رسید — پاسخ ناقص است |
| `tool_calls` | مدل درخواست فراخوانی تابع کرده است |
| `content_filter` | محتوا توسط فیلتر ایمنی مسدود شد |

---

## استریمینگ

با `stream: true` پاسخ به‌صورت **Server-Sent Events** ارسال می‌شود.

هر خط با `data: ` شروع می‌شود و پایان جریان با `data: [DONE]` مشخص می‌گردد:

```
data: {"choices":[{"delta":{"content":"سلام"}}]}

data: {"choices":[{"delta":{"content":" دنیا"}}]}

data: [DONE]
```

### با کتابخانه رسمی

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

### پردازش دستی در JavaScript

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
در حالت استریم، بخش `usage` معمولاً در انتهای جریان ارسال می‌شود. برای گزارش دقیق مصرف، به صفحه [مصرف](./usage-billing.md) مراجعه کنید.
:::

---

## `GET /v1/models`

فهرست مدل‌های در دسترس کلید شما.

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

مقدار `id` همان چیزی است که باید در پارامتر `model` بفرستید.

---

## خروجی JSON

برای دریافت پاسخ ساختاریافته و قابل پردازش:

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
هنگام استفاده از `response_format`، کلمه «JSON» را در پیام سیستمی هم ذکر کنید تا مدل ساختار درست‌تری تولید کند.
:::

---

## فراخوانی تابع (Function Calling)

مدل‌های دارای این قابلیت می‌توانند تشخیص دهند برای پاسخ به کاربر لازم است تابعی از سمت شما فراخوانی شود.

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

مدل خودش تابع را اجرا نمی‌کند؛ فقط می‌گوید چه تابعی با چه ورودی‌هایی باید صدا زده شود. اجرای تابع و بازگرداندن نتیجه به مدل بر عهده شماست.

فهرست مدل‌های پشتیبان این قابلیت: [مدل‌ها](./models.md).

---

## کدهای خطا

| کد | معنی | اقدام |
|---|---|---|
| `400` | درخواست نامعتبر | ساختار `messages` و پارامترها را بررسی کنید |
| `401` | کلید نامعتبر | کلید را بررسی کنید؛ ممکن است حذف یا منقضی شده باشد |
| `402` | موجودی ناکافی | [کیف پول را شارژ کنید](https://console.novin.cloud/dashboard/wallet) |
| `404` | مدل یافت نشد | شناسه مدل را با `/v1/models` مطابقت دهید |
| `429` | عبور از محدودیت نرخ | صبر کنید یا `RPM`/`TPM` کلید را افزایش دهید |
| `500` / `502` / `503` | خطای سمت سرویس | با تأخیر فزاینده دوباره تلاش کنید |

### تلاش مجدد هوشمند

برای خطاهای `429` و `5xx`، با **تأخیر فزاینده (exponential backoff)** دوباره تلاش کنید:

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
            time.sleep(2 ** attempt)  # ۱، ۲، ۴، ۸ ثانیه
```

:::warning
برای خطاهای `401`، `402` و `404` تلاش مجدد نکنید — این خطاها با تکرار برطرف نمی‌شوند و فقط باعث فشار اضافی می‌شوند.
:::

## گام بعدی

- [شروع سریع](./quickstart.md) — نمونه‌های عملی
- [مدل‌ها](./models.md) — شناسه و قابلیت مدل‌ها
- [مصرف و صورتحساب](./usage-billing.md) — کنترل هزینه
