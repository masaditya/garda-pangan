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

type SocialLinksProps = {
  youtube?: string | null
  tiktok?: string | null
  linkedin?: string | null
  instagram?: string | null
  facebook?: string | null
  className?: string
}

function SocialLinks({
  youtube,
  tiktok,
  linkedin,
  instagram,
  facebook,
  className,
}: SocialLinksProps) {
  const items = [
    { icon: Youtube, label: 'YouTube', href: youtube },
    { icon: TikTokIcon, label: 'TikTok', href: tiktok },
    { icon: Linkedin, label: 'LinkedIn', href: linkedin },
    { icon: Instagram, label: 'Instagram', href: instagram },
    { icon: Facebook, label: 'Facebook', href: facebook },
  ].filter((item) => Boolean(item.href))

  if (items.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href!}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
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
  email,
}: {
  currentPath: string
  locale: Locale
  email?: string | null
}) {
  const messages = getMessages(locale)
  const footerNavItems = getFooterNavItems(locale, messages)
  const displayEmail = email || 'hello@gardapangan.org'

  return (
    <SiteContainer className="flex flex-col gap-8 pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <nav
        aria-label="Footer navigation"
        className="inline-flex max-w-full rounded-3xl lg:rounded-full bg-[#0a3d24] p-1.5 sm:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5">
          {footerNavItems.map((item) => {
            const isActive = isNavItemActive(item, currentPath)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition duration-200',
                  isActive
                    ? 'bg-linear-to-b from-[#fffeba] to-[#ffe602] text-[#0e2316]'
                    : 'text-white hover:text-white/80',
                )}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>

      <a
        href={`mailto:${displayEmail}`}
        className="whitespace-nowrap text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.03em] text-white transition hover:text-garda-sun"
      >
        {displayEmail}
      </a>
    </SiteContainer>
  )
}

function FooterMiddle({
  locale,
  address,
  phone,
  email,
}: {
  locale: Locale
  address?: string | null
  phone?: string | null
  email?: string | null
}) {
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
          {address && <p>{address}</p>}
          {phone && <p>{phone}</p>}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-block underline underline-offset-2 transition hover:text-garda-sun"
            >
              {email}
            </a>
          )}
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

function FooterBottom({
  locale,
  socialLinks,
}: {
  locale: Locale
  socialLinks?: {
    youtube?: string | null
    tiktok?: string | null
    linkedin?: string | null
    instagram?: string | null
    facebook?: string | null
  } | null
}) {
  const year = new Date().getFullYear()
  const messages = getMessages(locale)

  return (
    <SiteContainer className="pb-10 pt-4">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-white/75">
          &copy; {year} {messages.footer.copyright}
        </p>

        <SocialLinks
          youtube={socialLinks?.youtube}
          tiktok={socialLinks?.tiktok}
          linkedin={socialLinks?.linkedin}
          instagram={socialLinks?.instagram}
          facebook={socialLinks?.facebook}
        />
      </div>
    </SiteContainer>
  )
}

type FooterProps = {
  currentPath?: string
  locale?: Locale
  address?: string | null
  phone?: string | null
  email?: string | null
  socialLinks?: {
    youtube?: string | null
    tiktok?: string | null
    linkedin?: string | null
    instagram?: string | null
    facebook?: string | null
  } | null
}

export default function Footer({
  currentPath = '/',
  locale = DEFAULT_LOCALE,
  address,
  phone,
  email,
  socialLinks,
}: FooterProps) {
  return (
    <footer className="overflow-hidden bg-[#042918] text-white">
      <FooterWatermark />
      <FooterNavBar currentPath={currentPath} locale={locale} email={email} />
      <FooterMiddle locale={locale} address={address} phone={phone} email={email} />
      <FooterBottom locale={locale} socialLinks={socialLinks} />
    </footer>
  )
}
