const DEFAULT_STRAPI_URL = 'https://promising-freedom-82afaec97e.strapiapp.com'

export function getStrapiBaseUrl() {
  return (import.meta.env.STRAPI_URL || DEFAULT_STRAPI_URL).replace(/\/$/, '')
}

export function getStrapiApiToken() {
  return import.meta.env.STRAPI_API_TOKEN
}
