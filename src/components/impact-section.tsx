import { SectionShell } from './section-shell'
import { MetricCard } from './metric-card'
import { Rocket } from 'lucide-react'

type ImpactSectionProps = {
  title?: string | null
  portionsRescued?: string | null
  co2Reduced?: string | null
  foodLossPotential?: string | null
  foodScrap?: string | null
}

export function ImpactSection({
  title,
  portionsRescued,
  co2Reduced,
  foodLossPotential,
  foodScrap,
}: ImpactSectionProps) {
  const formatNumber = (val?: string | null) => {
    if (!val) return '0'
    const num = parseInt(val.replace(/,/g, ''), 10)
    if (isNaN(num)) return val
    return num.toLocaleString('en-US')
  }

  const impactMetrics = [
    {
      value: formatNumber(portionsRescued) || '608,311',
      label: 'PORTIONS OF FOOD RESCUED',
      imageSrc: '/figma/impact-clipboard.png',
      variant: 'clipboard' as const,
      testId: 'impact-card-top-left',
    },
    {
      value: formatNumber(co2Reduced) || '788,500',
      label: 'KG CO2-ek greenhouse gas emission reduced',
      imageSrc: '/figma/impact-megaphone.png',
      variant: 'megaphone' as const,
      testId: 'impact-card-top-right',
    },
    {
      value: formatNumber(foodLossPotential) || '143',
      label: 'TONS OF POTENTIAL FOOD LOSES AND WASTE RESCUED',
      imageSrc: '/figma/impact-target.png',
      variant: 'target' as const,
      testId: 'impact-card-bottom-left',
    },
    {
      value: formatNumber(foodScrap) || '272',
      label: 'TOONS OF FOOD SCRAP PROCESSED INTO ANIMAL FEEDS',
      imageSrc: '/figma/impact-ecosystem.png',
      variant: 'ecosystem' as const,
      testId: 'impact-card-bottom-right',
    },
  ]

  return (
    <SectionShell
      aria-labelledby="impact-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-0"
    >
      <div
        data-testid="impact-panel"
        className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center overflow-hidden bg-white px-6 py-16 md:py-24 lg:py-32"
      >
        {/* Background Circle */}
        <div className="absolute left-1/2 top-1/2 z-0 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-garda-mint/40 md:size-[500px] lg:size-[650px]" />

        <div className="relative z-10 grid w-full max-w-[1400px] gap-8 md:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* Card 1: Top Left */}
          <div className="flex justify-center md:justify-start">
            <MetricCard {...impactMetrics[0]} className="md:rotate-[-2deg]" />
          </div>

          {/* Card 2: Top Right */}
          <div className="flex justify-center md:justify-end">
            <MetricCard {...impactMetrics[1]} className="md:rotate-[2deg]" />
          </div>

          {/* Center Element (Desktop Only overlay or separate row) */}
          <div className="flex flex-col items-center justify-center py-10 md:absolute md:inset-0 md:pointer-events-none md:py-0">
            <div className="pointer-events-auto flex flex-col items-center gap-4 text-center">
              <h2
                id="impact-heading"
                className="font-sans text-[3rem] font-black uppercase leading-none tracking-tight text-garda-forest md:text-[4.5rem] lg:text-[5.5rem]"
              >
                {title || (
                  <>
                    OUR <br /> IMPACT
                  </>
                )}
              </h2>
              <Rocket className="size-16 fill-garda-forest text-garda-forest md:size-20 lg:size-24" />
            </div>
          </div>

          {/* Card 3: Bottom Left */}
          <div className="flex justify-center md:justify-start md:pt-20 lg:pt-32">
            <MetricCard {...impactMetrics[2]} className="md:rotate-[1deg]" />
          </div>

          {/* Card 4: Bottom Right */}
          <div className="flex justify-center md:justify-end md:pt-20 lg:pt-32">
            <MetricCard {...impactMetrics[3]} className="md:rotate-[-1deg]" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
