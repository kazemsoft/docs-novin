---
id: rust
title: Rust
sidebar_label: Rust
description: تنظیم rustup برای دریافت زنجیره‌ی ابزار Rust از میرور نوین کلاود.
---

# Rust

فقط نصب و آپدیت **rustup** (زنجیره‌ی ابزار) از میرور پشتیبانی می‌شود.

:::note
**crates.io هنوز آینه نشده است.** دستور `cargo build` همچنان مستقیم از crates.io پکیج می‌گیرد؛ این صفحه فقط دریافت خود Rust را سریع‌تر می‌کند.
:::

## پیکربندی

قبل از نصب rustup، این دو متغیر محیطی را تنظیم کنید:

```bash
export RUSTUP_DIST_SERVER=https://mirror.novin.cloud/rustup
export RUSTUP_UPDATE_ROOT=https://mirror.novin.cloud/rustup/rustup
```

سپس نصب معمولی rustup را اجرا کنید:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

برای این‌که هر بار در شل جدید هم اعمال شود، در `~/.bashrc` یا `~/.zshrc` اضافه کنید:

```bash
export RUSTUP_DIST_SERVER=https://mirror.novin.cloud/rustup
export RUSTUP_UPDATE_ROOT=https://mirror.novin.cloud/rustup/rustup
```

## بررسی

```bash
rustup update
```

با `RUSTUP_DIST_SERVER` تنظیم‌شده، دانلود toolchain از میرور انجام می‌شود؛ برای اطمینان می‌توانید ترافیک را با `curl -v` روی همان متغیر تست کنید.

## استفاده در Docker / CI

```dockerfile
FROM debian:bookworm-slim
ENV RUSTUP_DIST_SERVER=https://mirror.novin.cloud/rustup
ENV RUSTUP_UPDATE_ROOT=https://mirror.novin.cloud/rustup/rustup
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```

## بازگشت به تنظیمات قبلی

```bash
unset RUSTUP_DIST_SERVER
unset RUSTUP_UPDATE_ROOT
```

برای فهرست کامل مخزن‌ها [زبان‌ها و پکیج‌منیجرها](../../languages) را ببینید.
