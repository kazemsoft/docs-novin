# مستندات نوین کلاود

مستندات رسمی و متن‌باز سرویس‌های ابری [نوین کلاود](https://novin.cloud).

🔗 **[مشاهده مستندات](https://docs.novin.cloud)**

## مشارکت

این مستندات متن‌باز است و از مشارکت شما استقبال می‌کنیم. برای اصلاح یک صفحه، کافی است روی دکمه **«ویرایش این صفحه»** در پایین همان صفحه کلیک کنید و یک Pull Request بفرستید.

راهنمای کامل: [CONTRIBUTING.md](./CONTRIBUTING.md)

## اجرای محلی

```bash
npm install
npm start        # http://localhost:3000
npm run build    # ساخت خروجی استاتیک در build/
```

نیازمند Node.js نسخه ۱۸ یا بالاتر.

## ساختار

```
docs/                  فایل‌های مستندات (Markdown)
├── getting-started/   صفحات مقدماتی
└── ai/                مستندات هوش مصنوعی
sidebars.ts            ساختار منوی کناری
docusaurus.config.ts   تنظیمات سایت
src/css/custom.css     استایل، فونت و تنظیمات راست‌به‌چپ
```

## استقرار

سایت روی [docs.novin.cloud](https://docs.novin.cloud) منتشر می‌شود. استقرار با *تگ نسخه* انجام می‌شود، نه با push به `main`:

| تگ | نتیجه |
|---|---|
| `v1.2.3` | پروداکشن |
| `v1.2.3-rc.1` | پیش‌نمایش |

جزئیات کامل در [DEPLOYMENT.md](./DEPLOYMENT.md).

## مجوز

محتوای مستندات تحت [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fa) منتشر می‌شود.
