---
id: devops
title: ابزارهای DevOps
sidebar_label: ابزارهای DevOps
sidebar_position: 5
description: دریافت Helm، باینری‌های Kubernetes، HashiCorp، Jenkins و ابزارهای container runtime از میرور نوین کلاود.
---

# ابزارهای DevOps

## Helm

افزودن مخزن چارت:

```bash
helm repo add novin https://mirror.novin.cloud/helm
helm repo update
helm search repo novin
```

باینری خود Helm از مسیر `helm-binaries` در دسترس است:

```
https://mirror.novin.cloud/helm-binaries/
```

## Kubernetes

باینری‌ها (`kubectl`، `kubeadm`، `kubelet`):

```bash
# نمونه: دریافت kubectl نسخه 1.31.0
curl -LO https://mirror.novin.cloud/kubernetes-binaries/release/v1.31.0/bin/linux/amd64/kubectl
chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

پکیج‌های apt/yum کوبرنتیز از مخزن `kubernetes-packages` سرو می‌شوند.

## HashiCorp (Terraform، Vault، Consul…)

فایل‌های ریلیز:

```bash
# نمونه: Terraform
curl -LO https://mirror.novin.cloud/hashicorp-releases/terraform/1.9.5/terraform_1.9.5_linux_amd64.zip
```

پکیج‌های apt و yum نیز با نام‌های `hashicorp-apt` و `hashicorp-rpm` موجودند.

## GitHub Releases و Raw

برای دریافت فایل‌هایی که روی گیت‌هاب منتشر می‌شوند:

```
https://mirror.novin.cloud/github-releases/<owner>/<repo>/...
https://mirror.novin.cloud/github-raw/<owner>/<repo>/...
```

## Container runtime

| ابزار | مخزن |
|---|---|
| containerd | `containerd-downloads` |
| runc | `runc-downloads` |
| nerdctl | `nerdctl-downloads` |
| Cilium | `cilium-downloads` |
| kubectl-krew | `kubectl-krew` |

نمونه:

```bash
curl -LO https://mirror.novin.cloud/containerd-downloads/...
```

## Jenkins

```
https://mirror.novin.cloud/jenkins-updates/
```

## Apache Dist

توزیع رسمی پروژه‌های بنیاد آپاچی:

```
https://mirror.novin.cloud/apache-dist/
```

## سایر ابزارها

مخزن‌های `ansible`، `chef`، `puppet`، `terraform`، `vagrant`، `grafana-packages`،
`elastic-packages`، `mongodb-packages`، `postgresql-apt` و `postgresql-rpm` نیز
روی همین دامنه در دسترس‌اند — فهرست کامل در [همه‌ی مخزن‌ها](./all-repositories).
