---
id: grafana
title: Grafana
sidebar_label: Grafana
description: نصب Grafana از مخزن apt/yum میرور نوین کلاود.
---

# Grafana

این صفحه نصب Grafana از مخزن رسمی (`apt.grafana.com` / `rpm.grafana.com`)، میرور شده
روی نوین کلاود، را پوشش می‌دهد. برای چارت Helm مربوطه به [Helm](../containers/helm) مراجعه کنید.

## پیکربندی

اوبونتو/دبیان:

```bash
echo "deb https://mirror.novin.cloud/grafana-packages/apt stable main" | \
  sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update && sudo apt install grafana
```

CentOS/RHEL:

```ini
[grafana]
baseurl=https://mirror.novin.cloud/grafana-packages/rpm
```

```bash
sudo dnf install grafana
```

## بررسی

```bash
apt-cache policy grafana
```

باید `mirror.novin.cloud` را به‌عنوان منبع پکیج نشان دهد.

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN echo "deb https://mirror.novin.cloud/grafana-packages/apt stable main" > /etc/apt/sources.list.d/grafana.list \
    && apt update && apt install -y grafana
```

## بازگشت به تنظیمات قبلی

فایل `/etc/apt/sources.list.d/grafana.list` (یا مخزن yum) را حذف و آدرس رسمی
`apt.grafana.com` / `rpm.grafana.com` را جایگزین کنید.
