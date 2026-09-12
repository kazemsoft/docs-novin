---
id: kali
title: Kali Linux
sidebar_label: Kali Linux
description: تنظیم مخزن کالی لینوکس روی میرور نوین کلاود برای apt.
---

# Kali Linux

مخزن `kali` آینه‌ی آرشیو Kali Linux (شاخه‌ی rolling) است و `apt` از آن استفاده می‌کند.

## پیکربندی

از فایل تنظیمات فعلی نسخه پشتیبان بگیرید.

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

فایل را با محتوای زیر جایگزین کنید.

```bash
sudo tee /etc/apt/sources.list > /dev/null <<'EOF'
deb https://mirror.novin.cloud/kali/ kali-rolling main contrib non-free non-free-firmware
EOF

sudo apt update
```

:::note
کالی فقط شاخه‌ی `kali-rolling` را نگه‌داری می‌کند؛ نیازی به کدنام نسخه مثل دبیان یا اوبونتو نیست.
:::

## بررسی

```bash
sudo apt update
apt-cache policy | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM kalilinux/kali-rolling
RUN sed -i 's|http.kali.org|mirror.novin.cloud|g' /etc/apt/sources.list \
    && apt-get update
```

## بازگشت به تنظیمات قبلی

```bash
sudo mv /etc/apt/sources.list.bak /etc/apt/sources.list
sudo apt update
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
