---
id: kubernetes
title: Kubernetes
sidebar_label: Kubernetes
description: دریافت باینری‌ها، پکیج‌های apt/yum و ایمیج‌های Kubernetes از میرور نوین کلاود.
---

# Kubernetes

این صفحه باینری‌ها، پکیج‌های نصب و ایمیج‌های سیستمی Kubernetes را پوشش می‌دهد.
برای Helm به [Helm](./helm) مراجعه کنید.

## پیکربندی

باینری‌ها (`kubectl`، `kubeadm`، `kubelet`):

```bash
curl -LO https://mirror.novin.cloud/kubernetes-binaries/release/v1.31.0/bin/linux/amd64/kubectl
chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

پکیج apt (چیدمان مطابق `pkgs.k8s.io`):

```bash
curl -fsSL https://mirror.novin.cloud/kubernetes-packages/core:/stable:/v1.31/deb/Release.key | \
  sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://mirror.novin.cloud/kubernetes-packages/core:/stable:/v1.31/deb/ /" | \
  sudo tee /etc/apt/sources.list.d/kubernetes.list
```

پکیج yum:

```ini
[kubernetes]
baseurl=https://mirror.novin.cloud/kubernetes-packages/core:/stable:/v1.31/rpm/
```

ایمیج‌های سیستمی (`registry.k8s.io`) از مخزن `docker-k8s` سرو می‌شوند:

```bash
docker pull mirror.novin.cloud/docker-k8s/pause:3.10
```

در containerd:

```toml
[plugins."io.containerd.grpc.v1.cri"]
  sandbox_image = "mirror.novin.cloud/docker-k8s/pause:3.10"
```

در `kubeadm init`:

```bash
kubeadm init --image-repository mirror.novin.cloud/docker-k8s
```

افزونه‌ها:

```bash
# krew
# مخزن: kubectl-krew

# Cilium CLI
curl -LO https://mirror.novin.cloud/cilium-downloads/...
```

## بررسی

```bash
kubectl version --client
apt-cache policy kubectl   # باید نسخه‌ای از mirror.novin.cloud نشان دهد
```

## استفاده در Kubernetes / CI

در Dockerfile یا مرحله‌ی نصب CI:

```dockerfile
RUN curl -LO https://mirror.novin.cloud/kubernetes-binaries/release/v1.31.0/bin/linux/amd64/kubectl \
    && chmod +x kubectl && mv kubectl /usr/local/bin/
```

## بازگشت به تنظیمات قبلی

فایل مخزن apt/yum را حذف و آدرس رسمی (`pkgs.k8s.io`) را جایگزین کنید؛ برای
`--image-repository` پرچم را حذف کنید تا مقدار پیش‌فرض (`registry.k8s.io`) استفاده شود.
