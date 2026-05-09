import { GardaButton } from './garda-button'
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
      className="relative isolate min-h-screen overflow-hidden bg-garda-forest"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />
      {/* Greenish overlay matching the reference image */}
      <div className="absolute inset-0 bg-garda-forest/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-r from-garda-forest/60 via-garda-forest/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/40 to-transparent lg:hidden" />

      <div
        data-testid="hero-content"
        className="relative z-10 flex min-h-screen flex-col justify-end gap-8 px-6 pb-20 pt-32 sm:px-12 md:px-16 lg:px-24"
      >
        <div className="flex flex-col gap-6">
          <h1 className="max-w-[900px] font-sans text-[clamp(3.5rem,10vw,5.5rem)] font-black uppercase leading-[1] tracking-[-0.04em] text-white">
            {title || (
              <>
                ONE STOP FOOD <br />
                LOSS & WASTE <br />
                SOLUTION
              </>
            )}
          </h1>
          {subtitle && (
            <p className="max-w-[600px] text-lg font-medium text-white/90 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex">
          <GardaButton
            href={ctaLink || '/program'}
            variant="hero"
            className="h-16 px-8 text-lg"
          >
            {ctaText || 'Pelajari Selengkapnya'}
          </GardaButton>
        </div>
      </div>
    </section>
  )
}
