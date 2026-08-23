# مستندات نوین کلاود

مستندات رسمی و متن‌باز سرویس‌های ابری [نوین کلاود](https://novin.cloud).

🔗 **[مشاهده مستندات](https://console.novin.cloud/docs)**

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

سایت به‌صورت استاتیک build شده و روی مسیر `/docs` از دامنه `console.novin.cloud` سرو می‌شود.

متغیر `DOCS_EDIT_BASE_URL` آدرس مخزن را برای دکمه «ویرایش این صفحه» تعیین می‌کند.

## مجوز

محتوای مستندات تحت [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fa) منتشر می‌شود.
