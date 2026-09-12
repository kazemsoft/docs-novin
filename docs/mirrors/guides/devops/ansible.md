---
id: ansible
title: Ansible
sidebar_label: Ansible
description: نصب کالکشن‌های Ansible Galaxy از میرور نوین کلاود بدون نیاز به تحریم‌شکن.
---

# Ansible

این صفحه دریافت کالکشن‌های Ansible Galaxy از میرور نوین کلاود را پوشش می‌دهد.

## پیکربندی

در `ansible.cfg` پروژه یا مسیر عمومی (`/etc/ansible/ansible.cfg`):

```ini
[galaxy]
server_list = novin

[galaxy_server.novin]
url = https://mirror.novin.cloud/artifactory/api/ansible/ansible/
```

یا بدون تغییر کانفیگ، مستقیم روی خط فرمان:

```bash
ansible-galaxy collection install community.general -s https://mirror.novin.cloud/artifactory/api/ansible/ansible/
```

## بررسی

```bash
ansible-galaxy collection install community.general -s https://mirror.novin.cloud/artifactory/api/ansible/ansible/ -vvv
```

در خروجی verbose باید درخواست‌ها به `mirror.novin.cloud` را ببینید، نه `galaxy.ansible.com`.

## استفاده در Docker / CI

```dockerfile
FROM python:3.12-slim
RUN pip install ansible \
    && mkdir -p /etc/ansible \
    && printf "[galaxy]\nserver_list = novin\n\n[galaxy_server.novin]\nurl = https://mirror.novin.cloud/artifactory/api/ansible/ansible/\n" > /etc/ansible/ansible.cfg
```

در pipeline کافی است همین `ansible.cfg` را در ریشه‌ی پروژه کامیت کنید تا همه‌ی
مراحل `ansible-galaxy collection install -r requirements.yml` از میرور استفاده کنند.

## بازگشت به تنظیمات قبلی

بلوک `[galaxy]` / `[galaxy_server.novin]` را از `ansible.cfg` حذف کنید تا Ansible
دوباره به‌صورت پیش‌فرض از `galaxy.ansible.com` نصب کند.
