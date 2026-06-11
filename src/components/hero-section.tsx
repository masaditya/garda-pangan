import { ChevronDown } from 'lucide-react'

import { GardaButton } from './garda-button'
import { HeroTitle } from './hero-title'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

type HeroSectionProps = {
  title?: string | null
  subtitle?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  backgroundImage?: string | null
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroSectionProps) {
  const bgUrl =
    normalizeStrapiMediaUrl(backgroundImage) || '/garda-hero-reference.png'

  return (
    <section
      role="banner"
      className="relative isolate min-h-screen overflow-hidden bg-garda-forest-deep"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />
      <div className="absolute inset-0 bg-garda-forest-deep/55" />
      <div className="absolute inset-0 bg-linear-to-b from-garda-forest-deep/30 via-transparent to-garda-forest-deep/70" />

      <div
        data-testid="hero-content"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-6 pb-24 pt-32 text-center sm:px-12 md:px-16 lg:px-24"
      >
        <div className="flex max-w-5xl flex-col items-center gap-6">
          <h1
            aria-label="ONE STOP FOOD LOSS & WASTE SOLUTION"
            className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
          >
            {title ? (
              <span className="block text-white">{title}</span>
            ) : (
              <HeroTitle />
            )}
          </h1>
          {subtitle ? (
            <p className="max-w-[600px] text-lg font-medium text-white/85 sm:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>

        <GardaButton
          href={ctaLink || '/program'}
          variant="hero"
          className="h-16 px-8 text-lg"
        >
          {ctaText || 'Pelajari Selengkapnya'}
        </GardaButton>

        <a
          href="#featured-by"
          aria-label="Scroll ke konten"
          className="absolute bottom-10 flex size-11 items-center justify-center rounded-full border border-garda-sun/40 bg-garda-sun/10 text-garda-sun transition hover:bg-garda-sun/20"
        >
          <ChevronDown className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
