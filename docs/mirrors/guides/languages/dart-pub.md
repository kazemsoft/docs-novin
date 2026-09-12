---
id: dart-pub
title: Dart / Flutter
sidebar_label: Dart / Flutter
description: تنظیم pub، Dart SDK و Flutter SDK برای استفاده از میرور نوین کلاود.
---

# Dart / Flutter

سه بخش مجزا: پکیج‌های pub.dev، آرشیو Dart SDK و آرشیو Flutter SDK.

## پیکربندی

برای پکیج‌های pub (Dart و Flutter):

```bash
export PUB_HOSTED_URL=https://mirror.novin.cloud/artifactory/api/pub/pub
```

برای دانلود خود Flutter SDK (شامل Dart SDK داخلش):

```bash
export FLUTTER_STORAGE_BASE_URL=https://mirror.novin.cloud/flutter-sdk
```

این‌ها را در `~/.bashrc` یا `~/.zshrc` قرار دهید تا دائمی شوند.

### دریافت مستقیم آرشیوها

اگر فقط خود SDK را می‌خواهید (بدون `flutter upgrade`):

```bash
curl -LO https://mirror.novin.cloud/dart-sdk/dart-sdk-linux-x64.zip
curl -LO https://mirror.novin.cloud/flutter-sdk/flutter_linux_3.24.5-stable.tar.xz
```

## بررسی

```bash
flutter doctor -v
dart pub get -v 2>&1 | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
ENV PUB_HOSTED_URL=https://mirror.novin.cloud/artifactory/api/pub/pub
ENV FLUTTER_STORAGE_BASE_URL=https://mirror.novin.cloud/flutter-sdk
RUN curl -LO https://mirror.novin.cloud/flutter-sdk/flutter_linux_3.24.5-stable.tar.xz \
 && tar xf flutter_linux_3.24.5-stable.tar.xz
```

## بازگشت به تنظیمات قبلی

```bash
unset PUB_HOSTED_URL
unset FLUTTER_STORAGE_BASE_URL
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
