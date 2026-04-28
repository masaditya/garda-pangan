# Netlify And Strapi Cloud Deployment

This site builds as Astro SSG on Netlify and reads content from the Strapi Cloud CMS during build.

## Netlify Build Settings

The repository includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
```

## Netlify Environment Variables

Configure these in Netlify project settings:

- `STRAPI_URL`: Strapi Cloud base URL, for example `https://promising-freedom-82afaec97e.strapiapp.com`
- `STRAPI_API_TOKEN`: optional Strapi API token if public read permissions are not enough for build-time content
- `STRAPI_WEBHOOK_SECRET`: shared secret used to verify Strapi webhook requests
- `NETLIFY_BUILD_HOOK_URL`: private Netlify Build Hook URL for the production branch

Do not expose `STRAPI_API_TOKEN`, `STRAPI_WEBHOOK_SECRET`, or `NETLIFY_BUILD_HOOK_URL` to browser code.

## Strapi Version Policy

The CMS app is `/Users/naufaldi.satriya/WebApps/garda-pangan-cms` and currently uses Strapi `5.42.0`.

The Astro migration does not require a Strapi upgrade or CMS code change. If a Strapi upgrade is needed later, run this in the CMS repo first and review the proposed changes:

```bash
npm run upgrade:dry
```

Only run `npm run upgrade` after reviewing and approving the dry-run output.

## Netlify Build Hook

1. Open the Netlify site.
2. Go to Project configuration > Build & deploy > Continuous deployment > Build hooks.
3. Add a build hook for the production branch.
4. Copy the generated URL into Netlify as `NETLIFY_BUILD_HOOK_URL`.

The Strapi webhook should not call this URL directly. It should call the filtered Netlify Function:

```text
https://<site-domain>/.netlify/functions/strapi-rebuild
```

## Strapi Cloud Webhook

Create one webhook in Strapi Cloud/admin:

- URL: `https://<site-domain>/.netlify/functions/strapi-rebuild`
- Method: `POST`
- Header:

```text
Authorization: Bearer <STRAPI_WEBHOOK_SECRET>
```

Enable these events:

- `entry.publish`
- `entry.update`
- `entry.delete`
- `entry.unpublish`
- `media.update`
- `media.delete`

The Netlify Function triggers a rebuild only for relevant content:

- `article`
- `about`
- `mitra`
- `merchandise-page`
- media updates/deletes

Unrelated Strapi events return success without triggering a Netlify build.

## Manual Webhook Smoke Test

Use this after deploying the Netlify Function:

```bash
curl -i \
  -X POST "https://<site-domain>/.netlify/functions/strapi-rebuild" \
  -H "Authorization: Bearer <STRAPI_WEBHOOK_SECRET>" \
  -H "X-Strapi-Event: entry.publish" \
  -H "Content-Type: application/json" \
  -d '{"event":"entry.publish","model":"article"}'
```

Expected result:

- HTTP `202`
- Response body contains `Build triggered`
- A new deploy appears in Netlify

Ignored-event test:

```bash
curl -i \
  -X POST "https://<site-domain>/.netlify/functions/strapi-rebuild" \
  -H "Authorization: Bearer <STRAPI_WEBHOOK_SECRET>" \
  -H "X-Strapi-Event: entry.update" \
  -H "Content-Type: application/json" \
  -d '{"event":"entry.update","model":"testimonial"}'
```

Expected result:

- HTTP `200`
- Response body contains `Ignored Strapi event`
- No Netlify build is triggered

## Validation Checklist

- Netlify build command completes successfully.
- `/`, `/tentang-kami`, `/mitra`, `/relawan`, `/merchandise`, and `/artikel` deploy as static pages.
- Published articles appear on `/artikel`.
- Published article slugs generate `/artikel/<slug>` pages when Strapi has published article entries.
- Updating or publishing an article in Strapi triggers the Netlify Function and then a Netlify build.
- Deleting or unpublishing an article removes it from the next deployed static build.
