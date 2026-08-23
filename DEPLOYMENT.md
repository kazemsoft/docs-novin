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
