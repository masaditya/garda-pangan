const DEFAULT_STRAPI_URL = 'https://gardapangan.org'

export function getStrapiBaseUrl() {
  const env = import.meta.env
  const configuredUrl = env.PUBLIC_STRAPI_URL || env.STRAPI_URL || env.VITE_STRAPI_URL

  return (configuredUrl || DEFAULT_STRAPI_URL).replace(/\/$/, '')
}

export function getStrapiApiToken() {
  return import.meta.env.STRAPI_API_TOKEN
}
