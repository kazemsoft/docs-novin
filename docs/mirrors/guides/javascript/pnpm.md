---
id: pnpm
title: pnpm
sidebar_label: pnpm
description: تنظیم pnpm برای دریافت پکیج از میرور نوین کلاود.
---

# pnpm

pnpm هم از همان رجیستری npm میرور نوین کلاود استفاده می‌کند: `https://mirror.novin.cloud/artifactory/api/npm/npm/`.

## پیکربندی

```bash
pnpm config set registry https://mirror.novin.cloud/artifactory/api/npm/npm/
```

یا در `.npmrc` پروژه:

```ini
registry=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

## بررسی

```bash
pnpm config get registry
pnpm view express version
```

## استفاده در Docker / CI

```dockerfile
ENV NPM_CONFIG_REGISTRY=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

## بازگشت به تنظیمات قبلی

```bash
pnpm config set registry https://registry.npmjs.org/
```

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
