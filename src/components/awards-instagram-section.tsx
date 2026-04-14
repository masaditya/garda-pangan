import { Card, CardContent } from '#/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel'

import { SectionShell } from './section-shell'

const awards = Array.from({ length: 10 }, (_, index) => ({
  id: `award-card-${index + 1}`,
  year: '2017',
  title: 'Startup with Best Social Impact',
  source: 'TEMPO.CO',
}))

const instagramPosts = [
  {
    id: 'welcome-1',
    src: '/figma/instagram/post-1.png',
    alt: 'Instagram post welcoming visitors to Garda Pangan',
  },
  {
    id: 'service-1',
    src: '/figma/instagram/post-2.png',
    alt: 'Instagram post about Garda Pangan recycling services',
  },
  {
    id: 'rescue-1',
    src: '/figma/instagram/post-3.png',
    alt: 'Instagram post about the February 2026 food rescue program',
  },
  {
    id: 'campaign-1',
    src: '/figma/instagram/post-4.png',
    alt: 'Instagram post celebrating an awareness campaign',
  },
  {
    id: 'heroes-1',
    src: '/figma/instagram/post-5.png',
    alt: 'Instagram post featuring Food Heroes Garda Pangan',
  },
  {
    id: 'campaign-2',
    src: '/figma/instagram/post-4.png',
    alt: 'Instagram post celebrating another awareness campaign',
  },
  {
    id: 'rescue-2',
    src: '/figma/instagram/post-3.png',
    alt: 'Instagram post about another food rescue activity',
  },
  {
    id: 'service-2',
    src: '/figma/instagram/post-2.png',
    alt: 'Instagram post highlighting service education from Garda Pangan',
  },
  {
    id: 'heroes-2',
    src: '/figma/instagram/post-5.png',
    alt: 'Instagram post highlighting the Food Heroes team',
  },
  {
    id: 'welcome-2',
    src: '/figma/instagram/post-1.png',
    alt: 'Instagram post showing a Garda Pangan welcome moment',
  },
] as const

function AwardCard({ year, title, source, id }: (typeof awards)[number]) {
  const [sourceLead, sourceSuffix] = source.split('.')

  return (
    <Card
      data-testid={id}
      className="relative w-full overflow-hidden rounded-3xl border border-[#ececec] bg-white py-0 shadow-[0_14px_28px_rgba(17,17,17,0.045)]"
    >
      <CardContent className="relative flex min-h-[16rem] flex-col p-6 sm:min-h-[18rem] lg:min-h-[26.25rem]">
        <span className="text-[1.4rem] font-bold leading-none tracking-[-0.02em] text-[#6b7280] sm:text-[1.6rem] lg:text-[2rem]">
          {year}
        </span>
        <h3 className="mt-2 max-w-[9rem] text-[1.2rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#08080c] sm:max-w-[10rem] sm:text-[1.4rem] lg:text-[2rem]">
          {title}
        </h3>
        <div className="mt-auto text-[0.8rem] leading-none sm:text-[0.875rem] lg:text-[1.25rem]">
          <span className="block text-[#6b7280]">Oleh</span>
          <span className="font-bold tracking-[-0.03em] text-[#e45d51]">
            {sourceLead}
          </span>
          <span className="font-bold tracking-[-0.03em] text-[#6b7280]">
            .{sourceSuffix}
          </span>
        </div>

        <img
          src="/figma/award-medal.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 h-auto w-[5rem] sm:w-[5.5rem] lg:w-[6rem]"
        />
      </CardContent>
    </Card>
  )
}

