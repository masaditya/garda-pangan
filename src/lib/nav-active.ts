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
  const current = normalizePath(currentPath)
  const paths = item.matchPaths ?? [item.href]

  return paths.some((path) => {
    const target = normalizePath(path)

    if (target === '/') {
      return current === '/'
    }

    return current === target || current.startsWith(`${target}/`)
  })
}
