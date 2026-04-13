import { SectionShell } from './section-shell'
import { MetricCard } from './metric-card'

const impactMetrics = [
  {
    value: '608,311',
    label: 'PORTIONS OF FOOD RESCUED',
    imageSrc: '/figma/impact-clipboard.png',
    variant: 'clipboard',
    placement: 'top-left',
    testId: 'impact-card-top-left',
  },
  {
    value: '788,500',
    label: 'KG CO2-ek greenhouse gas emission reduced',
    imageSrc: '/figma/impact-megaphone.png',
    variant: 'megaphone',
    placement: 'top-right',
    testId: 'impact-card-top-right',
  },
  {
    value: '143',
    label: 'TONS OF POTENTIAL FOOD LOSES AND WASTE RESCUED',
    imageSrc: '/figma/impact-target.png',
    variant: 'target',
    placement: 'bottom-left',
    testId: 'impact-card-bottom-left',
  },
  {
    value: '272',
    label: 'TOONS OF FOOD SCRAP PROCESSED INTO ANIMAL FEEDS',
    imageSrc: '/figma/impact-ecosystem.png',
    variant: 'ecosystem',
    placement: 'bottom-right',
    testId: 'impact-card-bottom-right',
  },
] as const

export function ImpactSection() {
  return (
    <SectionShell
      aria-labelledby="impact-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-0"
    >
      <div
        data-testid="impact-panel"
        className="relative mx-auto w-full max-w-[1376px] overflow-hidden rounded-[2rem] border border-[#e6e6e6] bg-white px-4 py-8 sm:px-6 lg:px-0 lg:pt-[4.8125rem] lg:pb-[6.25rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[4.651%] top-[8.122%] hidden rounded-[2rem] border border-[#f0efe8] bg-white/80 lg:block lg:bottom-[10.232%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[18.168%] top-[29.535%] hidden size-[15.75rem] rounded-full border-[16px] border-[#f6d54f]/80 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[47.529%] top-[49.578%] hidden size-[15.75rem] rounded-full border-[16px] border-[#49f6ab]/60 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8.066%] top-[54.641%] hidden size-[14.5rem] rounded-full border-[14px] border-[#f7bfd0]/75 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-7.194%] top-[36.181%] hidden size-[14.5rem] rounded-full border-[14px] border-[#f7bfd0]/75 lg:block"
        />

        <div
          data-testid="impact-stage"
          className="relative grid gap-5 lg:min-h-[771px] lg:grid-cols-[406px_minmax(280px,1fr)_406px] lg:grid-rows-[279px_279px] lg:gap-x-0 lg:gap-y-0 lg:px-[4rem]"
        >
          <MetricCard {...impactMetrics[0]} />
          <MetricCard {...impactMetrics[1]} />

          <div className="relative z-10 flex min-h-[20rem] flex-col items-center justify-center gap-2 px-4 text-center lg:col-start-2 lg:row-[1/3] lg:min-h-[771px] lg:-mx-[3.5rem] lg:-mt-[1.25rem]">
            <h2
              id="impact-heading"
              className="font-sans text-[clamp(4rem,9vw,6.75rem)] font-black uppercase leading-[0.9] tracking-[0.02em] text-[#1a1a1a] lg:text-[7.5rem]"
            >
              OUR IMPACT
            </h2>
            <div className="flex justify-center">
              <img
                src="/figma/impact-heart.png"
                alt="Illustration of food care"
                className="h-auto w-[13rem] object-contain sm:w-[15rem] lg:mt-4 lg:w-[20rem]"
              />
            </div>
          </div>

          <MetricCard {...impactMetrics[2]} />
          <MetricCard {...impactMetrics[3]} />
        </div>
      </div>
    </SectionShell>
  )
}
