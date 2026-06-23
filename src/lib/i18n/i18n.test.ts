import { describe, expect, it } from 'vitest'

import {
  getLangStaticPaths,
  getMessages,
  localizedPath,
  resolveLocale,
  switchLocalePath,
} from '#/lib/i18n'

describe('i18n routing', () => {
  it('resolves locale from lang param', () => {
    expect(resolveLocale('en')).toBe('en')
    expect(resolveLocale('id')).toBe('id')
    expect(resolveLocale(undefined)).toBe('id')
  })

  it('builds localized paths with locale prefix', () => {
    expect(localizedPath('/', 'id')).toBe('/id')
    expect(localizedPath('/program', 'en')).toBe('/en/program')
  })

  it('switches locale while preserving page path', () => {
    expect(switchLocalePath('/id/program', 'en')).toBe('/en/program')
    expect(switchLocalePath('/en/knowledge', 'id')).toBe('/id/knowledge')
  })

  it('exposes static paths for id and en', () => {
    expect(getLangStaticPaths()).toEqual([
      { params: { lang: 'id' } },
      { params: { lang: 'en' } },
    ])
  })

  it('provides localized UI messages', () => {
    expect(getMessages('id').nav.home).toBe('Beranda')
    expect(getMessages('en').nav.home).toBe('Home')
  })
})
