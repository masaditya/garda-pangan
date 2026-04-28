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
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/mitra', label: 'Mitra' },
  { href: '/penerima', label: 'Penerima' },
  { href: '/relawan', label: 'Relawan' },
  { href: '/merchandise', label: 'Merchandise' },
]

type HeaderProps = {
  currentPath?: string
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50">
      <SiteContainer>
        <div className="pointer-events-auto flex min-h-20 items-center justify-between gap-4 rounded-full border border-white/60 bg-white/92 px-4 py-3 shadow-[0_24px_60px_rgba(13,42,22,0.14)] backdrop-blur-xl sm:px-5 lg:px-7">
          <a
            href="/"
            className="shrink-0 no-underline"
            aria-label="Garda Pangan"
          >
            <GardaLogo />
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden flex-1 justify-center lg:flex"
          >
            <NavigationMenu className="max-w-none" viewport={false}>
              <NavigationMenuList className="gap-1.5 bg-transparent">
                {navItems.map((item) => {
                  const isActive = item.href === currentPath

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        asChild
                        active={isActive}
                        className={cn(
                          'rounded-full px-4 py-2.5 text-sm font-medium text-garda-forest/80 transition hover:bg-garda-mint-soft hover:text-garda-forest',
                          isActive &&
                            'bg-garda-mint text-garda-forest shadow-[inset_0_0_0_1px_rgba(17,113,61,0.06)]',
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
            <GardaButton href="/dukung" className="hidden sm:inline-flex">
              Dukung
            </GardaButton>

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
                  Explore Garda Pangan navigation links and the primary donation
                  call to action.
                </SheetDescription>
                <div className="mb-5">
                  <GardaLogo />
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
                <Separator className="mt-5 bg-garda-border" />
                <GardaButton
                  href="/dukung"
                  className="mt-5 w-full justify-between"
                >
                  Dukung
                </GardaButton>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </SiteContainer>
    </header>
  )
}
