---
id: containerd
title: containerd
sidebar_label: containerd
description: پیکربندی containerd برای عبور از میرور نوین کلاود و دریافت باینری‌های containerd، runc و nerdctl.
---

# containerd

این صفحه پیکربندی registry mirror برای containerd و دریافت باینری‌های آن را پوشش می‌دهد.
برای رجیستری داکر عمومی به [Docker و OCI](../../docker) مراجعه کنید.

## پیکربندی

روش قدیمی‌تر، در `/etc/containerd/config.toml`:

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
  endpoint = ["https://docker.novin.cloud"]
```

```bash
sudo systemctl restart containerd
```

روش جدیدتر (`hosts.toml`)، در `/etc/containerd/certs.d/docker.io/hosts.toml`:

```toml
server = "https://docker.io"

[host."https://docker.novin.cloud"]
  capabilities = ["pull", "resolve"]
```

باینری‌های containerd، runc و nerdctl از مخزن‌های Generic زیر در دسترس‌اند
(چیدمان مسیرها دقیقاً همان مسیرهای ریلیز گیت‌هاب است):

```bash
curl -LO https://mirror.novin.cloud/containerd-downloads/containerd/containerd/releases/download/v1.7.20/containerd-1.7.20-linux-amd64.tar.gz
curl -LO https://mirror.novin.cloud/runc-downloads/opencontainers/runc/releases/download/v1.1.13/runc.amd64
curl -LO https://mirror.novin.cloud/nerdctl-downloads/containerd/nerdctl/releases/download/v1.7.7/nerdctl-1.7.7-linux-amd64.tar.gz
```

## بررسی

```bash
sudo ctr images pull docker.io/library/alpine:3.20
```

در لاگ `containerd` (یا با `ctr` در حالت verbose) می‌توانید ببینید که درخواست به
`docker.novin.cloud` رفته، نه `registry-1.docker.io`.

## استفاده در Kubernetes / CI runner

روی نودهای k3s/K8s که از containerd استفاده می‌کنند، همین `hosts.toml` را با
Ansible یا در تصویر پایه‌ی نود (base image) توزیع کنید تا همه‌ی pullهای پاد
از میرور عبور کنند — نیازی به تغییر در manifest پادها نیست.

## بازگشت به تنظیمات قبلی

بلوک `registry.mirrors` را از `config.toml` حذف کنید یا فایل `hosts.toml` را
پاک کنید، سپس:

```bash
sudo systemctl restart containerd
```
