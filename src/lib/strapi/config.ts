const DEFAULT_STRAPI_URL = 'https://promising-freedom-82afaec97e.strapiapp.com'

export function getStrapiBaseUrl() {
  const configuredUrl =
    import.meta.env.STRAPI_URL || import.meta.env.VITE_STRAPI_URL

  return (configuredUrl || DEFAULT_STRAPI_URL).replace(/\/$/, '')
}

export function getStrapiApiToken() {
  return import.meta.env.STRAPI_API_TOKEN
}
