---
id: sbt
title: sbt
sidebar_label: sbt
description: تنظیم sbt و Ivy برای دریافت وابستگی‌های Scala از میرور نوین کلاود.
---

# sbt

مخزن‌های `sbt`، `sbt-central`، `sbt-scala` برای پروژه‌های Scala، به‌علاوه‌ی یک مخزن Ivy جدا.

## پیکربندی

در فایل `~/.sbt/repositories` (اعمال روی همه‌ی پروژه‌ها):

```ini
[repositories]
  local
  novin-sbt: https://mirror.novin.cloud/artifactory/sbt
  novin-sbt-central: https://mirror.novin.cloud/artifactory/sbt-central
  novin-sbt-scala: https://mirror.novin.cloud/artifactory/sbt-scala
  novin-ivy: https://mirror.novin.cloud/artifactory/ivy, [organisation]/[module]/[revision]/[type]s/[artifact](-[classifier]).[ext]
```

sbt این فایل را فقط با یک فلگ اضافی در نظر می‌گیرد؛ آن را در `~/.sbtopts` یا هنگام اجرا بگذارید:

```bash
sbt -Dsbt.override.build.repos=true
```

برای این‌که همیشه فعال باشد، در `~/.sbtopts`:

```
-Dsbt.override.build.repos=true
```

## بررسی

```bash
sbt "show resolvers"
```

آدرس‌های میرور باید در خروجی resolvers دیده شوند.

## استفاده در Docker / CI

```dockerfile
FROM sbtscala/scala-sbt:eclipse-temurin-21_1.10.1_3.5.1
COPY repositories /root/.sbt/repositories
ENV SBT_OPTS="-Dsbt.override.build.repos=true"
WORKDIR /app
COPY . .
RUN sbt compile
```

## بازگشت به تنظیمات قبلی

فایل `~/.sbt/repositories` را حذف کنید و `-Dsbt.override.build.repos=true` را از `~/.sbtopts` بردارید.

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
