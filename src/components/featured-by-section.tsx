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
        className="h-12 w-auto object-contain"
      />
    )
  }
}

type FeaturedBySectionProps = {
  title?: string | null
  logos?: { id: number; url: string; name?: string | null }[]
  speed?: string
}

export function FeaturedBySection({
  title,
  logos,
  speed = '25s',
}: FeaturedBySectionProps) {
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
            style={{ width: 'max-content', animationDuration: speed }}
          >
            {track.map((logo, i) => (
              <LogoCard
                key={`${logo.id}-${i}`}
                data-testid={`featured-card-${logo.id}-${i}`}
                className="h-16 w-[120px] rounded-sm border-transparent bg-white shadow-none flex justify-center items-center"
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
