export const LOCALES = ['id', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'id'

export function isLocale(value: string | undefined): value is Locale {
  return value === 'id' || value === 'en'
}

export function resolveLocale(lang?: string): Locale {
  return lang === 'en' ? 'en' : 'id'
}
export function getIntlLocale(locale: Locale) {
  return locale === 'en' ? 'en-US' : 'id-ID'
}
