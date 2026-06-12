import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

type EventHeroProps = {
  title: string
  description: string
  backgroundImage?: string | null
}

export function EventHero({
  title,
  description,
  backgroundImage,
}: EventHeroProps) {
  const bgUrl =
    normalizeStrapiMediaUrl(backgroundImage) ||
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop' // placeholder if none

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

      {/* Top blur overlay */}
      <div className="absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-garda-forest/40 to-transparent backdrop-blur-md mask-[linear-gradient(to_bottom,black,transparent)]" />

      {/* Bottom blur overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-64 bg-linear-to-t from-garda-forest/60 to-transparent backdrop-blur-lg mask-[linear-gradient(to_top,black,transparent)]" />

      {/* Main overlays for text readability */}
      <div className="absolute inset-0 bg-garda-forest/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <h1 className="mb-6 font-sans text-5xl leading-tight text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
          {title}
        </h1>
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl md:text-2xl">
          {description}
        </p>
      </div>
    </section>
  )
}