export function AwardsInstagramSection() {
  return (
    <SectionShell
      aria-labelledby="awards-recognition-heading"
      spacing="compact"
      tone="white"
      innerClassName="max-w-none px-0"
    >
      {/* Awards sub-section: full viewport width.
          NO overflow-hidden here — decorative shapes must bleed outside.
          Body already has overflow-x: hidden globally to prevent scrollbar. */}
      <div className="relative w-full pt-4 pb-2">
        {/* Yellow decorative shapes — left edge, partially off-screen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-3rem] top-[2rem] hidden lg:block"
        >
          {/* Main tall bar */}
          <span className="absolute left-[3rem] top-0 h-[20rem] w-[2.5rem] rounded-full bg-[#ffe44f]" />
          {/* Upper-right diagonal */}
          <span className="absolute left-[4.5rem] top-[-1.5rem] h-[9rem] w-[2.5rem] rotate-[40deg] rounded-full bg-[#ffe44f]" />
          {/* Lower-right diagonal */}
          <span className="absolute left-[4.5rem] top-[10rem] h-[9rem] w-[2.5rem] rotate-[-40deg] rounded-full bg-[#ffe44f]" />
        </div>

        {/* Green decorative shapes — right edge, partially off-screen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-3rem] top-[3rem] hidden lg:block"
        >
          {/* Small circle */}
          <span className="absolute right-[10rem] top-0 h-[2.5rem] w-[2.5rem] rounded-full bg-[#3d7656]" />
          {/* Arch / half-circle */}
          <span className="absolute right-[2rem] top-[-0.5rem] h-[3.5rem] w-[3.5rem] rounded-t-[999px] bg-[#3d7656]" />
          {/* Large diagonal bar */}
          <span className="absolute right-[6rem] top-[8rem] h-[14rem] w-[2.5rem] rotate-[26deg] rounded-full bg-[#3d7656]" />
          {/* Vertical bar */}
          <span className="absolute right-[2rem] top-[7rem] h-[10rem] w-[2.5rem] rounded-full bg-[#3d7656]" />
          {/* Angled right bar */}
          <span className="absolute right-[-0.5rem] top-[9rem] h-[9rem] w-[2.5rem] -rotate-[39deg] rounded-full bg-[#3d7656]" />
        </div>

        {/* Heading — centered, constrained width */}
        <div className="mb-6 flex justify-center text-center">
          <h2
            id="awards-recognition-heading"
            aria-label="Awards & Recognition"
            className="text-[clamp(2.65rem,4.6vw,3.5rem)] font-black uppercase leading-[1.1] tracking-[-0.03em] text-[#202020]"
          >
            Awards &amp;
            <br />
            Recognition
          </h2>
        </div>

        {/* Carousel — full width, slides edge-to-edge */}
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-3.5 px-4 sm:px-6 lg:px-8">
            {awards.map((award) => (
              <CarouselItem
                key={award.id}
                className="basis-[280px] pl-3.5 sm:basis-[300px] lg:basis-[320px]"
              >
                <AwardCard {...award} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-4 flex items-center justify-center gap-3">
            <CarouselPrevious
              aria-label="Previous award"
              className="static translate-y-0 rounded-full border-transparent bg-garda-mint text-garda-forest shadow-none hover:bg-garda-mint-soft"
            />
            <CarouselNext
              aria-label="Next award"
              className="static translate-y-0 rounded-full border-transparent bg-garda-mint text-garda-forest shadow-none hover:bg-garda-mint-soft"
            />
          </div>
        </Carousel>
      </div>

      {/* Instagram sub-section */}
      <div className="mx-auto mt-10 flex w-full max-w-[1410px] flex-col gap-5 px-4 sm:px-6 lg:mt-11 lg:gap-6 lg:px-8">
        <div className="flex justify-center text-center">
          <h2
            id="our-instagram-heading"
            className="text-3xl font-black uppercase leading-[1.2] tracking-[-0.02em] text-[#222222] lg:text-[3.5rem]"
          >
            Our Instagram
          </h2>
        </div>

        <div
          data-testid="instagram-grid"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-[2.5rem]"
        >
          {instagramPosts.map((post) => (
            <figure
              key={post.id}
              className="overflow-hidden bg-[#d7ddd7]"
            >
              <img
                src={post.src}
                alt={post.alt}
                className="aspect-[3/4] h-full w-full object-cover object-top"
              />
            </figure>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
