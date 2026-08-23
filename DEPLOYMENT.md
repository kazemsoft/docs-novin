# استقرار سایت مستندات

سایت به‌صورت استاتیک build می‌شود و روی مسیر `/docs` از دامنه `console.novin.cloud` سرو می‌گردد.

## نکته مهم: مسیر `/docs`

مقدار `baseUrl` در `docusaurus.config.ts` روی `/docs/` تنظیم شده است. تمام asset‌ها با همین پیشوند تولید می‌شوند، بنابراین سایت **باید** روی همین مسیر سرو شود. تغییر مسیر بدون تغییر `baseUrl` باعث خرابی CSS و JS می‌شود.

## ساخت ایمیج

```bash
docker build \
  --build-arg DOCS_EDIT_BASE_URL=https://github.com/novincloud/docs-novin/tree/main \
  -t novincloud-docs:<tag> .
```

خروجی build داخل ایمیج در مسیر `/usr/share/nginx/html/docs` قرار می‌گیرد.

## اتصال به `console.novin.cloud/docs`

دامنه `console.novin.cloud` در حال حاضر به کنسول کاربری (Next.js) اشاره می‌کند. برای اضافه شدن مسیر `/docs`، باید در Ingress یک path جداگانه تعریف شود که به سرویس مستندات مسیر بدهد.

نمونه (مسیر `/docs` پیش از مسیر `/` قرار بگیرد تا اولویت داشته باشد):

```yaml
rules:
  - host: console.novin.cloud
    http:
      paths:
        - path: /docs
          pathType: Prefix
          backend:
            service:
              name: novincloud-docs
              port:
                number: 80
        - path: /
          pathType: Prefix
          backend:
            service:
              name: customerconsole
              port:
                number: 3000
```

:::توجه
میدلور i18n کنسول (`next-intl`) روی مسیرها اعمال می‌شود. چون درخواست‌های `/docs` در لایه Ingress به سرویس دیگری مسیردهی می‌شوند، اصلاً به اپلیکیشن Next.js نمی‌رسند و تداخلی ایجاد نمی‌شود.
:::

## GitOps

طبق قوانین پروژه، تغییرات زیرساخت فقط از طریق ریپو `gitops/` و با Flux CD اعمال می‌شود. مانیفست‌های Deployment، Service و Ingress باید آنجا اضافه شوند — نه با `kubectl apply` مستقیم.

## بررسی پس از استقرار

- [ ] `https://console.novin.cloud/docs` بدون نیاز به لاگین باز شود
- [ ] CSS و فونت فارسی درست بارگذاری شوند
- [ ] جهت صفحه راست‌به‌چپ باشد
- [ ] دکمه «ویرایش این صفحه» به گیت‌هاب برود
- [ ] مسیر `/docs/ai/about` مستقیماً (بدون عبور از صفحه اصلی) باز شود

---

# استقرار روی Vercel با تگ

استقرار با *تگ* انجام می‌شود، نه با push به `main` — مطابق قرارداد سایر ریپوهای نوین کلاود:

| تگ | نتیجه |
|---|---|
| `v1.2.3` | استقرار روی پروداکشن |
| `v1.2.3-rc.1` | استقرار پیش‌نمایش (release candidate) |
| push به `main` | *هیچ استقراری انجام نمی‌شود* |

## چرا این روش؟

Vercel به‌صورت داخلی امکان trigger روی تگ گیت را ندارد و فقط بر اساس برنچ کار می‌کند. بنابراین استقرار خودکار Vercel غیرفعال شده و یک GitHub Action با Vercel CLI این کار را انجام می‌دهد.

مزیت دیگر: build داخل GitHub Actions اجرا می‌شود، پس اگر build خراب باشد تگ fail می‌خورد و نسخه معیوب منتشر نمی‌شود.

## راه‌اندازی اولیه (یک‌بار)

### ۱. غیرفعال کردن استقرار خودکار Vercel

فایل `vercel.json` مقدار `git.deploymentEnabled.main` را روی `false` تنظیم کرده است.

برای اطمینان، در داشبورد Vercel هم بررسی کنید:
`Project → Settings → Git → Ignored Build Step`

### ۲. تعریف سه Secret در گیت‌هاب

مسیر: `Settings → Secrets and variables → Actions → New repository secret`

| نام | از کجا |
|---|---|
| `VERCEL_TOKEN` | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | فایل `.vercel/project.json` بعد از اجرای `vercel link` |
| `VERCEL_PROJECT_ID` | همان فایل |
| `VERCEL_SCOPE` | اسلاگ تیم در Vercel (مثلاً `mohammads-projects-f0ac81fe`) |

> *مهم — نوع توکن:* حتماً از صفحه `vercel.com/account/tokens` توکن بسازید (توکن حساب کاربری).
> توکن‌های *Project-scoped* که با `vcp_` شروع می‌شوند با Vercel CLI کار *نمی‌کنند*؛
> این توکن‌ها به endpoint کاربر دسترسی ندارند و CLI با خطای `User not found` متوقف می‌شود.
> هنگام ساخت توکن، Scope را روی همان تیمی تنظیم کنید که پروژه در آن قرار دارد.

برای گرفتن دو مقدار آخر:

```bash
npx vercel link
cat .vercel/project.json
```

> پوشه `.vercel/` در `.gitignore` قرار دارد و نباید کامیت شود.

## انتشار نسخه جدید

```bash
# نسخه پیش‌نمایش (تست قبل از انتشار)
git tag v1.0.0-rc.1
git push origin v1.0.0-rc.1

# نسخه نهایی روی پروداکشن
git tag v1.0.0
git push origin v1.0.0
```

وضعیت استقرار در تب *Actions* در گیت‌هاب و آدرس نهایی در خلاصه اجرای workflow قابل مشاهده است.

## حذف یک تگ اشتباه

```bash
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

توجه: حذف تگ، استقرار انجام‌شده را برنمی‌گرداند. برای بازگشت، در داشبورد Vercel از قابلیت Rollback استفاده کنید یا تگ اصلاحی جدید بزنید.
