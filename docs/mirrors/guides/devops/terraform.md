---
id: terraform
title: Terraform
sidebar_label: Terraform
description: پیکربندی network mirror و مخزن ماژول‌های Terraform روی میرور نوین کلاود.
---

# Terraform

این صفحه network mirror پروایدرها، مخزن ماژول‌ها و باینری Terraform را پوشش می‌دهد.
برای Vault/Consul و سایر محصولات HashiCorp به [HashiCorp](./hashicorp) مراجعه کنید.

## پیکربندی

در `~/.terraformrc` (یا `/etc/terraform.d/cli.tfrc` برای همه‌ی کاربران):

```hcl
provider_installation {
  network_mirror {
    url = "https://mirror.novin.cloud/artifactory/api/terraform/terraform-registry/providers/"
  }
}
```

مخزن ماژول‌ها:

```
https://mirror.novin.cloud/artifactory/api/terraform/terraform
```

اگر از OpenTofu استفاده می‌کنید، همان الگو با مخزن `opentofu-registry`:

```hcl
provider_installation {
  network_mirror {
    url = "https://mirror.novin.cloud/artifactory/api/terraform/opentofu-registry/providers/"
  }
}
```

باینری خود Terraform:

```bash
curl -LO https://mirror.novin.cloud/hashicorp-releases/terraform/1.9.5/terraform_1.9.5_linux_amd64.zip
```

## بررسی

```bash
terraform init
```

اگر در خروجی `init` پروایدرها بدون خطای شبکه دانلود شوند، یعنی network mirror
به‌درستی کار می‌کند. برای تأیید بیشتر:

```bash
TF_LOG=debug terraform init 2>&1 | grep novin.cloud
```

## استفاده در Docker / CI

```dockerfile
FROM hashicorp/terraform:1.9.5
COPY .terraformrc /root/.terraformrc
```

در GitLab CI کافی است همین فایل را در مرحله‌ی `before_script` کپی کنید تا رانرها
بدون وابستگی به `registry.terraform.io` کار کنند.

## بازگشت به تنظیمات قبلی

بلوک `provider_installation` را از `.terraformrc` حذف کنید (یا کل فایل را پاک کنید)
تا Terraform دوباره مستقیم از `registry.terraform.io` نصب کند.
