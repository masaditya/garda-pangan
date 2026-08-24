import { DEFAULT_LOCALE, type Locale } from './locales'

export function getLocalePrefix(locale: Locale) {
  return `/${locale}`
}

export function localizedPath(path: string, locale: Locale = DEFAULT_LOCALE) {
  if (!path) {
    return path
  }
  if (path.includes('wa.me')) {
    return path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `https://${path}`
  }
  if (path.startsWith('mailto:') || path.includes('mailto:')) {
    return path
  }
  if (path.startsWith('http') || path.startsWith('#')) {
    return path
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = normalized === '/' ? '' : normalized

  return `${getLocalePrefix(locale)}${base}` || getLocalePrefix(locale)
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en'
  }

  return 'id'
}

export function stripLocaleFromPath(pathname: string) {
  if (pathname === '/en' || pathname === '/id') {
    return '/'
  }

  if (pathname.startsWith('/en/')) {
    const stripped = pathname.slice(3)
    return stripped || '/'
  }

  if (pathname.startsWith('/id/')) {
    const stripped = pathname.slice(3)
    return stripped || '/'
  }

  return pathname
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  return localizedPath(stripLocaleFromPath(pathname), targetLocale)
}
