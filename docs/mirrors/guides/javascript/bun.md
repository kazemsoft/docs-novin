---
id: bun
title: Bun
sidebar_label: Bun
description: تنظیم Bun برای دریافت پکیج از میرور نوین کلاود.
---

# Bun

Bun هم از همان رجیستری npm میرور نوین کلاود پشتیبانی می‌کند: `https://mirror.novin.cloud/artifactory/api/npm/npm/`.

## پیکربندی

در `bunfig.toml` پروژه (یا `~/.bunfig.toml` برای تنظیم سراسری):

```toml
[install]
registry = "https://mirror.novin.cloud/artifactory/api/npm/npm/"
```

:::note
Bun فایل `.npmrc` را هم می‌خواند، پس اگر پروژه از قبل `.npmrc` با تنظیم `registry` دارد نیازی به `bunfig.toml` نیست.
:::

## بررسی

```bash
bun pm cache
cat bunfig.toml
bun add express --dry-run
```

## استفاده در Docker / CI

```dockerfile
ENV BUN_CONFIG_REGISTRY=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

## بازگشت به تنظیمات قبلی

حذف بلوک `[install]` از `bunfig.toml` یا تغییر `registry` به `https://registry.npmjs.org/`.

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
