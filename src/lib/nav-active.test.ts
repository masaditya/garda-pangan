import { describe, expect, test } from 'vitest'

import { isNavItemActive, normalizePath } from './nav-active'

const beranda = { href: '/', label: 'Beranda' }
const program = { href: '/program', label: 'Program' }
const berita = {
  href: '/knowledge',
  label: 'Berita',
  matchPaths: ['/knowledge', '/artikel'],
}

describe('nav-active', () => {
  test('normalizes trailing slashes', () => {
    expect(normalizePath('/program/')).toBe('/program')
    expect(normalizePath('/')).toBe('/')
  })

  test('marks home only on the root path', () => {
    expect(isNavItemActive(beranda, '/')).toBe(true)
    expect(isNavItemActive(beranda, '/program')).toBe(false)
  })

  test('marks nested routes as active for their section', () => {
    expect(isNavItemActive(program, '/program')).toBe(true)
    expect(isNavItemActive(program, '/program/')).toBe(true)
    expect(isNavItemActive(berita, '/knowledge/foo')).toBe(true)
    expect(isNavItemActive(berita, '/artikel/foo')).toBe(true)
  })
})
