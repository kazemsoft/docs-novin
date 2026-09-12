---
id: contributing
title: Contributing to the Documentation
sidebar_label: Contributing to the docs
sidebar_position: 5
description: How to contribute to improving Novin Cloud's documentation and submit a pull request.
---

# Contributing to the Documentation

Novin Cloud's documentation is **open source**. If you spot a typo, an unclear explanation, a wrong example, or something missing, you can fix it yourself — you don't need to be a programmer.

## The easiest way — edit in your browser

1. Go to the page you want to fix.
2. Click **"Edit this page"** at the bottom of the page.
3. GitHub opens the file. Click the **pencil icon (✏️)**.
4. Make your edit.
5. At the bottom of the page, in the description box, write a short sentence about your change.
6. Click **Propose changes**, then **Create pull request**.

That's it. We'll review your change, and once approved, it'll be published on the site.

:::tip Don't have a GitHub account?
Creating a free GitHub account takes less than a minute. Once you have one, follow the steps above.
:::

## For bigger changes — running it locally

If you want to change several pages or add a new one:

```bash
git clone https://github.com/novincloud/docs-novin.git
cd docs-novin
npm install
npm start
```

The site will come up at `http://localhost:3000` and update instantly whenever you save a file.

Before submitting your changes, make sure the build is healthy:

```bash
npm run build
```

## What kinds of contributions help most?

- **Fixing mistakes** — anywhere the documentation differs from the console's actual behavior
- **Adding examples** — sample code or a real-world scenario
- **Clarifying** — anywhere the explanation is vague
- **Your own experience** — a problem you ran into yourself and how you solved it

## Writing guidelines

- The documentation's language is **Persian**, with right-to-left text direction.
- Where useful, also include the English term for technical concepts: "Upstream."
- Code blocks are always shown left-to-right — no special setup is needed.
- Prefer a **real example** over a general explanation.

## Have a question?

If you have a question about how to contribute, ask it right in your pull request, or use a [support ticket](https://console.novin.cloud/dashboard/tickets).
