---
id: hashicorp
title: HashiCorp
sidebar_label: HashiCorp
description: دریافت ریلیزها و پکیج‌های apt/yum محصولات HashiCorp مثل Vault و Consul از میرور نوین کلاود.
---

# HashiCorp

این صفحه ریلیزها و پکیج‌های نصب محصولات HashiCorp (Vault، Consul، Nomad، Packer، …) را
پوشش می‌دهد. برای Terraform به‌طور اختصاصی به [Terraform](./terraform) مراجعه کنید.

## پیکربندی

دانلود مستقیم فایل‌های ریلیز:

```bash
curl -LO https://mirror.novin.cloud/hashicorp-releases/vault/1.17.2/vault_1.17.2_linux_amd64.zip
curl -LO https://mirror.novin.cloud/hashicorp-releases/consul/1.19.1/consul_1.19.1_linux_amd64.zip
```

الگوی کلی مسیر:

```
https://mirror.novin.cloud/hashicorp-releases/<product>/<version>/...
```

پکیج apt:

```bash
curl -fsSL https://mirror.novin.cloud/hashicorp-apt/gpg | \
  sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://mirror.novin.cloud/hashicorp-apt noble main" | \
  sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vault
```

پکیج yum (RHEL 9):

```ini
[hashicorp]
baseurl=https://mirror.novin.cloud/hashicorp-rpm/RHEL/9/$basearch/stable
```

## بررسی

```bash
apt-cache policy vault
# باید mirror.novin.cloud را به‌عنوان منبع نشان دهد
```

## استفاده در Docker / CI

```dockerfile
FROM ubuntu:24.04
RUN curl -fsSL https://mirror.novin.cloud/hashicorp-apt/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://mirror.novin.cloud/hashicorp-apt noble main" > /etc/apt/sources.list.d/hashicorp.list \
    && apt update && apt install -y vault
```

## بازگشت به تنظیمات قبلی

فایل `/etc/apt/sources.list.d/hashicorp.list` (یا مخزن yum) را حذف و آدرس رسمی
(`apt.releases.hashicorp.com` یا `rpm.releases.hashicorp.com`) را جایگزین کنید.
