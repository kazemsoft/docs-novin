---
id: epel
title: EPEL
sidebar_label: EPEL
description: تنظیم مخزن EPEL روی میرور نوین کلاود برای dnf.
---

# EPEL

مخزن `epel` آینه‌ی Extra Packages for Enterprise Linux است و معمولاً کنار
Rocky، AlmaLinux یا CentOS Stream با `dnf` استفاده می‌شود.

## پیکربندی

فایل‌های `.repo` مربوط به EPEL را پشتیبان بگیرید، سپس `metalink` را غیرفعال و `baseurl` را به میرور اشاره دهید.

```bash
sudo cp -r /etc/yum.repos.d /etc/yum.repos.d.bak

sudo sed -e 's|^metalink=|#metalink=|g' \
  -e 's|^#baseurl=https://download.example/pub/epel|baseurl=https://mirror.novin.cloud/epel|g' \
  -i.bak /etc/yum.repos.d/epel*.repo

sudo dnf makecache
```

:::note
اگر بسته‌ی `epel-release` نصب نیست ابتدا آن را نصب کنید تا فایل‌های `.repo` ساخته شوند،
سپس دستور بالا را اجرا کنید.
:::

## بررسی

```bash
sudo dnf repolist -v
dnf makecache
```

در خروجی، آدرس `baseurl` باید `mirror.novin.cloud/epel` باشد.

## استفاده در Docker / CI

```dockerfile
FROM rockylinux:9
RUN dnf install -y epel-release \
    && sed -e 's|^metalink=|#metalink=|g' \
           -e 's|^#baseurl=https://download.example/pub/epel|baseurl=https://mirror.novin.cloud/epel|g' \
           -i /etc/yum.repos.d/epel*.repo \
    && dnf makecache
```

## بازگشت به تنظیمات قبلی

```bash
sudo rm -rf /etc/yum.repos.d
sudo mv /etc/yum.repos.d.bak /etc/yum.repos.d
sudo dnf makecache
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
