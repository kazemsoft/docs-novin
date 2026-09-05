---
id: docker
title: Docker و OCI
sidebar_label: Docker و OCI
sidebar_position: 4
description: دریافت ایمیج‌های داکر و OCI از رجیستری نوین کلاود، و باینری‌های استاتیک داکر.
---

# Docker و رجیستری OCI

:::warning[وضعیت فعلی — نیازمند احراز هویت]
برخلاف سایر مخزن‌های میرور که عمومی و بدون لاگین کار می‌کنند، رجیستری Docker در حال حاضر
**بدون احراز هویت پاسخ نمی‌دهد** و درخواست ناشناس با خطای `401 Unauthorized` برمی‌گردد.

تا زمان نهایی شدن سیاست دسترسی، دستور `docker pull` بدون `docker login` کار نخواهد کرد.
برای دریافت دسترسی از طریق [کنسول کاربری](https://console.novin.cloud) تیکت ثبت کنید.
:::

## ورود به رجیستری

```bash
docker login mirror.novin.cloud
```

پس از ورود موفق، ایمیج‌ها را مثل همیشه دریافت کنید:

```bash
docker pull mirror.novin.cloud/docker/library/alpine:3.20
```

## تنظیم به‌عنوان registry mirror

برای اینکه همه‌ی `docker pull`های معمولی از میرور عبور کنند، فایل
`/etc/docker/daemon.json` را ویرایش کنید:

```json
{
  "registry-mirrors": ["https://mirror.novin.cloud"]
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
  endpoint = ["https://mirror.novin.cloud"]
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
