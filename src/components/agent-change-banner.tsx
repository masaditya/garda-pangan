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
  ctaText = "TELL ME MORE",
  ctaLink = "/relawan",
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
        
        {/* Dark panel */}
        <div className="flex w-full flex-col lg:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0e3822] py-10 sm:py-0 px-8 sm:px-10 sm:pl-0 lg:rounded-3xl relative overflow-hidden">
          
          {/* Person image - now inside container */}
          <div className="relative hidden shrink-0 lg:block">
            <div className="h-64 w-52 overflow-hidden rounded-2xl xl:h-72 xl:w-60 shadow-lg">
              <img
                src={personImage || '/figma/agent-person.jpg'}
                alt="Relawan Garda Pangan"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 text-left lg:text-right w-full lg:w-auto">
            <div className="flex flex-col items-start lg:items-end gap-4">
              <h2
                id="agent-banner-heading"
                className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-normal leading-tight tracking-tight text-[#ffe602]"
              >
                {title || 'Ayo Jadi agen perubahan'}
              </h2>
              <p className="max-w-md text-base leading-normal text-white/80 sm:text-lg">
                {subtitle ||
                  'Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan kerawanan pangan di Indonesia.'}
              </p>
            </div>

            <div className="shrink-0">
              <GardaButton
                href={ctaLink || '#'}
                variant="subtle"
                className="min-w-[180px] bg-[#ffe602]! !text-garda-forest!"
              >
                TELL ME MORE
              </GardaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
