---
id: elastic
title: Elastic
sidebar_label: Elastic
description: نصب Elasticsearch، Kibana و Logstash از مخزن apt/yum و تاربال‌های میرور نوین کلاود.
---

# Elastic

این صفحه نصب محصولات Elastic (Elasticsearch، Kibana، Logstash) از میرور نوین کلاود
را پوشش می‌دهد. چیدمان مسیرها مطابق `artifacts.elastic.co` است.

## پیکربندی

اوبونتو/دبیان:

```bash
echo "deb https://mirror.novin.cloud/elastic-packages/packages/8.x/apt stable main" | \
  sudo tee /etc/apt/sources.list.d/elastic-8.x.list
sudo apt update && sudo apt install elasticsearch
```

CentOS/RHEL:

```ini
[elastic-8.x]
baseurl=https://mirror.novin.cloud/elastic-packages/packages/8.x/yum
```

دانلود مستقیم تاربال (بدون نصب پکیج):

```bash
curl -LO https://mirror.novin.cloud/elastic-packages/downloads/elasticsearch/elasticsearch-8.15.0-linux-x86_64.tar.gz
```

## بررسی

```bash
apt-cache policy elasticsearch
```

باید `mirror.novin.cloud` را به‌عنوان منبع پکیج نشان دهد.

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN curl -LO https://mirror.novin.cloud/elastic-packages/downloads/elasticsearch/elasticsearch-8.15.0-linux-x86_64.tar.gz \
    && tar -xzf elasticsearch-8.15.0-linux-x86_64.tar.gz
```

## بازگشت به تنظیمات قبلی

فایل `/etc/apt/sources.list.d/elastic-8.x.list` (یا مخزن yum) را حذف و آدرس رسمی
`artifacts.elastic.co` را جایگزین کنید.
