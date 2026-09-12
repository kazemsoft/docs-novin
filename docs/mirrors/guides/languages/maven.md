---
id: maven
title: Maven
sidebar_label: Maven
description: تنظیم Maven و دریافت تاربال توزیع Maven از میرور نوین کلاود.
---

# Maven

مسیرهای Maven Central، Google، Gradle Plugin Portal و Clojars را در یک virtual repository ترکیب می‌کند.

## پیکربندی

در `~/.m2/settings.xml` (اعمال روی همه‌ی پروژه‌ها):

```xml
<settings>
  <mirrors>
    <mirror>
      <id>novin</id>
      <name>Novin Cloud Mirror</name>
      <url>https://mirror.novin.cloud/artifactory/maven</url>
      <mirrorOf>*</mirrorOf>
    </mirror>
  </mirrors>
</settings>
```

اگر فقط یک مخزن مشخص (مثلاً Maven Central) لازم دارید، می‌توانید مستقیم در `pom.xml` پروژه اضافه کنید:

```xml
<repositories>
  <repository>
    <id>novin-central</id>
    <url>https://mirror.novin.cloud/artifactory/maven-central</url>
  </repository>
</repositories>
```

مخزن‌های دیگر با همین الگو در دسترس‌اند: `maven-google`، `maven-gradle-plugins`، `maven-clojars`.

### تاربال توزیع Maven (برای mvnw)

اگر پروژه از Maven Wrapper استفاده می‌کند، در `.mvn/wrapper/maven-wrapper.properties`:

```properties
distributionUrl=https://mirror.novin.cloud/maven-distributions/apache-maven-3.9.9-bin.zip
```

## بررسی

```bash
mvn -X dependency:resolve 2>&1 | grep mirror.novin.cloud
```

اگر آدرس میرور را در لاگ ببینید، دانلود از آنجا انجام می‌شود.

## استفاده در Docker / CI

```dockerfile
FROM maven:3.9-eclipse-temurin-21
COPY settings.xml /root/.m2/settings.xml
WORKDIR /app
COPY . .
RUN mvn -B package
```

## بازگشت به تنظیمات قبلی

بلوک `<mirror>` را از `~/.m2/settings.xml` حذف کنید، یا فایل تنظیمات سفارشی را نادیده بگیرید:

```bash
mvn -s /dev/null package
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
