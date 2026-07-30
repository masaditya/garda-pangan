import { ChevronRight } from 'lucide-react'

type VolunteerSectionProps = {
  titleLine1: string
  titleLine2: string
  description: string
  cta: string
  ctaLink?: string
  backgroundImage?: string | null
}

export function VolunteerSection({
  titleLine1,
  titleLine2,
  description,
  cta,
  ctaLink = '#',
  backgroundImage,
}: VolunteerSectionProps) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center lg:pb-48 lg:pt-56"
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 -z-20 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[#0C381E]/75 mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-linear-to-b from-[#0C381E]/60 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-12">
        <h1 className="font-serif text-6xl tracking-tight text-white sm:text-7xl lg:text-8xl">
          {titleLine1}
          <br />
          {titleLine2}
        </h1>

        <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
          {description}
        </p>

        <div className="flex justify-center pt-4">
          <a
            href={ctaLink}
            target={ctaLink.startsWith('http') ? '_blank' : undefined}
            rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-4 rounded-full bg-garda-forest px-8 py-4 font-bold text-white transition-all hover:bg-garda-forest-strong hover:scale-105 shadow-2xl"
          >
            <span className="text-lg">{cta}</span>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#FFC107] text-garda-forest transition-transform group-hover:translate-x-1">
              <ChevronRight className="size-6" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
