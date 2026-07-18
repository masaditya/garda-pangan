import { LogoCard } from './logo-card'
import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

const featuredLogos = [
  { id: 'tempo', label: 'TEMPO.CO', variant: 'tempo' },
  { id: 'cnn', label: 'CNN Indonesia', variant: 'cnn' },
  { id: 'metro', label: 'METRO TV', variant: 'metro' },
  { id: 'forbes', label: 'Forbes Indonesia', variant: 'forbes' },
  { id: 'bbc', label: 'BBC NEWS', variant: 'bbc' },
  { id: 'trans-1', label: 'TRANS TV', variant: 'trans' },
  { id: 'reader-1', label: "Reader's Digest", variant: 'reader' },
]

type LogoItem = {
  id: string | number
  label?: string | null
  url?: string | null
  variant?: string
}

function FeaturedLogoContent({ logo }: { logo: LogoItem }) {
  if (logo.url) {
    return (
      <img
        src={normalizeStrapiMediaUrl(logo.url) ?? undefined}
        alt={logo.label ?? ''}
        loading="lazy"
        decoding="async"
        className="h-20 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    )
  }

  return (
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
      aria-label={logo.label ?? ''}
    >
      {logo.variant === 'cnn' ? (
        <>
          <span className="text-[1.4rem] font-black lg:text-[1.7rem]">CNN</span>
          <span className="text-[0.6rem] font-bold">Indonesia</span>
        </>
      ) : logo.variant === 'forbes' ? (
        <>
          <span className="text-[1.6rem] font-black lg:text-[2rem]">Forbes</span>
          <span className="ml-1 text-[0.5rem] font-semibold">Indonesia</span>
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
  )
}

type FeaturedBySectionProps = {
  title?: string | null
  logos?: { id: number; url: string; name?: string | null }[]
}

export function FeaturedBySection({ title, logos }: FeaturedBySectionProps) {
  const items: LogoItem[] =
    logos && logos.length > 0
      ? logos.map((l) => ({ id: l.id, url: l.url, label: l.name }))
      : featuredLogos

  const track = [...items, ...items]

  return (
    <SectionShell
      id="featured-by"
      aria-labelledby="featured-by-heading"
      spacing="default"
      tone="transparent"
    >
      <div className="mx-auto flex w-full flex-col gap-10 md:gap-12">
        <div className="flex justify-center text-center">
          <h2
            id="featured-by-heading"
            className="garda-section-heading text-[clamp(2rem,5vw,3rem)] lg:text-[3.5rem]"
          >
            {title || 'Featured by'}
          </h2>
        </div>

        {/* Marquee strip */}
        <div
          data-testid="featured-marquee"
          className="relative overflow-hidden"
          aria-label="Featured by media"
        >
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-(--color-bg,#0c2b1a) to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-(--color-bg,#0c2b1a) to-transparent" />

          <div
            className="flex animate-marquee gap-4"
            style={{ width: 'max-content', animationDuration: '50s' }}
          >
            {track.map((logo, i) => (
              <LogoCard
                key={`${logo.id}-${i}`}
                data-testid={`featured-card-${logo.id}-${i}`}
                className="h-28 w-[160px] shrink-0 rounded-[0.75rem] border-transparent bg-white shadow-none *:data-[slot=card-content]:flex *:data-[slot=card-content]:h-full *:data-[slot=card-content]:min-h-0 *:data-[slot=card-content]:items-center *:data-[slot=card-content]:justify-center *:data-[slot=card-content]:p-4"
                aria-hidden={i >= items.length}
              >
                <FeaturedLogoContent logo={logo} />
              </LogoCard>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
