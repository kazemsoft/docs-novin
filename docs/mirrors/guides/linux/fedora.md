---
id: fedora
title: Fedora
sidebar_label: Fedora
description: تنظیم مخزن فدورا روی میرور نوین کلاود برای dnf.
---

# Fedora

مخزن `fedora` آینه‌ی مخزن رسمی Fedora است و `dnf` از آن استفاده می‌کند.

## پیکربندی

فایل‌های `.repo` را پشتیبان بگیرید، سپس `metalink` را غیرفعال و `baseurl` را به میرور اشاره دهید.

```bash
sudo cp -r /etc/yum.repos.d /etc/yum.repos.d.bak

sudo sed -e 's|^metalink=|#metalink=|g' \
  -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=https://mirror.novin.cloud/fedora|g' \
  -i.bak /etc/yum.repos.d/fedora.repo /etc/yum.repos.d/fedora-updates.repo

sudo dnf makecache
```

:::tip[انتخاب نسخه]
نسخه (`$releasever`) به‌صورت خودکار از سیستم‌عامل خوانده می‌شود؛ برای تغییر نسخه،
`/etc/dnf/dnf.conf` یا `--releasever` را در دستور `dnf` تنظیم کنید.
:::

## بررسی

```bash
sudo dnf repolist -v
dnf makecache
```

در خروجی، آدرس `baseurl` باید `mirror.novin.cloud/fedora` باشد.

## استفاده در Docker / CI

```dockerfile
FROM fedora:40
RUN sed -e 's|^metalink=|#metalink=|g' \
        -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=https://mirror.novin.cloud/fedora|g' \
        -i /etc/yum.repos.d/fedora.repo /etc/yum.repos.d/fedora-updates.repo \
    && dnf makecache
```

## بازگشت به تنظیمات قبلی

```bash
sudo rm -rf /etc/yum.repos.d
sudo mv /etc/yum.repos.d.bak /etc/yum.repos.d
sudo dnf makecache
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
