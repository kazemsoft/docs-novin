---
id: docker
title: Docker
sidebar_label: Docker
description: دریافت ایمیج‌های داکر از میرور نوین کلاود بدون نیاز به تحریم‌شکن.
---

# Docker

این صفحه نحوه‌ی pull ایمیج‌های داکر و نصب خود Docker Engine را از میرور نوین کلاود توضیح می‌دهد.
برای معرفی کامل رجیستری OCI به [Docker و OCI](../../docker) مراجعه کنید.

## پیکربندی

برای pull مستقیم از دامنه‌ی اختصاصی:

```bash
docker pull docker.novin.cloud/library/nginx
docker pull docker.novin.cloud/bitnami/postgresql
```

یا از مسیر عمومی میرور:

```bash
docker pull mirror.novin.cloud/docker/library/nginx
```

برای عبور همه‌ی `docker pull`های معمولی از میرور، در `/etc/docker/daemon.json`:

```json
{
  "registry-mirrors": ["https://docker.novin.cloud"]
}
```

```bash
sudo systemctl restart docker
```

سایر رجیستری‌ها هم به‌صورت مخزن‌های جدا میرور شده‌اند:

| رجیستری بالادستی | مخزن |
|---|---|
| ghcr.io | `docker-ghcr` |
| quay.io | `docker-quay` |
| gcr.io | `docker-gcr` |
| registry.k8s.io | `docker-k8s` |
| mcr.microsoft.com | `docker-mcr` |
| nvcr.io | `docker-nvidia` |
| registry.redhat.io | `docker-redhat` |
| registry.gitlab.com | `docker-gitlab` |
| public.ecr.aws | `docker-ecr-public` |

```bash
docker pull mirror.novin.cloud/docker-ghcr/<owner>/<image>
```

نصب خود Docker Engine روی اوبونتو/دبیان:

```bash
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://mirror.novin.cloud/docker-apt-ubuntu noble stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list
curl -fsSL https://mirror.novin.cloud/docker-apt-ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

روی CentOS/RHEL مخزن‌های `docker-yum-centos` و `docker-yum-rhel` همان چیدمان
`download.docker.com/linux/centos` را دارند.

## بررسی

```bash
docker pull docker.novin.cloud/library/hello-world
docker image inspect hello-world --format '{{.RepoDigests}}'
```

## استفاده در Kubernetes / CI runner

در CI (مثلاً GitLab Runner) کافی است `image:` را با پیشوند میرور بنویسید تا نیازی به
احراز هویت یا VPN نباشد:

```yaml
build:
  image: docker.novin.cloud/library/node:20
```

روی نودهای Kubernetes هم با تنظیم `registry-mirrors` در `daemon.json` (یا مسیر مشابه در
containerd — به [containerd](./containerd) مراجعه کنید) همه‌ی pullهای پادها از میرور عبور می‌کنند.

## بازگشت به تنظیمات قبلی

کلید `registry-mirrors` را از `/etc/docker/daemon.json` حذف و سرویس را ری‌استارت کنید:

```bash
sudo systemctl restart docker
```

pullهای مستقیم (`docker pull docker.novin.cloud/...`) نیازی به بازگشت ندارند — کافی است
دوباره از `docker.io/...` استفاده کنید.
