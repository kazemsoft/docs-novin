---
id: gradle
title: Gradle
sidebar_label: Gradle
description: تنظیم مخزن‌های Gradle و دریافت توزیع Gradle از میرور نوین کلاود.
---

# Gradle

هم وابستگی‌های پروژه (jar) و هم خود توزیع Gradle (zip) از میرور قابل دریافت‌اند.

## پیکربندی

در `settings.gradle` (یا `settings.gradle.kts`) پروژه:

```groovy
dependencyResolutionManagement {
    repositories {
        maven { url "https://mirror.novin.cloud/artifactory/gradle" }
    }
}

pluginManagement {
    repositories {
        maven { url "https://mirror.novin.cloud/artifactory/gradle-plugins" }
        gradlePluginPortal()
    }
}
```

مخزن `gradle-google` هم برای وابستگی‌های اندروید در دسترس است.

برای اعمال روی همه‌ی پروژه‌های ماشین، همان بلوک `repositories` را در `~/.gradle/init.gradle` قرار دهید:

```groovy
allprojects {
    repositories {
        maven { url "https://mirror.novin.cloud/artifactory/gradle" }
    }
}
```

### توزیع Gradle (برای gradlew)

در `gradle/wrapper/gradle-wrapper.properties`:

```properties
distributionUrl=https://mirror.novin.cloud/gradle-distributions/gradle-8.10-bin.zip
```

## بررسی

```bash
./gradlew build --info | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM gradle:8.10-jdk21
COPY init.gradle /root/.gradle/init.gradle
WORKDIR /app
COPY . .
RUN gradle build --no-daemon
```

## بازگشت به تنظیمات قبلی

بلوک `maven { url ... }` را از `settings.gradle` یا `~/.gradle/init.gradle` حذف کنید و `distributionUrl` را به آدرس اصلی `services.gradle.org` برگردانید.

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
