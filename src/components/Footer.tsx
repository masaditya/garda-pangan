import { Youtube, Instagram, Linkedin, Facebook } from 'lucide-react'

import { GardaLogo } from './garda-logo'
import { SiteContainer } from './site-container'
import { cn } from '#/lib/utils'

// ─── Data ────────────────────────────────────────────────────────────────────

const footerNavItems = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/about', label: 'About' },
  { href: '/mitra', label: 'Mitra' },
  { href: '/penerima', label: 'Penerima' },
]

const footerLinkColumns = [
  {
    title: 'Resource',
    links: [
      { label: 'Knowledge', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Legal', href: '#' },
    ],
  },
  {
    title: 'Career',
    links: [
      { label: 'Jobs', href: '#' },
      { label: 'Hiring', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Tips & Tricks', href: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
]

const legalLinks = ['Terms', 'Privacy', 'Cookies', 'Legal', 'Recalls']

// ─── TikTok Icon ─────────────────────────────────────────────────────────────

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

// ─── Social Links ─────────────────────────────────────────────────────────────

type SocialLinksProps = {
  variant: 'bordered' | 'subtle'
  className?: string
}

const socialItems = [
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: TikTokIcon, label: 'TikTok', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
]

function SocialLinks({ variant, className }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {socialItems.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={cn(
            'flex size-12 items-center justify-center rounded-full transition hover:opacity-70',
            variant === 'bordered' && 'border border-black/16 bg-white',
            variant === 'subtle' && 'bg-[#ffffff14]',
          )}
        >
          <Icon className="size-6 text-garda-ink" />
        </a>
      ))}
    </div>
  )
}

// ─── Section 1: Watermark ────────────────────────────────────────────────────

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

// ─── Section 2: Nav bar + Email ───────────────────────────────────────────────

function FooterNavBar({ currentPath }: { currentPath: string }) {
  return (
    <SiteContainer className="flex flex-col gap-6 pb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      {/* Pill nav bar */}
      <nav
        aria-label="Footer navigation"
        className="inline-flex overflow-x-auto rounded-full bg-garda-forest p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-1.5">
          {footerNavItems.map((item) => {
            const isActive = item.href === currentPath

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition',
                  isActive
                    ? 'bg-garda-sun font-bold text-[#252525]'
                    : 'font-medium text-white',
                )}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Large email */}
      <a
        href="mailto:hello@gardapangan.org"
        className="whitespace-nowrap font-normal tracking-[-0.02em] text-garda-ink transition hover:text-garda-forest text-[clamp(1.5rem,5vw,4rem)]"
      >
        hello@gardapangan.org
      </a>
    </SiteContainer>
  )
}

// ─── Section 3: Contact + Link columns ───────────────────────────────────────

function FooterContent() {
  return (
    <SiteContainer className="flex flex-col gap-12 py-12 lg:flex-row lg:gap-16 lg:py-16">
      {/* Left: Contact info */}
      <div className="flex flex-col gap-5 lg:w-80 lg:shrink-0">
        <img
          src="/figma/garda-logo.png"
          alt="Garda Pangan"
          style={{ width: '90px', height: '42px' }}
        />
        <div className="space-y-1.5">
          <p className="text-base font-medium leading-relaxed text-garda-ink tracking-[-0.02em]">
            Jl Semolowaru Indah I J4 Surabaya 60119
          </p>
          <p className="text-base font-medium text-garda-ink tracking-[-0.02em]">
            (+62) 895337847614
          </p>
          <a
            href="mailto:gardapanganid@gmail.com"
            className="block text-base font-medium text-garda-ink underline underline-offset-2 tracking-[-0.02em] hover:text-garda-forest transition"
          >
            gardapanganid@gmail.com
          </a>
        </div>
        <SocialLinks variant="bordered" />
      </div>

      {/* Right: Link columns */}
      <div className="ml-auto grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-10 lg:gap-14">
        {footerLinkColumns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-base tracking-[-0.02em] text-[#020202]">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base font-normal tracking-[-0.02em] text-[#020202cc] transition hover:text-garda-forest"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SiteContainer>
  )
}

// ─── Section 4: Bottom bar ────────────────────────────────────────────────────

function FooterBottom() {
  const year = new Date().getFullYear()

  return (
    <SiteContainer className="pb-8">
      {/* Divider */}
      <hr className="border-garda-border" />

      <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-between">
        {/* Legal links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-normal text-garda-ink transition hover:text-garda-forest"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm font-medium text-garda-ink-soft whitespace-nowrap">
          &copy; {year} Copyright By gardapangan.org
        </p>

        {/* Social icons */}
        <SocialLinks variant="subtle" />
      </div>
    </SiteContainer>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

type FooterProps = {
  currentPath?: string
}

export default function Footer({ currentPath = '/' }: FooterProps) {
  return (
    <footer className="overflow-hidden bg-white">
      <FooterWatermark />
      <FooterNavBar currentPath={currentPath} />
      <FooterContent />
      <FooterBottom />
    </footer>
  )
}
