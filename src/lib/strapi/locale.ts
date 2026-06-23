import type { Locale } from '#/lib/i18n/locales'

export type StrapiLocaleOptions = {
  locale?: Locale
}

export function withStrapiLocale<T extends Record<string, unknown>>(
  query: T,
  locale: Locale = 'id',
) {
  return {
    ...query,
    locale,
  }
}
