import { stripLocaleFromPath } from '#/lib/i18n/routing'

export type NavItem = {
  href: string
  label: string
  matchPaths?: string[]
}

export function normalizePath(path: string) {
  if (!path) return '/'
  const normalized = path.replace(/\/+$/, '')
  return normalized || '/'
}

export function isNavItemActive(item: NavItem, currentPath: string) {
  const current = normalizePath(stripLocaleFromPath(currentPath))
  const paths = item.matchPaths ?? [item.href]

  return paths.some((path) => {
    const target = normalizePath(stripLocaleFromPath(path))

    if (target === '/') {
      return current === '/'
    }

    return current === target || current.startsWith(`${target}/`)
  })
}
