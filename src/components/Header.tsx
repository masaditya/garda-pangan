import { Menu } from 'lucide-react'

import { GardaButton } from './garda-button'
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
import { cn } from '#/lib/utils'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/program', label: 'Program' },
  { href: '/event', label: 'Event' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/merchandise', label: 'Produk' },
  { href: '/kontak', label: 'Kontak' },
]

type HeaderProps = {
  currentPath?: string
}

function LanguageSwitcher() {
  return (
    <button className="flex items-center gap-2 rounded-full border border-garda-border bg-white px-4 py-2 text-sm font-medium text-garda-forest shadow-sm transition hover:bg-garda-mint-soft">
      <span className="flex size-5 items-center justify-center overflow-hidden rounded-full">
        <img
          src="https://flagcdn.com/us.svg"
          alt="English (US)"
          className="h-full w-full object-cover"
        />
      </span>
      <span>English (US)</span>
      <svg
        className="size-4 opacity-50"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

export default function Header({ currentPath = '/' }: HeaderProps) {
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
                  const isActive = item.href === currentPath

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        asChild
                        active={isActive}
                        className={cn(
                          'rounded-full px-5 py-2 text-sm font-medium text-garda-forest/70 transition hover:bg-garda-mint-soft hover:text-garda-forest',
                          isActive &&
                          'bg-garda-mint-soft text-garda-forest font-bold',
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
                    const isActive = item.href === currentPath

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'rounded-2xl px-4 py-3 text-base font-medium text-garda-forest/80 transition hover:bg-white hover:text-garda-forest',
                          isActive && 'bg-white text-garda-forest shadow-sm',
                        )}
                        aria-current={isActive ? 'page' : undefined}
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
