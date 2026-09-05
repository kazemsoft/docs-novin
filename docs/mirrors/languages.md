---
id: languages
title: زبان‌های برنامه‌نویسی
sidebar_label: زبان‌ها و پکیج‌منیجرها
sidebar_position: 3
description: تنظیم npm، PyPI، Go، Maven، Gradle، Composer، RubyGems، Conda و دیگر پکیج‌منیجرها روی میرور نوین کلاود.
---

# زبان‌ها و پکیج‌منیجرها

هر اکوسیستم روی Artifactory مسیر API مخصوص خودش را دارد. آدرس‌های زیر آماده‌ی استفاده‌اند.

## npm / Node.js

```bash
npm config set registry https://mirror.novin.cloud/artifactory/api/npm/npm/
```

یا در فایل `.npmrc` پروژه:

```ini
registry=https://mirror.novin.cloud/artifactory/api/npm/npm/
```

برای بازگشت:

```bash
npm config set registry https://registry.npmjs.org/
```

:::tip
`yarn`, `pnpm` و `bun` هم از همین `.npmrc` پیروی می‌کنند.
:::

## PyPI / pip

```bash
pip config set global.index-url https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

یا در `~/.pip/pip.conf` (لینوکس/مک) و `%APPDATA%\pip\pip.ini` (ویندوز):

```ini
[global]
index-url = https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

برای یک نصب تکی بدون تغییر تنظیمات:

```bash
pip install requests -i https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

## Go Modules

```bash
go env -w GOPROXY=https://mirror.novin.cloud/artifactory/api/go/go,direct
```

اگر ماژول خصوصی دارید، آن را از پراکسی مستثنا کنید:

```bash
go env -w GOPRIVATE=git.example.ir/*
```

## Maven

در `~/.m2/settings.xml`:

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

## Gradle

در `build.gradle` (یا `settings.gradle`):

```groovy
repositories {
    maven { url "https://mirror.novin.cloud/artifactory/gradle" }
}
```

برای اعمال روی همه‌ی پروژه‌ها، همین بلوک را در `~/.gradle/init.gradle` قرار دهید.

## Composer (PHP)

```bash
composer config -g repos.packagist composer https://mirror.novin.cloud/artifactory/api/composer/composer
```

## RubyGems

```bash
gem sources --remove https://rubygems.org/
gem sources --add https://mirror.novin.cloud/artifactory/api/gems/gems/
```

برای Bundler در `Gemfile`:

```ruby
source "https://mirror.novin.cloud/artifactory/api/gems/gems/"
```

## Conda

در `~/.condarc`:

```yaml
channels:
  - https://mirror.novin.cloud/artifactory/api/conda/conda/main
default_channels:
  - https://mirror.novin.cloud/artifactory/api/conda/conda/main
```

## Rust / Cargo

نصب زنجیره‌ی ابزار از میرور:

```bash
export RUSTUP_DIST_SERVER=https://mirror.novin.cloud/rustup
```

## سایر مخزن‌ها

مخزن‌های `cran` (R)، `conan` (C/C++)، `pub` (Dart/Flutter)، `sbt` و `ivy` (Scala/JVM)،
`cocoapods` و `swift` (iOS)، `bower`، `cpan` (Perl)، `hackage` (Haskell)، `luarocks`
و `nix` نیز روی همین دامنه در دسترس‌اند. الگوی آدرس یکسان است:

```
https://mirror.novin.cloud/artifactory/api/<نوع>/<نام-مخزن>/
```

فهرست کامل در صفحه‌ی [همه‌ی مخزن‌ها](./all-repositories).
