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
    <article className="flex min-h-48 flex-col items-center rounded-2xl bg-white px-4 py-4 shadow-sm">
      <span
        aria-hidden="true"
        className="mb-4 size-1.5 rounded-full bg-slate-300"
      />
      <div className="flex flex-1 items-center justify-center p-2">
        <img
          className="h-16 w-16 object-contain"
          src={logoSrc}
          alt={alt}
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-center text-[0.7rem] font-bold leading-tight text-garda-forest uppercase">
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
      className="pb-24 bg-white"
    >
      <div className="relative grid gap-12">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            id="supporters-collaborators-heading"
            className="m-0 flex flex-col text-[clamp(2.75rem,5vw,4.5rem)] font-black leading-none tracking-tight text-garda-forest uppercase"
          >
            {title ? (
              <span>{title}</span>
            ) : (
              <>
                <span>SUPPORTER &amp;</span>
                <span>COLLABORATORS</span>
              </>
            )}
          </h2>
          <p className="mt-8 mb-0 w-full max-w-3xl text-lg font-medium text-garda-forest/80 lg:text-xl uppercase">
            {subtitle ||
              'SINCE 2021, WE HAVE PARTNERED WITH THESE COMPANIES TO CREATE IMPACT FOR THE FUTURE. WILL YOUR LOGO BE NEXT HERE?'}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-garda-mint-soft/50 p-6">
          <div
            data-testid="supporters-grid"
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8"
          >
            {displaySupporters.map((supporter) => (
              <SupporterCard key={supporter.id} {...supporter} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

