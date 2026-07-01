import { GardaButton } from './garda-button'

type AgentChangeBannerProps = {
  title?: string | null
  subtitle?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  backgroundImage?: string | null
  personImage?: string | null
}

export function AgentChangeBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  personImage,
}: AgentChangeBannerProps) {
  return (
    <section
      aria-labelledby="agent-banner-heading"
      className="relative overflow-hidden bg-[#0e2316]"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage || '/figma/agent-banner-bg.jpg'}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0e2316]/60" />
      </div>

      {/* Content panel */}
      <div className="relative mx-auto flex max-w-[1240px] items-center px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Person image */}
        <div className="relative mr-8 hidden shrink-0 lg:block">
          <div className="h-64 w-52 overflow-hidden rounded-2xl xl:h-72 xl:w-60">
            <img
              src={personImage || '/figma/agent-person.jpg'}
              alt="Relawan Garda Pangan"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Dark panel */}
        <div className="flex w-full flex-col items-start gap-6 rounded-2xl border border-white/10 bg-[#0e3822] px-8 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:rounded-3xl">
          <div className="flex flex-col gap-4">
            <h2
              id="agent-banner-heading"
              className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-normal leading-tight tracking-tight text-[#ffe602]"
            >
              {title || 'Ayo Jadi agen perubahan'}
            </h2>
            <p className="max-w-md text-balance text-base leading-normal text-white/80 sm:text-lg">
              {subtitle ||
                'Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan kerawanan pangan di Indonesia.'}
            </p>
          </div>

          <div className="shrink-0">
            <GardaButton
              href={ctaLink || '#'}
              variant="impact"
              className="min-w-[180px] bg-[#ffe602]! text-garda-forest!"
            >
              {ctaText || 'TELL ME MORE'}
            </GardaButton>
          </div>
        </div>
      </div>
    </section>
  )
}
