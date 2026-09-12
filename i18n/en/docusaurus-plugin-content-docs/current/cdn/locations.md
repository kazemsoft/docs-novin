---
id: locations
title: Upstream and Location
sidebar_label: Upstream and Location
sidebar_position: 3
description: Configure the upstream, routing rules, and cache settings in Novin Cloud's CDN service.
---

# Upstream and Location

## Upstream

The upstream is your origin server, where content is read from. From the **"Upstreams"** tab on the gateway page, add your server.

## Location

A location determines which path of your site's address goes to which upstream. When creating a location, fill in these fields:

| Field | Description |
|---|---|
| **Name** | The location's name |
| **Upstream** | One of your defined upstreams |
| **Path type** | `prefix` (starts with) or `exact` (exact match) |
| **Path** | e.g., `/` or `/api` |

**Example:**

```
Path /        →  Web server upstream
Path /api     →  API server upstream
```

## Cache settings

Cache settings are determined when **creating a location**:

| Setting | Default | Description |
|---|---|---|
| **Cache level** | `standard` | `standard` enables caching, `bypass` disables it |
| **Browser TTL** | 3600 seconds | How long content is kept in the user's browser cache |
| **Edge TTL** | 3600 seconds | How long content is kept on Novin Cloud's servers |
| **Error response TTL** | 3600 seconds | How long error responses are kept |
| **Stale TTL** | 3600 seconds | How long a stale version is served when the upstream is unavailable |
| **Immutable cache** | Off | For files that never change |

:::warning Cache settings can't be edited after creation
Editing a location isn't currently possible. To change cache settings, you must **delete** the location and **create** it again with the new values.
:::

:::note Cache purge
Manually purging the cache through the console isn't available yet. To roll out changes quickly, you can set a lower **edge TTL** when creating the location, or change static file names when publishing a new version (e.g., `app.v2.js`).
:::
