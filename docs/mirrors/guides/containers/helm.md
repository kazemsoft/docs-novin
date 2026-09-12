---
id: helm
title: Helm
sidebar_label: Helm
description: افزودن مخزن‌های چارت Helm از میرور نوین کلاود، شامل چارت‌های OCI و باینری Helm.
---

# Helm

این صفحه افزودن مخزن‌های چارت Helm (کلاسیک و OCI) و دریافت باینری Helm را پوشش می‌دهد.

## پیکربندی

مخزن عمومی نوین کلاود:

```bash
helm repo add novin https://mirror.novin.cloud/helm
helm repo update
helm search repo novin
```

چارت‌های محبوب هم به‌صورت مخزن‌های جدا برای هر بالادستی میرور شده‌اند:

| بالادستی | مخزن |
|---|---|
| Bitnami | `helm-bitnami` |
| kube-prometheus-stack | `helm-prometheus` |
| Grafana | `helm-grafana` |
| Jetstack (cert-manager) | `helm-jetstack` |
| ingress-nginx | `helm-ingress-nginx` |
| Argo | `helm-argo` |
| Cilium | `helm-cilium` |
| HashiCorp | `helm-hashicorp` |
| metrics-server | `helm-metrics-server` |

```bash
helm repo add bitnami https://mirror.novin.cloud/helm-bitnami
helm repo add jetstack https://mirror.novin.cloud/helm-jetstack
```

چارت‌های منتشرشده به‌صورت OCI:

```bash
helm pull oci://mirror.novin.cloud/helmoci/<chart>
```

مخزن‌های `helmoci-dockerhub`، `helmoci-ghcr` و `helmoci-quay` هم برای بالادستی‌های
جدا در دسترس‌اند.

## بررسی

```bash
helm repo update
helm show chart bitnami/postgresql
```

اگر نسخه‌ها به‌روز نمایش داده شوند یعنی مخزن به‌درستی از میرور می‌خواند.

## استفاده در Kubernetes / CI

در Argo CD یا GitLab CI کافی است `repoURL` را به مسیر میرور تغییر دهید:

```yaml
source:
  repoURL: https://mirror.novin.cloud/helm-bitnami
  chart: postgresql
  targetRevision: 15.x.x
```

باینری خود Helm:

```
https://mirror.novin.cloud/helm-binaries/
```

## بازگشت به تنظیمات قبلی

مخزن میرور را حذف و مخزن اصلی را دوباره اضافه کنید:

```bash
helm repo remove bitnami
helm repo add bitnami https://charts.bitnami.com/bitnami
```
