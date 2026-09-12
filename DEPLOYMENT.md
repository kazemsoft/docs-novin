# استقرار سایت مستندات

سایت به‌صورت استاتیک build می‌شود و روی دامنه اختصاصی [docs.novin.cloud](https://docs.novin.cloud) در ریشه (`/`) سرو می‌شود.

استقرار فعلی روی *Vercel* است و با *تگ نسخه* انجام می‌شود. در آینده احتمال انتقال به زیرساخت داخلی وجود دارد؛ فایل‌های `Dockerfile` و `nginx.conf` برای همان مرحله آماده نگه داشته شده‌اند.

## مسیر سرو شدن (`baseUrl`)

مقدار پیش‌فرض `baseUrl` روی `/` است، چون سایت صاحب ریشه دامنه خودش است.

اگر روزی لازم شد سایت زیر یک زیرمسیر سرو شود (مثلاً `example.com/docs`)، کافی است متغیر محیطی هنگام build تنظیم شود:

```bash
DOCS_BASE_URL=/docs/ npm run build
```

تمام asset‌ها با همین پیشوند تولید می‌شوند؛ اگر مسیر سرو شدن با `baseUrl` هم‌خوان نباشد، CSS و JS بارگذاری نمی‌شوند.

| متغیر | پیش‌فرض | کاربرد |
|---|---|---|
| `DOCS_BASE_URL` | `/` | مسیر سرو شدن سایت |
| `DOCS_SITE_URL` | `https://docs.novin.cloud` | دامنه، برای لینک‌های canonical |
| `DOCS_EDIT_BASE_URL` | ریپو گیت‌هاب | مقصد دکمه «ویرایش این صفحه» |

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
| `VERCEL_SCOPE` | اسلاگ تیم در Vercel (از داشبورد Vercel بخوانید) |

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
