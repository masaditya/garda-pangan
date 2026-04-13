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
        className="relative mx-auto grid w-full max-w-[1321px] gap-8 overflow-hidden bg-white px-4 py-10 sm:px-10 sm:py-12 lg:px-[60px] lg:py-16"
      >
        <div className="flex justify-center">
          <h2
            id="facts-heading"
            className="text-center text-[clamp(3.25rem,5vw,4.5rem)] font-black tracking-[-0.06em] text-[#0a011f]"
          >
            Tahukah Kamu?
          </h2>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          setApi={setApi}
          className="w-full"
        >
          <div className="relative grid place-items-center gap-6">
            <img
              src="/figma/facts-bulb-small.png"
              alt=""
              aria-hidden="true"
              className="absolute left-0 top-[68%] hidden h-auto w-[9.625rem] -translate-y-1/2 md:block"
            />
            <img
              src="/figma/facts-bulb-large.png"
              alt=""
              aria-hidden="true"
              className="absolute right-0 top-[-2.5rem] h-auto w-[9rem] md:w-[16.125rem]"
            />

            <CarouselContent className="w-full">
              {factSlides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  aria-label={`${index + 1} of ${factSlides.length}`}
                >
                  <article
                    data-active={index === current ? 'true' : 'false'}
                    className="relative mx-auto grid min-h-[16.75rem] max-w-[77.375rem] place-items-center px-8 pb-4 pt-0 text-center sm:px-16 lg:px-20"
                  >
                    <span
                      className="absolute left-0 top-[-0.625rem] text-[5.5rem] leading-none text-[#0a011f] lg:text-[7.5rem]"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <p className="max-w-[56.9375rem] text-balance font-display text-[clamp(2rem,3.2vw,2.5rem)] font-medium leading-[1.4] tracking-[0.01em] text-[#0a011f]">
                      {slide.body}
                    </p>
                    <span
                      className="absolute bottom-[-0.625rem] right-[8%] text-[5.5rem] leading-none text-[#0a011f] lg:text-[7.5rem]"
                      aria-hidden="true"
                    >
                      ”
                    </span>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex items-center justify-center gap-3" aria-label="Fact carousel controls">
              <CarouselPrevious
                aria-label="Previous fact"
                className="static translate-y-0 rounded-full border-transparent bg-garda-mint text-garda-forest shadow-none hover:bg-garda-mint-soft"
              />
              <CarouselNext
                aria-label="Next fact"
                className="static translate-y-0 rounded-full border-transparent bg-garda-mint text-garda-forest shadow-none hover:bg-garda-mint-soft"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </SectionShell>
  )
}
