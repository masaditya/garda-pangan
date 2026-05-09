import MarqueeComponent from 'react-fast-marquee'

import { LogoCard } from './logo-card'
import { SectionShell } from './section-shell'

// Handle ESM/CJS interop for Marquee
const Marquee = (MarqueeComponent as any).default || (MarqueeComponent as any)

const featuredLogos = [
  { id: 'tempo', label: 'TEMPO.CO', variant: 'tempo' },
  { id: 'cnn', label: 'CNN Indonesia', variant: 'cnn' },
  { id: 'metro', label: 'METRO TV', variant: 'metro' },
  { id: 'forbes', label: 'Forbes Indonesia', variant: 'forbes' },
  { id: 'bbc', label: 'BBC NEWS', variant: 'bbc' },
  { id: 'trans-1', label: 'TRANS TV', variant: 'trans' },
  { id: 'reader-1', label: "Reader's Digest", variant: 'reader' },
]

type LogoItem = (typeof featuredLogos)[number]

const RowLogos = ({
  logos,
  direction = 'left',
}: {
  logos: LogoItem[]
  direction?: 'left' | 'right'
}) => (
  <Marquee
    direction={direction}
    speed={40}
    gradient={true}
    gradientColor="white"
    gradientWidth={100}
    className="overflow-hidden py-4"
    pauseOnHover={true}
  >
    {logos.map((logo, idx) => (
      <LogoCard
        key={`${logo.id}-${idx}`}
        className="mx-3 w-[180px] lg:w-[280px]"
        data-testid={`featured-card-${logo.id}`}
      >
        <span
          className={
            logo.variant === 'tempo'
              ? 'text-center text-[1.4rem] font-black tracking-tight text-[#d7352a] lg:text-[1.8rem]'
              : logo.variant === 'cnn'
                ? 'flex flex-col items-center text-[#cf1e1e]'
                : logo.variant === 'metro'
                  ? 'text-center text-[1.3rem] font-black tracking-tight text-[#1d6db4] lg:text-[1.6rem]'
                  : logo.variant === 'forbes'
                    ? 'flex items-start text-black'
                    : logo.variant === 'bbc'
                      ? 'flex flex-col items-center rounded-sm bg-[#bb1e22] px-3 py-1.5 text-[0.85rem] font-black tracking-wider text-white'
                      : logo.variant === 'trans'
                        ? 'text-center text-[1.25rem] font-black tracking-tight text-[#1c4e9e] lg:text-[1.5rem]'
                        : 'text-center text-[1.6rem] font-medium tracking-tight text-[#d7d7d7]'
          }
          aria-label={logo.label}
        >
          {logo.variant === 'cnn' ? (
            <>
              <span className="text-[1.4rem] font-black lg:text-[1.7rem]">
                CNN
              </span>
              <span className="text-[0.6rem] font-bold">Indonesia</span>
            </>
          ) : logo.variant === 'forbes' ? (
            <>
              <span className="text-[1.6rem] font-black lg:text-[2rem]">
                Forbes
              </span>
              <span className="ml-1 text-[0.5rem] font-semibold">
                Indonesia
              </span>
            </>
          ) : logo.variant === 'bbc' ? (
            <>
              <span>BBC</span>
              <span>NEWS</span>
            </>
          ) : (
            logo.label
          )}
        </span>
      </LogoCard>
    ))}
  </Marquee>
)

export function FeaturedBySection() {
  const tripleLogos = [...featuredLogos, ...featuredLogos, ...featuredLogos]

  return (
    <SectionShell
      aria-labelledby="featured-by-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-0"
    >
      <div className="mx-auto flex w-full flex-col gap-8 md:gap-12">
        <div className="flex justify-center text-center">
          <h2
            id="featured-by-heading"
            className="font-sans text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight text-garda-forest"
          >
            FEATURED BY
          </h2>
        </div>

        <div className="flex flex-col gap-2 overflow-hidden">
          <RowLogos logos={tripleLogos} direction="left" />
          <RowLogos logos={[...tripleLogos].reverse()} direction="right" />
          <RowLogos
            logos={[...tripleLogos].sort(() => 0.5 - Math.random())}
            direction="left"
          />
        </div>
      </div>
    </SectionShell>
  )
}
