---
id: debian
title: Debian
sidebar_label: Debian
description: تنظیم مخزن دبیان روی میرور نوین کلاود برای apt.
---

# Debian

مخزن `debian` آینه‌ی آرشیو اصلی دبیان است و `apt` از آن استفاده می‌کند.
بسته‌های امنیتی از `debian-security` و نسخه‌های قدیمی/آرشیوشده از `debian-archive` سرو می‌شوند.

## پیکربندی

از فایل تنظیمات فعلی نسخه پشتیبان بگیرید.

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

فایل را با محتوای زیر جایگزین کنید. به‌جای `bookworm` نام کدنام نسخه‌ی خود را بگذارید
(`bookworm` برای دبیان ۱۲، `bullseye` برای دبیان ۱۱).

```bash
sudo tee /etc/apt/sources.list > /dev/null <<'EOF'
deb https://mirror.novin.cloud/debian/ bookworm main contrib non-free non-free-firmware
deb https://mirror.novin.cloud/debian/ bookworm-updates main contrib non-free non-free-firmware
deb https://mirror.novin.cloud/debian-security/ bookworm-security main contrib non-free non-free-firmware
EOF

sudo apt update
```

:::tip[دبیان ۱۲ به بعد]
در نسخه‌های جدید تنظیمات ممکن است در `/etc/apt/sources.list.d/debian.sources`
با قالب DEB822 باشد. فایل را پشتیبان بگیرید و جایگزین کنید:

```
Types: deb
URIs: https://mirror.novin.cloud/debian/
Suites: bookworm bookworm-updates
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: https://mirror.novin.cloud/debian-security/
Suites: bookworm-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```
:::

برای نسخه‌های قدیمی (مثل `stretch` یا `jessie`) که از پشتیبانی رسمی خارج شده‌اند،
به‌جای `debian` از مخزن `debian-archive` استفاده کنید.

## بررسی

```bash
sudo apt update
apt-cache policy | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM debian:bookworm
RUN sed -i 's|deb.debian.org|mirror.novin.cloud|g; \
            s|security.debian.org|mirror.novin.cloud/debian-security|g' \
            /etc/apt/sources.list.d/debian.sources 2>/dev/null || \
    sed -i 's|deb.debian.org|mirror.novin.cloud|g' /etc/apt/sources.list \
    && apt-get update
```

## بازگشت به تنظیمات قبلی

```bash
sudo mv /etc/apt/sources.list.bak /etc/apt/sources.list
sudo apt update
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
