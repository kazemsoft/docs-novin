---
id: ubuntu
title: Ubuntu
sidebar_label: Ubuntu
description: تنظیم مخزن اوبونتو روی میرور نوین کلاود برای apt.
---

# Ubuntu

مخزن `ubuntu` آینه‌ی کامل آرشیو رسمی اوبونتو است و `apt` از آن استفاده می‌کند.
بسته‌های امنیتی از مخزن جدای `ubuntu-security` سرو می‌شوند.

## پیکربندی

ابتدا از فایل تنظیمات فعلی نسخه پشتیبان بگیرید.

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

سپس فایل را با محتوای زیر جایگزین کنید. به‌جای `noble` نام کدنام نسخه‌ی خود را بگذارید
(`noble` برای ۲۴.۰۴، `jammy` برای ۲۲.۰۴).

```bash
sudo tee /etc/apt/sources.list > /dev/null <<'EOF'
deb https://mirror.novin.cloud/ubuntu/ noble main restricted universe multiverse
deb https://mirror.novin.cloud/ubuntu/ noble-updates main restricted universe multiverse
deb https://mirror.novin.cloud/ubuntu-security/ noble-security main restricted universe multiverse
deb https://mirror.novin.cloud/ubuntu/ noble-backports main restricted universe multiverse
EOF

sudo apt update
```

:::tip[اوبونتو ۲۴.۰۴ به بعد]
در نسخه‌های جدید تنظیمات ممکن است در `/etc/apt/sources.list.d/ubuntu.sources`
با قالب DEB822 باشد. فایل قبلی را پشتیبان بگیرید و آن را با این محتوا جایگزین کنید:

```
Types: deb
URIs: https://mirror.novin.cloud/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: https://mirror.novin.cloud/ubuntu-security/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```
:::

## بررسی

```bash
sudo apt update
apt-cache policy | grep mirror.novin.cloud
```

خروجی `apt update` باید آدرس‌های `mirror.novin.cloud` را نشان دهد، نه `archive.ubuntu.com`.

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN sed -i 's|http://archive.ubuntu.com/ubuntu|https://mirror.novin.cloud/ubuntu|g; \
            s|http://security.ubuntu.com/ubuntu|https://mirror.novin.cloud/ubuntu-security|g' \
            /etc/apt/sources.list \
    && apt-get update
```

## بازگشت به تنظیمات قبلی

```bash
sudo mv /etc/apt/sources.list.bak /etc/apt/sources.list
sudo apt update
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
