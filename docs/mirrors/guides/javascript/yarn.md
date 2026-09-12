---
id: yarn
title: Yarn
sidebar_label: Yarn
description: تنظیم Yarn Classic و Yarn Berry برای دریافت پکیج از میرور نوین کلاود.
---

# Yarn

Yarn هم مثل npm از رجیستری `https://mirror.novin.cloud/artifactory/api/npm/npm/` استفاده می‌کند.

## پیکربندی

Yarn Classic (نسخه ۱):

```bash
yarn config set registry https://mirror.novin.cloud/artifactory/api/npm/npm/
```

Yarn Berry (نسخه ۲ به بعد) در `.yarnrc.yml` پروژه:

```yaml
npmRegistryServer: "https://mirror.novin.cloud/artifactory/api/npm/npm/"
```

:::tip
اگر پروژه از `.npmrc` هم استفاده می‌کند، همان تنظیم registry کافی است و نیازی به تکرار نیست.
:::

## بررسی

```bash
yarn config get registry
yarn info express version
```

## استفاده در Docker / CI

```dockerfile
ENV YARN_REGISTRY=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

برای Yarn Berry از طریق متغیر محیطی:

```dockerfile
ENV YARN_NPM_REGISTRY_SERVER=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

## بازگشت به تنظیمات قبلی

```bash
yarn config set registry https://registry.yarnpkg.com
```

و برای Yarn Berry، حذف یا تغییر `npmRegistryServer` در `.yarnrc.yml`.

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
