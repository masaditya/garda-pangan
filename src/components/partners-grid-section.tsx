import { SectionShell } from './section-shell'

// Placeholder logos — will be replaced with API data
const defaultPartners = Array.from({ length: 19 }, (_, index) => ({
  id: `partner-${index + 1}`,
  name: `Partner ${index + 1}`,
  logoSrc: '/figma/garda-logo.png',
  alt: `Partner ${index + 1}`,
}))

/** Split items into rows of 6-7-6 pattern */
function splitRows<T>(items: T[]): T[][] {
  const pattern = [6, 7, 6]
  const rows: T[][] = []
  let cursor = 0
  for (let i = 0; cursor < items.length; i++) {
    const size = pattern[i % pattern.length]
    rows.push(items.slice(cursor, cursor + size))
    cursor += size
  }
  return rows
}

function PartnerLogoCard({
  name,
  logoSrc,
  alt,
}: {
  name: string
  logoSrc: string
  alt: string
}) {
  return (
    <article className="flex aspect-4/3 items-center justify-center rounded-lg bg-white p-2 transition-shadow duration-300 hover:shadow-xs">
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
  partners?: {
    id: number | string
    name?: string | null
    logoSrc?: string | null
  }[]
}

export function PartnersGridSection({
  title,
  partners,
}: PartnersGridSectionProps) {
  const items =
    partners && partners.length > 0
      ? partners.map((p) => ({
          id: String(p.id),
          name: p.name || '',
          logoSrc: p.logoSrc || '/figma/garda-logo.png',
          alt: p.name || '',
        }))
      : defaultPartners

  const rows = splitRows(items)

  return (
    <SectionShell
      id="partners"
      aria-labelledby="partners-heading"
      spacing="default"
      tone="transparent"
      className="bg-[#FCF9E0]"
    >
      <div className="mx-auto flex w-full flex-col gap-10 md:gap-12">
        <div className="flex justify-center text-center">
          <h2
            id="partners-heading"
            className="garda-section-heading !text-garda-forest-deep text-[clamp(2rem,5vw,3rem)] lg:text-[3.5rem]"
          >
            {title || 'Partners'}
          </h2>
        </div>

        <div
          data-testid="partners-grid"
          className="flex flex-col items-center gap-3 lg:gap-4"
          aria-label="Daftar partner"
        >
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-wrap w-full justify-center gap-3 lg:gap-4"
            >
              {row.map((partner) => (
                <div key={partner.id} className="w-[calc((100%-1.5rem)/3)] sm:w-[calc((100%-2.25rem)/4)] md:w-[calc((100%-3rem)/5)] lg:w-[calc((100%-6rem)/7)]">
                  <PartnerLogoCard
                    name={partner.name}
                    logoSrc={partner.logoSrc}
                    alt={partner.alt}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
