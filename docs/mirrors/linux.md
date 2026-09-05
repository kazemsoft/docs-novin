---
id: linux
title: پکیج‌های لینوکس
sidebar_label: پکیج‌های لینوکس
sidebar_position: 2
description: تنظیم مخزن پکیج اوبونتو، دبیان، آلپاین، راکی، آلما، فدورا، EPEL و CentOS Stream روی میرور نوین کلاود.
---

# پکیج‌های لینوکس

با تغییر آدرس مخزن به میرور نوین کلاود، `apt` و `dnf` پکیج‌ها را از داخل ایران دریافت می‌کنند.

:::tip[قبل از شروع]
از فایل تنظیمات فعلی نسخه پشتیبان بگیرید تا در صورت نیاز بتوانید برگردید.
:::

## Ubuntu

فایل `/etc/apt/sources.list` را با محتوای زیر جایگزین کنید.
به‌جای `noble` نام کدنام نسخه‌ی خود را بگذارید (`noble` برای ۲۴.۰۴).

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

sudo tee /etc/apt/sources.list > /dev/null <<'EOF'
deb https://mirror.novin.cloud/ubuntu/ noble main restricted universe multiverse
deb https://mirror.novin.cloud/ubuntu/ noble-updates main restricted universe multiverse
deb https://mirror.novin.cloud/ubuntu/ noble-security main restricted universe multiverse
deb https://mirror.novin.cloud/ubuntu/ noble-backports main restricted universe multiverse
EOF

sudo apt update
```

در اوبونتو ۲۴.۰۴ به بعد ممکن است تنظیمات در `/etc/apt/sources.list.d/ubuntu.sources`
با قالب DEB822 باشد. در آن صورت مقدار `URIs` را به `https://mirror.novin.cloud/ubuntu/` تغییر دهید.

## Debian

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

sudo tee /etc/apt/sources.list > /dev/null <<'EOF'
deb https://mirror.novin.cloud/debian/ bookworm main contrib non-free non-free-firmware
deb https://mirror.novin.cloud/debian/ bookworm-updates main contrib non-free non-free-firmware
EOF

sudo apt update
```

## Alpine

```bash
sudo cp /etc/apk/repositories /etc/apk/repositories.bak

sudo tee /etc/apk/repositories > /dev/null <<'EOF'
https://mirror.novin.cloud/alpine/v3.20/main
https://mirror.novin.cloud/alpine/v3.20/community
EOF

sudo apk update
```

## Rocky Linux

```bash
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
  -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=https://mirror.novin.cloud/rocky|g' \
  -i.bak /etc/yum.repos.d/rocky*.repo

sudo dnf makecache
```

## AlmaLinux

```bash
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
  -e 's|^# baseurl=https://repo.almalinux.org/almalinux|baseurl=https://mirror.novin.cloud/almalinux|g' \
  -i.bak /etc/yum.repos.d/almalinux*.repo

sudo dnf makecache
```

## Fedora / EPEL / CentOS Stream

هر سه از همان الگو پیروی می‌کنند: `mirrorlist` را غیرفعال و `baseurl` را به میرور اشاره دهید.

```bash
# نمونه برای EPEL
sudo sed -e 's|^metalink=|#metalink=|g' \
  -e 's|^#baseurl=https://download.example/pub/epel|baseurl=https://mirror.novin.cloud/epel|g' \
  -i.bak /etc/yum.repos.d/epel*.repo

sudo dnf makecache
```

نام مخزن‌ها روی میرور: `fedora`، `epel`، `centos-stream`.

## Kali Linux

```bash
sudo tee /etc/apt/sources.list > /dev/null <<'EOF'
deb https://mirror.novin.cloud/kali/ kali-rolling main contrib non-free non-free-firmware
EOF

sudo apt update
```

## بازگشت به حالت قبل

```bash
# دبیان/اوبونتو/کالی
sudo mv /etc/apt/sources.list.bak /etc/apt/sources.list && sudo apt update

# آلپاین
sudo mv /etc/apk/repositories.bak /etc/apk/repositories && sudo apk update
```
