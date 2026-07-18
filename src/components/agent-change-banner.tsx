import { GardaButton } from './garda-button'
import { normalizeStrapiMediaUrl } from '../lib/strapi/client'

type AgentChangeBannerProps = {
  title?: string | null
  subtitle?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  personImage?: string | null
}

export function AgentChangeBanner({
  title,
  subtitle,
  ctaText = 'MULAI',
  ctaLink = '/relawan',
  personImage,
}: AgentChangeBannerProps) {
  console.log(personImage)
  return (
    <section
      aria-labelledby="agent-banner-heading"
      className="overflow-hidden"
    >
      {/* Split-screen: photo left, content right */}
      <div className="flex flex-col lg:flex-row min-h-[320px]">

        {/* Left: full-bleed photo */}
        <div className="relative w-full lg:w-1/2 min-h-[280px] lg:min-h-[360px]">
          <img
            src={normalizeStrapiMediaUrl(personImage) || '/figma/agent-person.jpg'}
            alt="Relawan Garda Pangan"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Right: dark green content panel */}
        <div className="relative flex w-full lg:w-1/2 flex-col items-start justify-center gap-6 bg-[#0e2f1a] px-8 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="flex flex-col items-start gap-4">
            <h2
              id="agent-banner-heading"
              className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-tight text-[#ffe602]"
            >
              {title || 'Ayo Jadi agen\nperubahan'}
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-white/80 sm:text-[1.05rem]">
              {subtitle ||
                'Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan kerawanan pangan di Indonesia.'}
            </p>
          </div>

          <GardaButton
            href={ctaLink || '#'}
            variant="impact"
            className="min-w-[180px]"
          >
            {ctaText || 'MULAI'}
          </GardaButton>
        </div>

      </div>
    </section>
  )
}
