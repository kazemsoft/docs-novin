---
id: centos-stream
title: CentOS Stream
sidebar_label: CentOS Stream
description: تنظیم مخزن سنت‌اواس استریم روی میرور نوین کلاود برای dnf.
---

# CentOS Stream

مخزن `centos-stream` آینه‌ی مخزن رسمی CentOS Stream است و `dnf` از آن استفاده می‌کند.

## پیکربندی

فایل‌های `.repo` را پشتیبان بگیرید، سپس `mirrorlist` را غیرفعال و `baseurl` را به میرور اشاره دهید.

```bash
sudo cp -r /etc/yum.repos.d /etc/yum.repos.d.bak

sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
  -e 's|^#baseurl=http://mirror.stream.centos.org|baseurl=https://mirror.novin.cloud/centos-stream|g' \
  -i.bak /etc/yum.repos.d/centos*.repo

sudo dnf makecache
```

:::tip[انتخاب نسخه]
نسخه (`9-stream`، `10-stream` و…) در خود فایل‌های `.repo` مشخص شده است؛ مطمئن شوید
نسخه‌ی سیستم‌عامل با نسخه‌ی موجود در مخزن میرور هم‌خوان است.
:::

## بررسی

```bash
sudo dnf repolist -v
dnf makecache
```

در خروجی، آدرس `baseurl` باید `mirror.novin.cloud/centos-stream` باشد.

## استفاده در Docker / CI

```dockerfile
FROM quay.io/centos/centos:stream9
RUN sed -e 's|^mirrorlist=|#mirrorlist=|g' \
        -e 's|^#baseurl=http://mirror.stream.centos.org|baseurl=https://mirror.novin.cloud/centos-stream|g' \
        -i /etc/yum.repos.d/centos*.repo \
    && dnf makecache
```

## بازگشت به تنظیمات قبلی

```bash
sudo rm -rf /etc/yum.repos.d
sudo mv /etc/yum.repos.d.bak /etc/yum.repos.d
sudo dnf makecache
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
