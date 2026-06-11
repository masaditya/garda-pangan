import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

const defaultSupporters = Array.from({ length: 16 }, (_, index) => ({
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
    <article className="flex min-h-36 flex-col items-center justify-center rounded-2xl bg-white px-3 py-5 shadow-sm">
      <div className="flex flex-1 items-center justify-center p-2">
        <img
          className="h-14 w-14 object-contain"
          src={logoSrc}
          alt={alt}
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-center text-[0.65rem] font-bold leading-tight text-garda-forest uppercase">
        {name}
      </p>
    </article>
  )
}

type SupportersCollaboratorsSectionProps = {
  title?: string | null
  subtitle?: string | null
  supporters?: {
    id: number
    title: string
    image?: { url: string } | null
  }[]
}

export function SupportersCollaboratorsSection({
  title,
  subtitle,
  supporters,
}: SupportersCollaboratorsSectionProps) {
  const displaySupporters =
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

  return (
    <SectionShell
      aria-labelledby="supporters-collaborators-heading"
      spacing="default"
      tone="transparent"
    >
      <div className="relative grid gap-12">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            id="supporters-collaborators-heading"
            className="garda-section-heading text-[clamp(2rem,5vw,3.5rem)] capitalize"
          >
            {title || 'Supporter & Collaborators'}
          </h2>
          <p className="mt-6 max-w-3xl text-base font-medium text-white/75 sm:text-lg">
            {subtitle ||
              'Since 2021, we have partnered with these companies to create impact for the future. Will your logo be next here?'}
          </p>
        </div>

        <div
          data-testid="supporters-grid"
          className="grid grid-cols-2 justify-center gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:[grid-template-columns:repeat(8,minmax(9.375rem,9.375rem))]"
        >
          {displaySupporters.map((supporter) => (
            <SupporterCard key={supporter.id} {...supporter} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
