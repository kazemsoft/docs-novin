---
id: almalinux
title: AlmaLinux
sidebar_label: AlmaLinux
description: تنظیم مخزن آلمالینوکس روی میرور نوین کلاود برای dnf.
---

# AlmaLinux

مخزن `almalinux` آینه‌ی مخزن رسمی AlmaLinux است و `dnf`/`yum` از آن استفاده می‌کند.

## پیکربندی

فایل‌های `.repo` را پشتیبان بگیرید، سپس `mirrorlist` را غیرفعال و `baseurl` را به میرور اشاره دهید.

```bash
sudo cp -r /etc/yum.repos.d /etc/yum.repos.d.bak

sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
  -e 's|^# baseurl=https://repo.almalinux.org/almalinux|baseurl=https://mirror.novin.cloud/almalinux|g' \
  -i.bak /etc/yum.repos.d/almalinux*.repo

sudo dnf makecache
```

:::tip[انتخاب نسخه]
نسخه (`8`، `9` و…) در خود فایل‌های `.repo` مشخص شده است. فقط مطمئن شوید نسخه‌ی
سیستم‌عامل با نسخه‌ی موجود در مخزن میرور هم‌خوان است.
:::

## بررسی

```bash
sudo dnf repolist -v
dnf makecache
```

در خروجی، آدرس `baseurl` باید `mirror.novin.cloud/almalinux` باشد.

## استفاده در Docker / CI

```dockerfile
FROM almalinux:9
RUN sed -e 's|^mirrorlist=|#mirrorlist=|g' \
        -e 's|^# baseurl=https://repo.almalinux.org/almalinux|baseurl=https://mirror.novin.cloud/almalinux|g' \
        -i /etc/yum.repos.d/almalinux*.repo \
    && dnf makecache
```

## بازگشت به تنظیمات قبلی

```bash
sudo rm -rf /etc/yum.repos.d
sudo mv /etc/yum.repos.d.bak /etc/yum.repos.d
sudo dnf makecache
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
