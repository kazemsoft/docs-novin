---
id: mongodb
title: MongoDB
sidebar_label: MongoDB
description: نصب MongoDB از مخزن apt/yum میرور نوین کلاود.
---

# MongoDB

این صفحه نصب MongoDB از مخزن رسمی `repo.mongodb.org`، میرور شده روی نوین کلاود، را پوشش می‌دهد.

## پیکربندی

اوبونتو/دبیان:

```bash
curl -fsSL https://mirror.novin.cloud/mongodb-packages/apt/ubuntu/dists/noble/mongodb-org/8.0/multiverse/binary-amd64/mongodb-org-server_8.0_amd64.deb > /dev/null
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://mirror.novin.cloud/mongodb-packages/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update && sudo apt install mongodb-org
```

CentOS/RHEL 9:

```ini
[mongodb-org-8.0]
baseurl=https://mirror.novin.cloud/mongodb-packages/yum/redhat/9/mongodb-org/8.0/x86_64/
```

```bash
sudo dnf install mongodb-org
```

## بررسی

```bash
apt-cache policy mongodb-org
```

باید `mirror.novin.cloud` را به‌عنوان منبع پکیج نشان دهد.

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://mirror.novin.cloud/mongodb-packages/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
      > /etc/apt/sources.list.d/mongodb-org-8.0.list \
    && apt update && apt install -y mongodb-org-shell
```

## بازگشت به تنظیمات قبلی

فایل `/etc/apt/sources.list.d/mongodb-org-8.0.list` (یا مخزن yum) را حذف و آدرس رسمی
`repo.mongodb.org` را جایگزین کنید.
