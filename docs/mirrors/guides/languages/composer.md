---
id: composer
title: Composer
sidebar_label: Composer
description: تنظیم Composer برای دریافت پکیج‌های PHP از میرور نوین کلاود.
---

# Composer

آینه‌ی Packagist برای PHP، از طریق API مخصوص Composer در Artifactory.

## پیکربندی

به‌صورت سراسری (روی همه‌ی پروژه‌ها):

```bash
composer config -g repos.packagist composer https://mirror.novin.cloud/artifactory/api/composer/composer
```

برای یک پروژه‌ی خاص، در `composer.json`:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://mirror.novin.cloud/artifactory/api/composer/composer"
    }
  ]
}
```

## بررسی

```bash
composer diagnose
```

یا با اجرای verbose ببینید درخواست‌ها به کدام آدرس می‌روند:

```bash
composer install -vvv 2>&1 | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM composer:2
COPY . /app
WORKDIR /app
RUN composer config -g repos.packagist composer https://mirror.novin.cloud/artifactory/api/composer/composer \
 && composer install --no-dev --optimize-autoloader
```

:::tip
در CI بهتر است این تنظیم را با متغیر محیطی `COMPOSER_HOME` هم‌راستا کنید تا کش بین اجراها حفظ شود.
:::

## بازگشت به تنظیمات قبلی

```bash
composer config -g --unset repos.packagist
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
