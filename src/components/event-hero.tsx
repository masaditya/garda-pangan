import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'
import { cn } from '#/lib/utils'

type EventHeroProps = {
  title: string
  description: string
  backgroundImage?: string | null
  serifTitle?: boolean
}

export function EventHero({
  title,
  description,
  backgroundImage,
  serifTitle = false,
}: EventHeroProps) {
  const bgUrl = normalizeStrapiMediaUrl(backgroundImage)
  return (
    <section
      role="banner"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-b-xl bg-garda-forest lg:rounded-b-2xl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundColor: '#334155',
        }}
      />

      {/* Main overlays for text readability */}
      <div className="absolute inset-0 bg-garda-forest/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <h1
          className={cn(
            'mb-6 text-5xl leading-tight text-white sm:text-6xl md:text-7xl lg:text-[6rem]',
            serifTitle ? 'font-serif' : 'font-sans',
          )}
        >
          {title}
        </h1>
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl md:text-2xl">
          {description}
        </p>
      </div>
    </section>
  )
}
