---
id: conan
title: Conan
sidebar_label: Conan
description: تنظیم Conan برای دریافت پکیج‌های C/C++ از میرور نوین کلاود.
---

# Conan

آینه‌ی ConanCenter برای پکیج‌های C/C++، از طریق API مخصوص Conan در Artifactory.

## پیکربندی

افزودن میرور به‌عنوان یک remote:

```bash
conan remote add novin https://mirror.novin.cloud/artifactory/api/conan/conan
```

برای این‌که فقط همین remote استفاده شود (و conancenter پیش‌فرض غیرفعال شود):

```bash
conan remote disable conancenter
```

این تنظیم سراسری است و روی همه‌ی پروژه‌های همان کاربر اعمال می‌شود؛ برای یک پروژه‌ی خاص نیازی به فایل جدا نیست، فقط از همین remote استفاده کنید.

## بررسی

```bash
conan remote list
```

باید `novin` را با آدرس میرور نشان دهد. برای تست دانلود واقعی:

```bash
conan install . --build=missing -vv 2>&1 | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM conanio/gcc11
RUN conan remote add novin https://mirror.novin.cloud/artifactory/api/conan/conan \
 && conan remote disable conancenter
WORKDIR /app
COPY . .
RUN conan install . --build=missing
```

## بازگشت به تنظیمات قبلی

```bash
conan remote enable conancenter
conan remote remove novin
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
