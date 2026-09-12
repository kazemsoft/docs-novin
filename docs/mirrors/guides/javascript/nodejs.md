---
id: nodejs
title: Node.js
sidebar_label: Node.js
description: دانلود باینری‌های Node.js از میرور نوین کلاود با nvm، fnm یا دانلود مستقیم.
---

# Node.js

آدرس `https://mirror.novin.cloud/nodejs/` آینه‌ی کامل ساختار `nodejs.org/dist` است و باینری‌های Node.js را سرو می‌کند.

## پیکربندی

با `nvm`:

```bash
export NVM_NODEJS_ORG_MIRROR=https://mirror.novin.cloud/nodejs
nvm install 22
```

با `fnm`:

```bash
fnm install 22 --node-dist-mirror https://mirror.novin.cloud/nodejs
```

دانلود مستقیم یک نسخه (مثلاً v22 روی لینوکس x64):

```bash
curl -O https://mirror.novin.cloud/nodejs/v22.9.0/node-v22.9.0-linux-x64.tar.xz
```

## بررسی

```bash
curl -I https://mirror.novin.cloud/nodejs/index.json
nvm install 22 --dry-run
```

## استفاده در Docker / CI

```dockerfile
ENV NVM_NODEJS_ORG_MIRROR=https://mirror.novin.cloud/nodejs
RUN curl -o node.tar.xz https://mirror.novin.cloud/nodejs/v22.9.0/node-v22.9.0-linux-x64.tar.xz
```

## بازگشت به تنظیمات قبلی

```bash
unset NVM_NODEJS_ORG_MIRROR
```

و برای `fnm` کافی‌ست فلگ `--node-dist-mirror` را حذف کنید تا از `nodejs.org` استفاده شود.

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
