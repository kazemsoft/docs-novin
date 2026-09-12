---
id: docker
title: Docker و OCI
sidebar_label: Docker و OCI
sidebar_position: 4
description: دریافت ایمیج‌های داکر و OCI از رجیستری نوین کلاود، و باینری‌های استاتیک داکر.
---

# Docker و رجیستری OCI

:::tip[بدون نیاز به ثبت‌نام]
رجیستری داکر عمومی است و `docker pull` بدون لاگین کار می‌کند.

اگر با `curl` مسیر `/v2/` را صدا بزنید پاسخ `401` می‌گیرید؛ این رفتار **طبیعی** است و
بخشی از فرایند استاندارد توکن داکر است. خود `docker` این مرحله را خودکار انجام می‌دهد
و توکن ناشناس دریافت می‌کند.
:::

## دریافت ایمیج

```bash
docker pull mirror.novin.cloud/docker/library/alpine:3.20
```

نوین کلاود دامنه‌ی اختصاصی `docker.novin.cloud` را هم برای همین کار ارائه می‌دهد
که نام ایمیج را کوتاه‌تر می‌کند:

```bash
docker pull docker.novin.cloud/hello-world
docker pull docker.novin.cloud/bitnami/postgresql
```

## تنظیم به‌عنوان registry mirror

برای اینکه همه‌ی `docker pull`های معمولی از میرور عبور کنند، فایل
`/etc/docker/daemon.json` را ویرایش کنید:

```json
{
  "registry-mirrors": ["https://docker.novin.cloud"]
}
```

سپس سرویس را ری‌استارت کنید:

```bash
sudo systemctl restart docker
```

## containerd / nerdctl

در `/etc/containerd/config.toml`:

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
  endpoint = ["https://docker.novin.cloud"]
```

```bash
sudo systemctl restart containerd
```

## باینری‌های استاتیک داکر

فایل‌های باینری داکر (بدون نیاز به احراز هویت) از مسیر زیر در دسترس‌اند:

```
https://mirror.novin.cloud/docker-static-binaries/
```

## مخزن‌های مرتبط

| مخزن | کاربرد |
|---|---|
| `docker` | ایمیج‌های داکر |
| `oci` | ایمیج‌های OCI |
| `helmoci` | چارت‌های Helm در قالب OCI |
| `docker-static-binaries` | باینری‌های استاتیک داکر |
| `docker-apt-ubuntu` / `docker-apt-debian` | پکیج‌های نصب داکر برای اوبونتو/دبیان |
| `docker-yum-centos` / `docker-yum-rhel` | پکیج‌های نصب داکر برای CentOS/RHEL |
