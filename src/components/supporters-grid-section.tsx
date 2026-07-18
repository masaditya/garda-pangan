import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

const defaultSupporters = Array.from({ length: 12 }, (_, index) => ({
  id: `supporter-${index + 1}`,
  name: 'Badan Pangan Nasional',
  logoSrc: '/brands/badan-pangan-nasional.svg',
  alt: 'Badan Pangan Nasional',
}))

function SupporterCard({
  name,
  logoSrc,
  alt,
}: {
  name: string
  logoSrc: string
  alt: string
}) {
  return (
    <article className="flex h-42 w-36 shrink-0 flex-col items-center justify-center rounded-2xl bg-white px-3 py-4 shadow-sm">
      <div className="flex flex-1 items-center justify-center p-1">
        <img
          className="h-20 w-20 object-contain"
          src={logoSrc}
          alt={alt}
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-center text-[0.6rem] font-bold leading-tight text-garda-forest uppercase">
        {name}
      </p>
    </article>
  )
}

type SupportersGridSectionProps = {
  title?: string | null
  subtitle?: string | null
  supporters?: {
    id: number
    title: string
    image?: { url: string } | null
  }[]
}

export function SupportersGridSection({
  title,
  subtitle,
  supporters,
}: SupportersGridSectionProps) {
  const items =
    supporters && supporters.length > 0
      ? supporters.map((s) => ({
        id: String(s.id),
        name: s.title,
        logoSrc:
          normalizeStrapiMediaUrl(s.image?.url) ||
          '/brands/badan-pangan-nasional.svg',
        alt: s.title,
      }))
      : defaultSupporters

  // Duplicate for seamless infinite loop
  const track = [...items, ...items]

  return (
    <SectionShell
      id="supporters-collaborators"
      aria-labelledby="supporters-collaborators-heading"
      spacing="default"
      tone="transparent"
      className="bg-[#FCF9E0]"
    // tone="transparent"
    // className="bg-(--forest-950)"
    >
      <div className="mx-auto flex w-full flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            id="supporters-collaborators-heading"
            className="text-garda-forest-deep font-serif text-[clamp(1.75rem,4vw,3rem)] capitalize"
          >
            {title || 'Supporter & Collaborators'}
          </h2>
          <p className="max-w-3xl text-base font-medium text-gray-600 sm:text-lg">
            {subtitle ||
              'Since 2021, we have partnered with these companies to create impact for the future. Will your logo be next here?'}
          </p>
        </div>

        {/* Marquee strip */}
        <div
          data-testid="supporters-grid"
          className="relative overflow-hidden"
          aria-label="Daftar supporter dan kolaborator"
        >
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-[#FCF9E0] to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-[#FCF9E0] to-transparent" />

          <div
            className="flex animate-marquee gap-4"
            style={{ width: 'max-content', animationDuration: '50s' }}
          >
            {track.map((supporter, i) => (
              <SupporterCard
                key={`${supporter.id}-${i}`}
                name={supporter.name}
                logoSrc={supporter.logoSrc}
                alt={supporter.alt}
                aria-hidden={i >= items.length}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

