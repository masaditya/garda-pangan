import { useEffect, useState } from 'react'

import { SectionShell } from './section-shell'
import type { CarouselApi } from '#/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel'

const factSlides = [
  {
    id: 'waste-economy',
    body: 'Kalau sepertiga makanan yang diproduksi di seluruh dunia terbuang sia-sia? Kerugian ekonomi yang ditimbulkan juga luar biasa besar!”',
  },
  {
    id: 'food-rescue-definition',
    body: 'Food rescue is the practice of saving surplus food from the hospitality and food business sectors before it gets thrown away.',
  },
  {
    id: 'food-rescue-value',
    body: 'With food rescue, edible surplus can reach the people who need it most instead of being wasted.',
  },
]

export function DidYouKnowSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const syncCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    syncCurrent()
    api.on('select', syncCurrent)
    api.on('reInit', syncCurrent)

    return () => {
      api.off('select', syncCurrent)
      api.off('reInit', syncCurrent)
    }
  }, [api])

  return (
    <SectionShell
      aria-labelledby="facts-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-0"
    >
      <div
        data-testid="facts-frame"
        className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center overflow-hidden bg-white px-6 py-20 sm:px-12 md:py-28 lg:py-32"
      >
        {/* Large Decorative Quotation Marks */}
        <div
          className="absolute -top-10 left-10 select-none text-[20rem] font-black leading-none text-garda-paper-soft opacity-80 sm:text-[25rem] lg:left-20 lg:text-[30rem]"
          aria-hidden="true"
        >
          “
        </div>
        <div
          className="absolute -bottom-50 right-10 select-none text-[20rem] font-black leading-none text-garda-paper-soft opacity-80 sm:text-[25rem] lg:right-20 lg:text-[30rem]"
          aria-hidden="true"
        >
          ”
        </div>

        <div className="relative z-10 mb-12 flex justify-center lg:mb-16">
          <h2
            id="facts-heading"
            className="text-center font-sans text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight text-garda-ink"
          >
            Tahukah Kamu?
          </h2>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          setApi={setApi}
          className="relative z-10 w-full"
        >
          <div className="flex flex-col items-center gap-12">
            <CarouselContent className="w-full">
              {factSlides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  aria-label={`${index + 1} of ${factSlides.length}`}
                >
                  <article
                    data-active={index === current ? 'true' : 'false'}
                    className="mx-auto flex max-w-[1000px] flex-col items-center px-4 text-center sm:px-10"
                  >
                    <p className="text-pretty font-sans text-[clamp(1.25rem,3vw,2rem)] font-medium leading-normal text-garda-ink">
                      {slide.body}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div
              className="flex items-center justify-center gap-4"
              aria-label="Fact carousel controls"
            >
              <CarouselPrevious
                aria-label="Previous fact"
                className="static size-14 translate-y-0 border border-garda-forest/40 bg-white/40 text-garda-forest shadow-none transition-all hover:border-garda-forest hover:bg-white/80"
              />
              <CarouselNext
                aria-label="Next fact"
                className="static size-14 translate-y-0 border border-garda-forest/40 bg-white/40 text-garda-forest shadow-none transition-all hover:border-garda-forest hover:bg-white/80"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </SectionShell>
  )
}
