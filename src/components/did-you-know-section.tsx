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
import { cn } from '#/lib/utils'

type DidYouKnowSectionProps = {
  slides?: { id: number | string; content: string }[]
  variant?: 'default' | 'immersive'
}

const defaultSlides = [
  {
    id: 'waste-economy',
    content:
      'Kalau sepertiga makanan yang diproduksi di seluruh dunia terbuang sia-sia? Kerugian ekonomi yang ditimbulkan juga luar biasa besar!”',
  },
  {
    id: 'food-rescue-definition',
    content:
      'Food rescue is the practice of saving surplus food from the hospitality and food business sectors before it gets thrown away.',
  },
  {
    id: 'food-rescue-value',
    content:
      'With food rescue, edible surplus can reach the people who need it most instead of being wasted.',
  },
]

function DidYouKnowCarousel({
  items,
  variant,
  setApi,
  current,
}: {
  items: { id: number | string; content: string }[]
  variant: 'default' | 'immersive'
  setApi: (api: CarouselApi) => void
  current: number
}) {
  const isImmersive = variant === 'immersive'

  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      setApi={setApi}
      className={cn('relative z-10 w-full', isImmersive && 'max-w-xl')}
    >
      <div
        className={cn(
          'flex flex-col gap-12',
          isImmersive
            ? 'items-end'
            : 'items-center',
        )}
      >
        <CarouselContent className="w-full">
          {items.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              aria-label={`${index + 1} of ${items.length}`}
            >
              <article
                data-active={index === current ? 'true' : 'false'}
                className={cn(
                  'flex flex-col',
                  isImmersive
                    ? 'px-0 text-left'
                    : 'mx-auto max-w-[1000px] items-center px-4 text-center sm:px-10',
                )}
              >
                <p
                  className={cn(
                    'text-pretty font-medium leading-normal',
                    isImmersive
                      ? 'font-serif text-[clamp(1.125rem,2.2vw,1.75rem)] text-garda-sun'
                      : 'font-sans text-[clamp(1.25rem,3vw,2rem)] text-garda-ink',
                  )}
                >
                  {slide.content}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div
          className="flex items-center gap-4"
          aria-label="Fact carousel controls"
        >
          <CarouselPrevious
            aria-label="Previous fact"
            className={cn(
              'static size-14 translate-y-0 shadow-none transition-all',
              isImmersive
                ? 'border border-garda-sun/50 bg-garda-sun text-garda-forest hover:bg-garda-sun/90'
                : 'border border-garda-forest/40 bg-white/40 text-garda-forest hover:border-garda-forest hover:bg-white/80',
            )}
          />
          <CarouselNext
            aria-label="Next fact"
            className={cn(
              'static size-14 translate-y-0 shadow-none transition-all',
              isImmersive
                ? 'border border-garda-sun/50 bg-garda-sun text-garda-forest hover:bg-garda-sun/90'
                : 'border border-garda-forest/40 bg-white/40 text-garda-forest hover:border-garda-forest hover:bg-white/80',
            )}
          />
        </div>
      </div>
    </Carousel>
  )
}

export function DidYouKnowSection({
  slides,
  variant = 'default',
}: DidYouKnowSectionProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const items = slides || defaultSlides
  const isImmersive = variant === 'immersive'

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

  if (isImmersive) {
    return (
      <section aria-labelledby="facts-heading" className="w-full px-6 sm:px-12 lg:px-24">
        <div
          data-testid="facts-frame"
          className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        >
          <h2
            id="facts-heading"
            className="font-serif text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[0.95] text-garda-sun"
          >
            Tahukah Kamu?
          </h2>

          <DidYouKnowCarousel
            items={items}
            variant={variant}
            setApi={setApi}
            current={current}
          />
        </div>
      </section>
    )
  }

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

        <DidYouKnowCarousel
          items={items}
          variant={variant}
          setApi={setApi}
          current={current}
        />
      </div>
    </SectionShell>
  )
}
