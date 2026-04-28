# Strapi Content Contract

This project consumes content from the sibling Strapi CMS at `/Users/naufaldi.satriya/WebApps/garda-pangan-cms`.

## CMS Runtime

- App: `garda-pangan-backoffice`
- Strapi version: `5.42.0`
- Node engine: `>=20.0.0 <=24.x.x`
- Cloud plugin: `@strapi/plugin-cloud`
- Frontend should target Strapi 5 REST behavior and avoid Strapi v4 response assumptions.
- Do not upgrade Strapi as part of the Astro migration. Use `npm run upgrade:dry` in the CMS repo first if a future upgrade is needed.

## Article

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/api/article/content-types/article/schema.json`
- Kind: collection type
- Collection: `articles`
- Endpoint: `/api/articles`
- Draft & Publish: enabled
- Rebuild model name: `article`

Fields:

- `title`: string
- `description`: text, max length 80
- `slug`: uid, target field `title`
- `cover`: single media, allowed images/files/videos
- `author`: many-to-one relation to `api::author.author`
- `category`: many-to-one relation to `api::category.category`
- `blocks`: dynamic zone using `shared.media`, `shared.quote`, `shared.rich-text`, `shared.slider`
- `isFeatured`: boolean, default `false`

Astro route behavior:

- Article listing fetches `/api/articles` with `status=published`, newest first.
- Article details use `slug` for `/artikel/[slug]`.
- `documentId` is treated as a stable CMS document identifier, not as the public URL.
- Unpublished or deleted articles disappear from the next static build because they are no longer returned by the published article query.

## Article Blocks

### `shared.rich-text`

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/components/shared/rich-text.json`
- Fields:
  - `body`: richtext
- Astro rendering: render as article prose. The first pass can treat this as trusted CMS-authored rich text/HTML or Markdown-compatible rich text based on the API payload observed during integration.

### `shared.media`

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/components/shared/media.json`
- Fields:
  - `file`: single media, allowed images/files/videos
- Astro rendering: render images with accessible `alt` text from Strapi media metadata; render videos/files as semantic links or media elements.

### `shared.quote`

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/components/shared/quote.json`
- Fields:
  - `title`: string
  - `body`: text
- Astro rendering: render as a semantic `blockquote`, using `title` as attribution or heading when present.

### `shared.slider`

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/components/shared/slider.json`
- Fields:
  - `files`: multiple image media
- Astro rendering: render as a static responsive image gallery first. Hydrate a React carousel only if the UX requires interactive sliding.

## Existing Singleton Pages

### About

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/api/about/content-types/about/schema.json`
- Kind: single type
- Endpoint: `/api/about`
- Draft & Publish: disabled
- Rebuild model name: `about`

Fields:

- `heroTitle`: string
- `heroSubtitle`: text
- `heroBackground`: single media, allowed images/videos
- `historyTitle`: string
- `historyContent`: richtext
- `historyImages`: multiple image media
- `visionContent`: richtext
- `missionContent`: richtext
- `legalityContent`: richtext

### Mitra

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/api/mitra/content-types/mitra/schema.json`
- Kind: single type
- Endpoint: `/api/mitra`
- Draft & Publish: disabled
- Rebuild model name: `mitra`

Fields:

- `heroTitle`: string
- `heroBackgroundMedia`: single media, allowed images/videos
- `heroVideoUrl`: string
- `heroInfoCards`: repeatable `shared.info-card`
- `flowTitle`: string
- `flowDescription`: text
- `flowSteps`: repeatable `shared.flow-step`
- `partnerSectionTitle`: string

Nested components:

- `shared.info-card`: `content` text, required
- `shared.flow-step`: `title`, `description`, `icon`, `button1Label`, `button1Link`, `button2Label`, `button2Link`

### Merchandise Page

- Schema: `/Users/naufaldi.satriya/WebApps/garda-pangan-cms/src/api/merchandise-page/content-types/merchandise-page/schema.json`
- Kind: single type
- Endpoint: `/api/merchandise-page`
- Draft & Publish: disabled
- Rebuild model name: `merchandise-page`

Fields:

- `heroTitle`: string
- `heroDescription`: text
- `heroBackground`: single media, allowed images/videos

## Other CMS Content Types

The CMS also defines these content types. Treat them as second-pass unless the route audit maps them to an existing frontend route:

- `homepage`
- `global`
- `category`
- `program`
- `event`
- `instagram-feed`
- `partner`
- `penerima-page`
- `award`
- `fact`
- `author`
- `knowledge-page`
- `merchandise`
- `target-audience`
- `event-page`
- `merchandise-category`
- `testimonial`

## Populate Requirements

Use explicit populate queries instead of relying on shallow responses:

- `/api/articles`: populate `cover`, `author`, `category`, and `blocks`.
- `/api/about`: populate `heroBackground` and `historyImages`.
- `/api/mitra`: populate `heroBackgroundMedia`, `heroInfoCards`, `flowSteps`, and nested `flowSteps.icon`.
- `/api/merchandise-page`: populate `heroBackground`.

## Rebuild Triggers

The Netlify webhook filter should trigger a frontend rebuild for:

- `entry.publish`, `entry.update`, `entry.delete`, `entry.unpublish` on `article`
- `entry.update` on `about`
- `entry.update` on `mitra`
- `entry.update` on `merchandise-page`
- `media.update` and `media.delete` when media can affect article/page rendering

Ignored events should return success from the webhook function so Strapi does not report false failures.

## Webhook Security

The CMS currently does not define `webhooks.defaultHeaders` in `config/server.ts`. First-pass setup should configure the Strapi Cloud webhook header in the admin UI:

```text
Authorization: Bearer <STRAPI_WEBHOOK_SECRET>
```

The frontend Netlify Function validates that header before calling the private Netlify Build Hook. Do not expose the Netlify Build Hook URL to Strapi directly or to browser JavaScript.
