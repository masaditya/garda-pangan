import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

const defaultPartners = Array.from({ length: 19 }, (_, index) => ({
  id: `partner-${index + 1}`,
  name: `Partner ${index + 1}`,
  logoSrc: '/figma/garda-logo.png',
  alt: `Partner ${index + 1}`,
}))

const defaultSupporters = Array.from({ length: 12 }, (_, index) => ({
  id: `supporter-${index + 1}`,
  name: 'Badan Pangan Nasional',
  logoSrc: '/brands/badan-pangan-nasional.svg',
  alt: 'Badan Pangan Nasional',
}))

function splitIntoThreeRows<T>(items: T[]): T[][] {
  const rows: T[][] = [[], [], []]
  items.forEach((item, index) => {
    rows[index % 3].push(item)
  })
  return rows
}

function getRowTrack<T>(rowItems: T[]): T[] {
  if (rowItems.length === 0) return []
  let track = [...rowItems]
  while (track.length < 15) {
    track = [...track, ...rowItems]
  }
  return [...track, ...track]
}

function PartnerMarqueeCard({
  name,
  logoSrc,
  alt,
}: {
  name: string
  logoSrc: string
  alt: string
}) {
  return (
    <article className="flex h-24 w-36 shrink-0 items-center justify-center rounded-xl bg-white p-4 transition-shadow duration-300 hover:shadow-xs">
      <img
        className="h-full w-full object-contain"
        src={logoSrc}
        alt={alt}
        title={name}
        loading="lazy"
        decoding="async"
      />
    </article>
  )
}

type PartnersGridSectionProps = {
  title?: string | null
  subtitle?: string | null
  partners?: {
    id: number | string
    name?: string | null
    logoSrc?: string | null
  }[]
  supporters?: {
    id: number
    title: string
    image?: { url: string } | null
  }[]
}

export function PartnersGridSection({
  title,
  subtitle,
  partners,
  supporters,
}: PartnersGridSectionProps) {
  const partnerItems =
    partners && partners.length > 0
      ? partners.map((p) => ({
          id: `partner-${p.id}`,
          name: p.name || '',
          logoSrc: p.logoSrc || '/figma/garda-logo.png',
          alt: p.name || '',
        }))
      : []

  const supporterItems =
    supporters && supporters.length > 0
      ? supporters.map((s) => ({
          id: `supporter-${s.id}`,
          name: s.title || '',
          logoSrc:
            normalizeStrapiMediaUrl(s.image?.url) ||
            '/brands/badan-pangan-nasional.svg',
          alt: s.title || '',
        }))
      : []

  const combinedItems = [...partnerItems, ...supporterItems]

  const items =
    combinedItems.length > 0
      ? combinedItems
      : [...defaultPartners, ...defaultSupporters]

  const rows = splitIntoThreeRows(items)

  return (
    <SectionShell
      id="partners"
      aria-labelledby="partners-heading"
      spacing="default"
      tone="transparent"
      className="bg-(--forest-950)"
    >
      <div className="mx-auto flex w-full flex-col gap-10 md:gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            id="partners-heading"
            className="garda-section-heading text-[clamp(2rem,5vw,3rem)] lg:text-[3.5rem]"
          >
            {title || 'Partners & Supporters'}
          </h2>
          {subtitle && (
            <p className="max-w-3xl text-base font-medium text-gray-200 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3-Row Marquee Container */}
        <div
          data-testid="partners-marquee-container"
          className="relative overflow-hidden w-full flex flex-col gap-4 py-2"
          aria-label="Daftar partner dan supporter"
        >
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-(--forest-950) to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-(--forest-950) to-transparent" />

          {rows.map((rowItems, rowIdx) => {
            const track = getRowTrack(rowItems)
            const isReverse = rowIdx === 1

            return (
              <div
                key={rowIdx}
                className="flex overflow-hidden w-full"
                data-testid={`marquee-row-${rowIdx}`}
              >
                <div
                  className="flex animate-marquee gap-4"
                  style={{
                    width: 'max-content',
                    animationDuration: '50s',
                    animationDirection: isReverse ? 'reverse' : 'normal',
                  }}
                >
                  {track.map((item, i) => (
                    <PartnerMarqueeCard
                      key={`${item.id}-${rowIdx}-${i}`}
                      name={item.name}
                      logoSrc={item.logoSrc}
                      alt={item.alt}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
