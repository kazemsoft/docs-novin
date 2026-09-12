---
id: alpine
title: Alpine
sidebar_label: Alpine
description: تنظیم مخزن آلپاین روی میرور نوین کلاود برای apk.
---

# Alpine

مخزن `alpine` آینه‌ی آرشیو Alpine Linux است و `apk` از آن استفاده می‌کند.
از این مخزن معمولاً در ایمیج‌های سبک Docker استفاده می‌شود.

## پیکربندی

از فایل تنظیمات فعلی نسخه پشتیبان بگیرید.

```bash
sudo cp /etc/apk/repositories /etc/apk/repositories.bak
```

فایل را با محتوای زیر جایگزین کنید. به‌جای `v3.20` نسخه‌ی خود را بگذارید
(با `cat /etc/alpine-release` قابل بررسی است؛ برای نسخه‌ی in-development از `edge` استفاده کنید).

```bash
sudo tee /etc/apk/repositories > /dev/null <<'EOF'
https://mirror.novin.cloud/alpine/v3.20/main
https://mirror.novin.cloud/alpine/v3.20/community
EOF

sudo apk update
```

:::note
اگر از شاخه‌ی `edge` استفاده می‌کنید مسیرها به‌صورت `https://mirror.novin.cloud/alpine/edge/main` خواهند بود.
:::

## بررسی

```bash
sudo apk update
apk policy busybox 2>/dev/null || apk info -a busybox
```

خروجی `apk update` باید آدرس `mirror.novin.cloud` را به‌جای `dl-cdn.alpinelinux.org` نشان دهد.

## استفاده در Docker / CI

```dockerfile
FROM alpine:3.20
RUN sed -i 's|dl-cdn.alpinelinux.org|mirror.novin.cloud/alpine|g' /etc/apk/repositories \
    && apk update
```

## بازگشت به تنظیمات قبلی

```bash
sudo mv /etc/apk/repositories.bak /etc/apk/repositories
sudo apk update
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
