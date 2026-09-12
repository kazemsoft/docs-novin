---
id: cran
title: CRAN
sidebar_label: CRAN
description: تنظیم مخزن CRAN در R برای دریافت پکیج‌ها از میرور نوین کلاود.
---

# CRAN

آینه‌ی CRAN برای زبان R، از طریق API مخصوص CRAN در Artifactory.

## پیکربندی

به‌صورت سراسری در فایل `~/.Rprofile`:

```r
options(repos = c(CRAN = "https://mirror.novin.cloud/artifactory/api/cran/cran/"))
```

برای یک نصب تکی بدون تغییر تنظیمات سراسری:

```r
install.packages("ggplot2", repos = "https://mirror.novin.cloud/artifactory/api/cran/cran/")
```

## بررسی

```r
getOption("repos")
```

باید آدرس میرور را برگرداند.

## استفاده در Docker / CI

```dockerfile
FROM r-base:4.4.1
RUN echo 'options(repos = c(CRAN = "https://mirror.novin.cloud/artifactory/api/cran/cran/"))' >> /usr/lib/R/etc/Rprofile.site
WORKDIR /app
COPY . .
RUN Rscript -e 'install.packages("renv")'
```

## بازگشت به تنظیمات قبلی

خط اضافه‌شده را از `~/.Rprofile` حذف کنید، یا صریحاً برگردانید:

```r
options(repos = c(CRAN = "https://cran.r-project.org/"))
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
