---
id: quickstart
title: شروع سریع
sidebar_label: شروع سریع
sidebar_position: 2
description: از ساخت کلید API تا ارسال اولین درخواست به مدل‌های هوش مصنوعی نوین کلاود، در کمتر از پنج دقیقه.
---

# شروع سریع

در این راهنما از صفر تا اولین پاسخ مدل پیش می‌رویم. کل مسیر کمتر از پنج دقیقه طول می‌کشد.

## پیش‌نیازها

- یک حساب کاربری در [نوین کلاود](https://console.novin.cloud)
- موجودی کافی در کیف پول

:::tip شارژ کیف پول
اگر کیف پول شما خالی است، از بخش [کیف پول](https://console.novin.cloud/dashboard/wallet) در کنسول، اعتبار خود را شارژ کنید. بدون موجودی، درخواست‌ها با خطای `402` رد می‌شوند.
:::

## گام ۱ — ساخت کلید API

۱. وارد [کنسول کاربری](https://console.novin.cloud) شوید.
۲. از منوی کناری به **هوش مصنوعی → کلیدهای API** بروید.
۳. روی دکمه **+ ایجاد کلید جدید** کلیک کنید.
۴. یک **نام کلید** انتخاب کنید — نامی که بعداً کاربرد کلید را یادآوری کند، مثلاً `پروژه فروشگاه` یا `تست محلی`.
۵. روی **ایجاد کلید** کلیک کنید.

:::danger کلید فقط یک بار نمایش داده می‌شود
پس از ساخت، کلید در یک پنجره نمایش داده می‌شود و **فقط همان یک بار قابل مشاهده است**. آن را کپی و در جای امنی ذخیره کنید. اگر پنجره را ببندید، کلید قابل بازیابی نیست و باید کلید جدیدی بسازید.
:::

کلید ساخته‌شده چیزی شبیه این است:

```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

می‌توانید هنگام ساخت کلید، محدودیت بودجه، محدودیت نرخ و تاریخ انقضا هم تعیین کنید. جزئیات در صفحه [کلیدهای API](./api-keys.md).

## گام ۲ — ذخیره کلید در متغیر محیطی

کلید را مستقیم داخل کد ننویسید. به‌جای آن در یک متغیر محیطی نگه دارید:

```bash
export NOVIN_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
```

برای ویندوز (PowerShell):

```powershell
$env:NOVIN_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
```

## گام ۳ — اولین درخواست

### با cURL

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

پاسخ چیزی شبیه این خواهد بود:

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

بخش `usage` نشان می‌دهد چند توکن مصرف شده — همین عدد مبنای محاسبه هزینه است.

### با Python

ابتدا کتابخانه رسمی OpenAI را نصب کنید:

```bash
pip install openai
```

سپس:

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

### با Node.js

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

## گام ۴ — دریافت پاسخ به‌صورت استریم

برای اینکه پاسخ کلمه‌به‌کلمه و بدون انتظار نمایش داده شود، کافی است `stream: true` را اضافه کنید:

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

## گام ۵ — گفتگوی چندمرحله‌ای

مدل‌ها حافظه ندارند. برای ادامه یک گفتگو، باید **تمام پیام‌های قبلی** را در هر درخواست بفرستید:

```python
messages = [
    {"role": "system", "content": "تو یک دستیار فارسی‌زبان هستی."},
    {"role": "user", "content": "پایتخت ایران کجاست؟"},
]

response = client.chat.completions.create(
    model="openai/gpt-4o", messages=messages
)
answer = response.choices[0].message.content

# پاسخ مدل را به تاریخچه اضافه کنید
messages.append({"role": "assistant", "content": answer})
# حالا سوال بعدی
messages.append({"role": "user", "content": "جمعیتش چقدر است؟"})

response = client.chat.completions.create(
    model="openai/gpt-4o", messages=messages
)
print(response.choices[0].message.content)
```

:::note هزینه گفتگوی طولانی
هرچه تاریخچه گفتگو طولانی‌تر شود، توکن ورودی هر درخواست بیشتر می‌شود و هزینه بالا می‌رود. برای گفتگوهای طولانی، پیام‌های قدیمی را حذف یا خلاصه کنید.
:::

## نقش‌های پیام

| نقش | کاربرد |
|---|---|
| `system` | تعیین رفتار و شخصیت مدل — در ابتدای گفتگو |
| `user` | پیام کاربر |
| `assistant` | پاسخ قبلی مدل — برای حفظ تاریخچه |

## خطاهای رایج

| کد | معنی | راه‌حل |
|---|---|---|
| `401` | کلید نامعتبر است | کلید را بررسی کنید؛ مطمئن شوید حذف یا منقضی نشده |
| `402` | موجودی کیف پول کافی نیست | کیف پول را شارژ کنید |
| `429` | عبور از محدودیت نرخ | چند لحظه صبر کنید یا محدودیت کلید را افزایش دهید |
| `404` | مدل یافت نشد | شناسه مدل را با فهرست [مدل‌ها](./models.md) مطابقت دهید |

## گام بعدی

- [کلیدهای API](./api-keys.md) — تعیین بودجه و محدودیت برای کلیدها
- [مدل‌ها](./models.md) — انتخاب مدل مناسب و مقایسه قیمت‌ها
- [مرجع API](./api-reference.md) — تمام پارامترها و endpoint‌ها
- [مصرف و صورتحساب](./usage-billing.md) — پیگیری هزینه‌ها
