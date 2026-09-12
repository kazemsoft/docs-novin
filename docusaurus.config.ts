import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

// Public repo that backs "ویرایش این صفحه" → users fork and open a PR.
const EDIT_BASE_URL =
  process.env.DOCS_EDIT_BASE_URL ??
  "https://github.com/novincloud/docs-novin/tree/main";

// The site is served at the root of its own domain (docs.novin.cloud).
// Both overridable for a host that mounts the docs under a sub-path instead,
// e.g. DOCS_BASE_URL=/docs/ — every asset URL is prefixed with this value.
const BASE_URL = process.env.DOCS_BASE_URL ?? "/";
const SITE_URL = process.env.DOCS_SITE_URL ?? "https://docs.novin.cloud";

const config: Config = {
  title: "مستندات نوین کلاود",
  tagline: "راهنمای کامل سرویس‌های ابری نوین کلاود",
  favicon: "img/favicon.svg",

  url: SITE_URL,
  baseUrl: BASE_URL,

  organizationName: "novincloud",
  projectName: "docs-novin",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "fa",
    locales: ["fa", "en"],
    localeConfigs: {
      fa: { label: "فارسی", direction: "rtl", htmlLang: "fa-IR" },
      en: { label: "English", direction: "ltr", htmlLang: "en-US" },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Docs are the whole site, so they live at the root: /ai/about.
          routeBasePath: "/",
          editUrl: EDIT_BASE_URL,
          editLocalizedFiles: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/novin-social-card.png",
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "مستندات نوین کلاود",
      logo: {
        alt: "نوین کلاود",
        // Same artwork in two inks: dark for the light navbar, white for dark.
        src: "img/logo.png",
        srcDark: "img/logo-dark.png",
        // Source is 1712x416; displayed at that 4.115:1 ratio.
        width: 148,
        height: 36,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "مستندات",
        },
        {
          href: "https://console.novin.cloud",
          label: "کنسول کاربری",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://github.com/novincloud/docs-novin",
          label: "گیت‌هاب",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "سرویس‌ها",
          items: [
            { label: "هوش مصنوعی", to: "/ai/about" },
            { label: "شروع کار", to: "/" },
          ],
        },
        {
          title: "مشارکت",
          items: [
            {
              label: "راهنمای مشارکت",
              href: "https://github.com/novincloud/docs-novin/blob/main/CONTRIBUTING.md",
            },
            { label: "گیت‌هاب", href: "https://github.com/novincloud/docs-novin" },
          ],
        },
        {
          title: "نوین کلاود",
          items: [
            { label: "وب‌سایت", href: "https://novin.cloud" },
            { label: "کنسول کاربری", href: "https://console.novin.cloud" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} نوین کلاود — این مستندات متن‌باز است.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "python"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
