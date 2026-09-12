---
id: conda
title: Conda
sidebar_label: Conda
description: تنظیم Conda برای دریافت پکیج از میرور نوین کلاود.
---

# Conda

میرور نوین کلاود کانال‌های Conda را روی `https://mirror.novin.cloud/artifactory/api/conda/conda` سرو می‌کند. کانال‌های `conda-forge` و `conda-main` هم به‌صورت جدا در دسترس‌اند.

## پیکربندی

در `~/.condarc`:

```yaml
channels:
  - https://mirror.novin.cloud/artifactory/api/conda/conda/main
default_channels:
  - https://mirror.novin.cloud/artifactory/api/conda/conda/main
```

برای استفاده از `conda-forge`:

```yaml
channels:
  - https://mirror.novin.cloud/artifactory/api/conda/conda-forge
```

## بررسی

```bash
conda config --show channels
conda install numpy --dry-run -v
```

## استفاده در Docker / CI

```dockerfile
RUN conda config --add channels https://mirror.novin.cloud/artifactory/api/conda/conda/main
```

## بازگشت به تنظیمات قبلی

```bash
conda config --remove channels https://mirror.novin.cloud/artifactory/api/conda/conda/main
conda config --add channels defaults
```

برای اطلاعات بیشتر به [زبان‌ها و پکیج‌منیجرها](../../languages) مراجعه کنید.
