import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

type ProgramHeroProps = {
  title: string
  description: string
  backgroundImage?: string | null
}

export function ProgramHero({
  title,
  description,
  backgroundImage,
}: ProgramHeroProps) {
  const bgUrl =
    normalizeStrapiMediaUrl(backgroundImage) ||
    '/images/hero-program-fallback.jpg'

  // Split title by <br /> or \n to avoid dangerouslySetInnerHTML
  const titleLines = title.split(/<br\s*\/?>|\\n|\n/i)

  return (
    <section
      role="banner"
      className="relative isolate min-h-screen overflow-hidden rounded-b-xl bg-garda-forest lg:rounded-b-2xl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundColor: '#334155',
        }}
      />
      {/* Top blur overlay */}
      <div className="absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-garda-forest/40 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* Bottom blur overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-64 bg-linear-to-t from-garda-forest/60 to-transparent backdrop-blur-lg [mask-image:linear-gradient(to_top,black,transparent)]" />

      {/* Main overlays for text readability */}
      <div className="absolute inset-0 bg-garda-forest/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div
        data-testid="program-hero-content"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:px-12 md:px-16 lg:px-8"
      >
        <div className="flex flex-col items-end justify-between gap-8 md:flex-row">
          <h1 className="w-full max-w-[900px] font-sans text-[clamp(5rem,15vw,7.5rem)] font-black leading-[1] tracking-[-0.05em] text-white md:w-3/5">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>
          <div className="flex w-full justify-end md:w-2/5">
            <p className="max-w-[420px] text-xl font-medium leading-relaxed text-white/95 sm:text-2xl md:text-right">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
