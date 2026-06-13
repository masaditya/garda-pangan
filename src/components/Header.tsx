import { Globe, Menu } from 'lucide-react'

import { GardaLogo } from './garda-logo'
import { SiteContainer } from './site-container'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '#/components/ui/navigation-menu'
import { Separator } from '#/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'
import { Button } from '#/components/ui/button'
import { isNavItemActive, type NavItem } from '#/lib/nav-active'
import { cn } from '#/lib/utils'

const navItems: NavItem[] = [
  { href: '/', label: 'Beranda' },
  { href: '/program', label: 'Program' },
  { href: '/support', label: 'Donasi' },
  { href: '/relawan', label: 'Relawan' },
  {
    href: '/knowledge',
    label: 'Berita',
    matchPaths: ['/knowledge', '/artikel'],
  },
  { href: '/kontak', label: 'Kontak' },
]

const inactiveNavClassName =
  'text-garda-forest/70 hover:bg-garda-mint-soft hover:text-garda-forest'

const activeNavClassName =
  'bg-garda-forest text-garda-sun hover:bg-garda-forest hover:text-garda-sun data-[active=true]:bg-garda-forest data-[active=true]:text-garda-sun data-[active=true]:hover:bg-garda-forest data-[active=true]:hover:text-garda-sun data-[active=true]:focus:bg-garda-forest'

type HeaderProps = {
  currentPath?: string
}

function getNavLinkClassName(isActive: boolean, className?: string) {
  return cn(
    'font-medium transition',
    className,
    isActive ? activeNavClassName : inactiveNavClassName,
  )
}

function LanguageSwitcher() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-garda-border bg-white px-4 py-2 text-sm font-medium text-garda-forest shadow-sm transition hover:bg-garda-mint-soft"
      aria-label="Language switcher"
    >
      <Globe className="size-4 text-garda-forest/70" aria-hidden="true" />
      <span>ID</span>
      <span className="text-garda-forest/40" aria-hidden="true">
        |
      </span>
      <span className="text-garda-forest/60">EN</span>
    </button>
  )
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const pathname = currentPath

  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50">
      <SiteContainer>
        <div className="pointer-events-auto flex min-h-[72px] items-center justify-between gap-4 rounded-full border border-white/60 bg-white/95 px-6 py-2 shadow-[0_24px_60px_rgba(13,42,22,0.12)] backdrop-blur-xl sm:px-8">
          <a
            href="/"
            className="shrink-0 no-underline"
            aria-label="Garda Pangan"
          >
            <GardaLogo className="h-10 w-auto" />
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden flex-1 justify-center lg:flex"
          >
            <NavigationMenu className="max-w-none" viewport={false}>
              <NavigationMenuList className="gap-1 bg-transparent">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(item, pathname)

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        asChild
                        active={isActive}
                        className={getNavLinkClassName(
                          isActive,
                          'rounded-full px-5 py-2 text-sm',
                        )}
                      >
                        <a
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {item.label}
                        </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 rounded-full border-garda-border bg-white/90 text-garda-forest shadow-[0_12px_24px_rgba(13,42,22,0.08)] hover:bg-garda-mint-soft lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(24rem,100vw)] border-garda-border bg-garda-paper px-6 py-6"
              >
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Explore Garda Pangan navigation links and language options.
                </SheetDescription>
                <div className="mb-5 flex items-center justify-between">
                  <GardaLogo />
                  <LanguageSwitcher />
                </div>
                <Separator className="bg-garda-border" />
                <nav
                  className="mt-5 flex flex-col gap-2"
                  aria-label="Mobile menu"
                >
                  {navItems.map((item) => {
                    const isActive = isNavItemActive(item, pathname)

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={getNavLinkClassName(
                          isActive,
                          'rounded-2xl px-4 py-3 text-base',
                        )}
                      >
                        {item.label}
                      </a>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </SiteContainer>
    </header>
  )
}
