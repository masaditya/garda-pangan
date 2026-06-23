import { ArrowRight } from 'lucide-react'

import type { ContactCategory } from '#/lib/i18n/contact'

type ContactSectionProps = {
  titleLine1: string
  titleLine2: string
  description: string
  illustrationLabel: string
  categories: ContactCategory[]
}

export function ContactSection({
  titleLine1,
  titleLine2,
  description,
  illustrationLabel,
  categories,
}: ContactSectionProps) {
  return (
    <div className="relative w-full">
      <section className="relative flex min-h-[85vh] flex-col items-start justify-center px-6 text-left">
        <div className="mx-auto w-full max-w-7xl space-y-6 pt-20">
          <h1 className="font-serif text-6xl tracking-tight text-white sm:text-7xl lg:text-8xl">
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-48 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="mb-6 break-inside-avoid flex flex-col items-start rounded-3xl bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] ring-1 ring-garda-border/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
              >
                <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-2xl bg-garda-mint-soft/30 overflow-hidden">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="size-16 rounded-full border-2 border-dashed border-garda-forest" />
                    <span className="text-sm font-bold uppercase tracking-widest text-garda-forest">
                      {illustrationLabel}
                    </span>
                  </div>
                </div>

                <h3 className="mb-4 font-sans text-xl leading-tight tracking-wider text-black/80 uppercase">
                  {cat.title}
                </h3>
                <p className="mb-8 text-lg font-medium leading-relaxed text-black/70">
                  {cat.description}
                </p>
                <div className="self-end">
                  <a
                    href={cat.buttonLink}
                    className="inline-flex items-center gap-2 rounded-full bg-garda-forest px-5 py-2 text-xs font-bold text-white transition-all hover:bg-garda-forest-strong hover:gap-3"
                  >
                    <span>{cat.buttonLabel}</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10 bg-linear-to-t from-white to-transparent" />
      </section>
    </div>
  )
}
