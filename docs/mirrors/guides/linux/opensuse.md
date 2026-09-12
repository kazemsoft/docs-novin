---
id: opensuse
title: openSUSE
sidebar_label: openSUSE
description: تنظیم مخزن اوپن‌سوزه روی میرور نوین کلاود برای zypper.
---

# openSUSE

مخزن `opensuse` یک مخزن Generic است که ساختار دایرکتوری `download.opensuse.org`
را عیناً منعکس می‌کند و `zypper` از آن استفاده می‌کند.

## پیکربندی

مخزن‌های فعلی را فهرست و در صورت نیاز پشتیبان بگیرید.

```bash
sudo zypper lr -u > /tmp/zypper-repos.bak
```

سپس مخزن‌های رسمی را حذف و مخزن میرور را اضافه کنید. به‌جای `15.6` نسخه‌ی خود را بگذارید.

```bash
sudo zypper rr repo-oss repo-update 2>/dev/null

sudo zypper ar -f https://mirror.novin.cloud/opensuse/distribution/leap/15.6/repo/oss/ repo-oss
sudo zypper ar -f https://mirror.novin.cloud/opensuse/update/leap/15.6/oss/ repo-update

sudo zypper refresh
```

:::tip[Tumbleweed]
برای شاخه‌ی rolling از مسیر `https://mirror.novin.cloud/opensuse/tumbleweed/repo/oss/` استفاده کنید.
:::

## بررسی

```bash
sudo zypper refresh
zypper lr -u
```

آدرس مخزن‌ها در ستون URI باید `mirror.novin.cloud` باشد.

## استفاده در Docker / CI

```dockerfile
FROM opensuse/leap:15.6
RUN zypper rr repo-oss repo-update 2>/dev/null; \
    zypper ar -f https://mirror.novin.cloud/opensuse/distribution/leap/15.6/repo/oss/ repo-oss && \
    zypper --gpg-auto-import-keys refresh
```

## بازگشت به تنظیمات قبلی

```bash
sudo zypper rr repo-oss repo-update
sudo zypper ar -f http://download.opensuse.org/distribution/leap/15.6/repo/oss/ repo-oss
sudo zypper refresh
```

برای مطالعه‌ی بیشتر به [پکیج‌های لینوکس](../../linux) مراجعه کنید.
