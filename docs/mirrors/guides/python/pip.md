---
id: pip
title: pip
sidebar_label: pip
description: تنظیم pip، uv، Poetry و Pipenv برای دریافت پکیج از میرور نوین کلاود.
---

# pip

میرور نوین کلاود ایندکس PyPI را روی `https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/` سرو می‌کند.

## پیکربندی

```bash
pip config set global.index-url https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

یا مستقیم در فایل تنظیمات — لینوکس/مک `~/.pip/pip.conf`، ویندوز `%APPDATA%\pip\pip.ini`:

```ini
[global]
index-url = https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

نصب تکی بدون تغییر تنظیمات:

```bash
pip install requests -i https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

:::tip
`uv` از متغیر محیطی `UV_INDEX_URL` پیروی می‌کند:

```bash
export UV_INDEX_URL=https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

در Poetry، در `pyproject.toml`:

```toml
[[tool.poetry.source]]
name = "novin-mirror"
url = "https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/"
priority = "primary"
```

در Pipenv، در `Pipfile`:

```ini
[[source]]
url = "https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/"
verify_ssl = true
name = "novin-mirror"
```
:::

## بررسی

```bash
pip config list
pip download requests -d /tmp --no-deps -v | grep mirror
```

## استفاده در Docker / CI

```dockerfile
ENV PIP_INDEX_URL=https://mirror.novin.cloud/artifactory/api/pypi/pypi/simple/
```

## بازگشت به تنظیمات قبلی

```bash
pip config unset global.index-url
```

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
