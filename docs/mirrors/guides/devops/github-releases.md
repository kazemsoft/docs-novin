---
id: github-releases
title: GitHub Releases
sidebar_label: GitHub Releases
description: دریافت فایل‌های ریلیز و raw گیت‌هاب از میرور نوین کلاود بدون نیاز به تحریم‌شکن.
---

# GitHub Releases

این صفحه دریافت فایل‌های ریلیز، محتوای raw گیت‌هاب و پکیج‌های گیت‌لب را از میرور
نوین کلاود پوشش می‌دهد.

## پیکربندی

قاعده‌ی کلی: هر آدرس `github.com/<owner>/<repo>/releases/download/...` را با
پیشوند `mirror.novin.cloud/github-releases` جایگزین کنید:

```
https://github.com/<owner>/<repo>/releases/download/<tag>/<asset>
→
https://mirror.novin.cloud/github-releases/<owner>/<repo>/releases/download/<tag>/<asset>
```

برای فایل‌های raw (`raw.githubusercontent.com`):

```
https://mirror.novin.cloud/github-raw/<owner>/<repo>/<branch>/<path>
```

پکیج‌های گیت‌لب هم با همین الگو، از مخزن `gitlab-packages` میرور می‌شوند.

## بررسی

```bash
curl -LO https://mirror.novin.cloud/github-releases/cli/cli/releases/download/v2.58.0/gh_2.58.0_linux_amd64.tar.gz
```

اگر دانلود بدون تحریم‌شکن و با سرعت داخلی کامل شود، مخزن به‌درستی کار می‌کند.

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN curl -LO https://mirror.novin.cloud/github-releases/cli/cli/releases/download/v2.58.0/gh_2.58.0_linux_amd64.tar.gz \
    && tar -xzf gh_2.58.0_linux_amd64.tar.gz
```

در اسکریپت‌های CI که آدرس `github.com` هاردکد شده، کافی است `github.com` را با
`mirror.novin.cloud/github-releases` جایگزین کنید — بقیه‌ی مسیر ثابت می‌ماند.

## بازگشت به تنظیمات قبلی

هر جا `mirror.novin.cloud/github-releases` یا `mirror.novin.cloud/github-raw`
استفاده شده، آن را با `github.com` یا `raw.githubusercontent.com` جایگزین کنید.
