---
id: postgresql
title: PostgreSQL
sidebar_label: PostgreSQL
description: نصب PostgreSQL از مخزن apt/yum میرور نوین کلاود.
---

# PostgreSQL

این صفحه نصب PostgreSQL از مخزن رسمی PGDG، میرور شده روی نوین کلاود، را پوشش می‌دهد.

## پیکربندی

اوبونتو/دبیان (چیدمان مطابق `apt.postgresql.org`):

```bash
curl -fsSL https://mirror.novin.cloud/postgresql-apt/ACCC4CF8.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/postgresql.gpg
echo "deb https://mirror.novin.cloud/postgresql-apt noble-pgdg main" | \
  sudo tee /etc/apt/sources.list.d/pgdg.list
sudo apt update && sudo apt install postgresql-16
```

CentOS/RHEL 9 (چیدمان مطابق `download.postgresql.org/pub/repos/yum`):

```ini
[pgdg16]
baseurl=https://mirror.novin.cloud/postgresql-rpm/16/redhat/rhel-9-x86_64
```

```bash
sudo dnf install postgresql16-server
```

## بررسی

```bash
apt-cache policy postgresql-16
```

باید `mirror.novin.cloud` را به‌عنوان منبع پکیج نشان دهد.

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN curl -fsSL https://mirror.novin.cloud/postgresql-apt/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql.gpg \
    && echo "deb https://mirror.novin.cloud/postgresql-apt noble-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt update && apt install -y postgresql-16
```

## بازگشت به تنظیمات قبلی

فایل `/etc/apt/sources.list.d/pgdg.list` (یا مخزن yum) را حذف و آدرس رسمی
`apt.postgresql.org` / `download.postgresql.org` را جایگزین کنید.
