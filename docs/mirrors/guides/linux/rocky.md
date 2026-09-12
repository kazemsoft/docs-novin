---
id: rocky
title: Rocky Linux
sidebar_label: Rocky Linux
description: تنظیم مخزن راکی لینوکس روی میرور نوین کلاود برای dnf.
---

# Rocky Linux

مخزن `rocky` آینه‌ی مخزن رسمی Rocky Linux است و `dnf`/`yum` از آن استفاده می‌کند.

## پیکربندی

فایل‌های `.repo` را پشتیبان بگیرید، سپس `mirrorlist` را غیرفعال و `baseurl` را به میرور اشاره دهید.

```bash
sudo cp -r /etc/yum.repos.d /etc/yum.repos.d.bak

sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
  -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=https://mirror.novin.cloud/rocky|g' \
  -i.bak /etc/yum.repos.d/rocky*.repo

sudo dnf makecache
```

:::tip[انتخاب نسخه]
نسخه (`8`، `9` و…) در خود فایل‌های `.repo` مشخص شده و نیازی به تغییر دستی ندارد؛
فقط مطمئن شوید نسخه‌ی سیستم‌عامل با نسخه‌ی موجود در مخزن میرور هم‌خوان است.
:::

## بررسی

```bash
sudo dnf repolist -v
dnf makecache
```

در خروجی، آدرس `baseurl` باید `mirror.novin.cloud/rocky` باشد.

## استفاده در Docker / CI

```dockerfile
FROM rockylinux:9
RUN sed -e 's|^mirrorlist=|#mirrorlist=|g' \
        -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=https://mirror.novin.cloud/rocky|g' \
        -i /etc/yum.repos.d/rocky*.repo \
    && dnf makecache
```

## بازگشت به تنظیمات قبلی

```bash
sudo rm -rf /etc/yum.repos.d
sudo mv /etc/yum.repos.d.bak /etc/yum.repos.d
sudo dnf makecache
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
