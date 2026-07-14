const DEFAULT_STRAPI_URL = 'http://43.156.236.252:1337'

export function getStrapiBaseUrl() {
  const env = import.meta.env ?? {}
  const configuredUrl = env.STRAPI_URL || env.VITE_STRAPI_URL

  return (configuredUrl || DEFAULT_STRAPI_URL).replace(/\/$/, '')
}

export function getStrapiApiToken() {
  return import.meta.env?.STRAPI_API_TOKEN
}
