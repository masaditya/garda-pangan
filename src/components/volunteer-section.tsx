import { ChevronRight } from 'lucide-react'

type VolunteerSectionProps = {
  titleLine1: string
  titleLine2: string
  description: string
  cta: string
}

export function VolunteerSection({
  titleLine1,
  titleLine2,
  description,
  cta,
}: VolunteerSectionProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center lg:pb-48 lg:pt-56">
      <div className="mx-auto max-w-5xl space-y-12">
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
            href="#"
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
