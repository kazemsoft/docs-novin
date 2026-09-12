---
id: rubygems
title: RubyGems
sidebar_label: RubyGems
description: تنظیم gem و Bundler برای دریافت پکیج‌های Ruby از میرور نوین کلاود.
---

# RubyGems

آینه‌ی rubygems.org برای دستور `gem` و برای Bundler.

## پیکربندی

به‌صورت سراسری با دستور `gem`:

```bash
gem sources --remove https://rubygems.org/
gem sources --add https://mirror.novin.cloud/artifactory/api/gems/gems/
```

برای یک پروژه با Bundler، در `Gemfile`:

```ruby
source "https://mirror.novin.cloud/artifactory/api/gems/gems/"
```

یا بدون تغییر `Gemfile`، فقط برای این ماشین:

```bash
bundle config mirror.https://rubygems.org https://mirror.novin.cloud/artifactory/api/gems/gems/
```

## بررسی

```bash
gem sources --list
```

باید فقط آدرس میرور را نشان دهد. برای Bundler:

```bash
bundle install --verbose | grep mirror.novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM ruby:3.3
RUN bundle config mirror.https://rubygems.org https://mirror.novin.cloud/artifactory/api/gems/gems/
WORKDIR /app
COPY . .
RUN bundle install
```

## بازگشت به تنظیمات قبلی

```bash
gem sources --remove https://mirror.novin.cloud/artifactory/api/gems/gems/
gem sources --add https://rubygems.org/
bundle config --delete mirror.https://rubygems.org
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
