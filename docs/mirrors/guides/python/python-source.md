---
id: python-source
title: Python Source
sidebar_label: Python Source
description: دانلود سورس تاربال‌های پایتون از میرور نوین کلاود برای build با pyenv یا دستی.
---

# Python Source

آدرس `https://mirror.novin.cloud/python-source/` آینه‌ی کامل ساختار `python.org/ftp/python` است و سورس تاربال‌های CPython را سرو می‌کند.

## پیکربندی

با `pyenv`:

```bash
export PYTHON_BUILD_MIRROR_URL=https://mirror.novin.cloud/python-source
pyenv install 3.12.6
```

دانلود مستقیم:

```bash
curl -O https://mirror.novin.cloud/python-source/3.12.6/Python-3.12.6.tar.xz
```

## بررسی

```bash
curl -I https://mirror.novin.cloud/python-source/3.12.6/Python-3.12.6.tar.xz
pyenv install 3.12.6 --verbose
```

## استفاده در Docker / CI

```dockerfile
ENV PYTHON_BUILD_MIRROR_URL=https://mirror.novin.cloud/python-source
RUN curl -o Python.tar.xz https://mirror.novin.cloud/python-source/3.12.6/Python-3.12.6.tar.xz
```

## بازگشت به تنظیمات قبلی

```bash
unset PYTHON_BUILD_MIRROR_URL
```

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
