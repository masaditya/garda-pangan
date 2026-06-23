import { Youtube, Instagram, Linkedin, Facebook } from 'lucide-react'

import { SiteContainer } from './site-container'
import {
  DEFAULT_LOCALE,
  getFooterNavItems,
  getFooterSecondaryLinks,
  getMessages,
  type Locale,
} from '#/lib/i18n'
import { isNavItemActive } from '#/lib/nav-active'
import { cn } from '#/lib/utils'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" />
    </svg>
  )
}

const socialItems = [
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: TikTokIcon, label: 'TikTok', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
]

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {socialItems.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  )
}

function FooterWatermark() {
  return (
    <div className="relative h-[160px] overflow-hidden sm:h-[250px] lg:h-[300px] xl:h-[350px]">
      <p
        className="absolute top-[39px] select-none whitespace-nowrap font-black leading-none tracking-[-0.08em] text-[#939393] text-[80px] sm:text-[140px] lg:text-[200px] xl:text-[256px]"
        style={{ opacity: 0.16, width: '1486px', left: 'calc(50% - 743px)' }}
        aria-hidden="true"
      >
        GardaPangan
      </p>
    </div>
  )
}

function FooterNavBar({
  currentPath,
  locale,
}: {
  currentPath: string
  locale: Locale
}) {
  const messages = getMessages(locale)
  const footerNavItems = getFooterNavItems(locale, messages)

  return (
    <SiteContainer className="flex flex-col gap-8 pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <nav
        aria-label="Footer navigation"
        className="inline-flex max-w-full overflow-x-auto rounded-full bg-[#0a3d24] p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-1.5">
          {footerNavItems.map((item) => {
            const isActive = isNavItemActive(item, currentPath)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-garda-sun text-[#252525]'
                    : 'text-white hover:text-white/90',
                )}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>

      <a
        href="mailto:hello@gardapangan.org"
        className="whitespace-nowrap text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium tracking-[-0.03em] text-white transition hover:text-garda-sun"
      >
        hello@gardapangan.org
      </a>
    </SiteContainer>
  )
}

function FooterMiddle({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const secondaryLinks = getFooterSecondaryLinks(locale, messages)

  return (
    <SiteContainer className="flex flex-col gap-10 py-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:py-10">
      <div className="flex max-w-md flex-col gap-5">
        <img
          src="/figma/garda-logo.png"
          alt="Garda Pangan"
          className="h-[42px] w-[90px] object-contain object-left"
        />
        <div className="space-y-1.5 text-sm font-medium leading-relaxed text-white/90 sm:text-base">
          <p>Jl Semolowaru Indah I J4 Surabaya 60119</p>
          <p>(+62) 895337847614</p>
          <a
            href="mailto:gardapanganid@gmail.com"
            className="inline-block underline underline-offset-2 transition hover:text-garda-sun"
          >
            gardapanganid@gmail.com
          </a>
        </div>
      </div>

      <nav
        aria-label="Footer secondary links"
        className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end lg:pt-2"
      >
        {secondaryLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-white/90 transition hover:text-garda-sun sm:text-base"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </SiteContainer>
  )
}

function FooterBottom({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear()
  const messages = getMessages(locale)

  return (
    <SiteContainer className="pb-10 pt-4">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-white/75">
          &copy; {year} {messages.footer.copyright}
        </p>

        <SocialLinks />
      </div>
    </SiteContainer>
  )
}

type FooterProps = {
  currentPath?: string
  locale?: Locale
}

export default function Footer({
  currentPath = '/',
  locale = DEFAULT_LOCALE,
}: FooterProps) {
  return (
    <footer className="overflow-hidden bg-[#042918] text-white">
      <FooterWatermark />
      <FooterNavBar currentPath={currentPath} locale={locale} />
      <FooterMiddle locale={locale} />
      <FooterBottom locale={locale} />
    </footer>
  )
}
