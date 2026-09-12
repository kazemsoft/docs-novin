---
id: npm
title: npm
sidebar_label: npm
description: تنظیم npm برای دریافت پکیج از میرور نوین کلاود به‌جای registry.npmjs.org.
---

# npm

میرور نوین کلاود پکیج‌های npm را از `https://mirror.novin.cloud/artifactory/api/npm/npm/` سرو می‌کند.

## پیکربندی

```bash
npm config set registry https://mirror.novin.cloud/artifactory/api/npm/npm/
```

یا در `.npmrc` پروژه:

```ini
registry=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

## بررسی

```bash
npm config get registry
npm view express version
```

## استفاده در Docker / CI

```dockerfile
ENV NPM_CONFIG_REGISTRY=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

## بازگشت به تنظیمات قبلی

```bash
npm config set registry https://registry.npmjs.org/
```

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
