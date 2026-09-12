---
id: archlinux
title: Arch Linux
sidebar_label: Arch Linux
description: تنظیم مخزن آرچ لینوکس روی میرور نوین کلاود برای pacman.
---

# Arch Linux

مخزن `archlinux` یک مخزن Generic است که ساختار دایرکتوری بالادستی
(`$repo/os/$arch`) را عیناً منعکس می‌کند و `pacman` از آن استفاده می‌کند.

## پیکربندی

از `mirrorlist` فعلی نسخه پشتیبان بگیرید.

```bash
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
```

خط زیر را در ابتدای `/etc/pacman.d/mirrorlist` اضافه کنید تا میرور با اولویت انتخاب شود.

```bash
echo 'Server = https://mirror.novin.cloud/archlinux/$repo/os/$arch' | \
  sudo tee /etc/pacman.d/mirrorlist.new
sudo sh -c 'cat /etc/pacman.d/mirrorlist >> /etc/pacman.d/mirrorlist.new'
sudo mv /etc/pacman.d/mirrorlist.new /etc/pacman.d/mirrorlist
```

:::note
متغیرهای `$repo` (مثل `core`, `extra`) و `$arch` (مثل `x86_64`) را خود `pacman` جایگزین می‌کند؛
نیازی به تغییر دستی نیست.
:::

## بررسی

```bash
sudo pacman -Syy
```

خروجی باید دانلود فایل‌های دیتابیس را از `mirror.novin.cloud` نشان دهد.

## استفاده در Docker / CI

```dockerfile
FROM archlinux:latest
RUN echo 'Server = https://mirror.novin.cloud/archlinux/$repo/os/$arch' > /etc/pacman.d/mirrorlist \
    && pacman -Syy --noconfirm
```

## بازگشت به تنظیمات قبلی

```bash
sudo mv /etc/pacman.d/mirrorlist.bak /etc/pacman.d/mirrorlist
sudo pacman -Syy
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
