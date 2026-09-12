---
id: go
title: Go
sidebar_label: Go
description: تنظیم GOPROXY و دریافت خود زبان Go از میرور نوین کلاود.
---

# Go

این صفحه دو چیز را پوشش می‌دهد: پراکسی ماژول‌های Go و تاربال‌های خود زبان Go (توزیع go.dev/dl).

## پیکربندی

پراکسی ماژول‌ها به‌صورت سراسری:

```bash
go env -w GOPROXY=https://mirror.novin.cloud/artifactory/api/go/go,direct
```

اگر ماژول خصوصی دارید، از پراکسی مستثنا کنید:

```bash
go env -w GOPRIVATE=git.example.ir/*
```

برای یک پروژه‌ی خاص بدون تغییر تنظیمات سراسری، همان متغیر را قبل از دستور بگذارید:

```bash
GOPROXY=https://mirror.novin.cloud/artifactory/api/go/go,direct go build ./...
```

### دریافت خود Go (نصب/آپدیت زبان)

تاربال‌های توزیع رسمی (همان چیدمان `go.dev/dl`) در یک مخزن Generic آینه شده‌اند:

```bash
curl -LO https://mirror.novin.cloud/golang-binaries/go1.23.4.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz
```

## بررسی

```bash
go env GOPROXY
```

باید آدرس میرور را نشان دهد. برای اطمینان از دانلود واقعی:

```bash
go clean -modcache
go mod download
```

## استفاده در Docker / CI

```dockerfile
FROM golang:1.23
ENV GOPROXY=https://mirror.novin.cloud/artifactory/api/go/go,direct
WORKDIR /app
COPY . .
RUN go build ./...
```

## بازگشت به تنظیمات قبلی

```bash
go env -u GOPROXY
```

یا به‌صورت صریح مقدار پیش‌فرض را برگردانید:

```bash
go env -w GOPROXY=https://proxy.golang.org,direct
```

برای بازگشت [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
