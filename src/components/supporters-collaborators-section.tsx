import { SectionShell } from './section-shell'

const supporters = Array.from({ length: 16 }, (_, index) => ({
  id: `supporter-${index + 1}`,
  name: 'Badan Pangan Nasional',
  logoSrc: '/brands/badan-pangan-nasional.svg',
  alt: 'Badan Pangan Nasional',
}))

function SupporterCard({ name, logoSrc, alt }: (typeof supporters)[number]) {
  return (
    <article className="flex min-h-[12.8125rem] flex-col items-center rounded-[1.5rem] bg-white px-1 py-3 shadow-[0_22px_36px_rgba(17,17,17,0.12)]">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#d9d9d9]" />
      <div className="mt-2.5 flex h-[7.3125rem] w-[7.3125rem] items-center justify-center">
        <img
          className="block h-[7.3125rem] w-[7.3125rem] object-contain"
          src={logoSrc}
          alt={alt}
        />
      </div>
      <p className="mt-auto mb-0 w-full px-3 text-[0.875rem] leading-[1.3] font-bold tracking-[-0.02em] text-[#111111]">
        {name}
      </p>
    </article>
  )
}

export function SupportersCollaboratorsSection() {
  return (
    <SectionShell
      aria-labelledby="supporters-collaborators-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-[0.625rem]"
    >
      <div className="relative grid gap-8">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            id="supporters-collaborators-heading"
            aria-label="SUPPORTER & COLLABOLATORS"
            className="m-0 flex flex-col text-[clamp(2.75rem,5vw,3.5rem)] leading-[1.02] font-black tracking-[-0.06em] text-[#222222]"
          >
            <span>SUPPORTER &amp;</span>
            <span>COLLABOLATORS</span>
          </h2>
          <p className="mt-6 mb-0 w-full max-w-[52.25rem] text-[1.125rem] leading-[1.2] font-medium tracking-[-0.02em] text-[#111111] sm:text-[1.25rem] lg:text-[1.5rem]">
            SINCE 2021, WE HAVE PARTNERED WITH THESE COMPANIES TO CREATE IMPACT
            FOR THE FUTURE. WILL YOUR LOGO BE NEXT HERE?
          </p>
        </div>

        <div className="rounded-[2rem] bg-[#f3f3f3] p-4 shadow-[0_20px_38px_rgba(17,17,17,0.06)] md:p-8">
          <div
            data-testid="supporters-grid"
            className="grid justify-center gap-x-[0.9375rem] gap-y-6 [grid-template-columns:repeat(1,minmax(9.375rem,9.375rem))] min-[380px]:[grid-template-columns:repeat(2,minmax(9.375rem,9.375rem))] md:[grid-template-columns:repeat(4,minmax(9.375rem,9.375rem))] xl:[grid-template-columns:repeat(8,minmax(9.375rem,9.375rem))]"
          >
            {supporters.map((supporter) => (
              <SupporterCard key={supporter.id} {...supporter} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
