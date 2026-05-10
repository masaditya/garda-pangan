import { Card, CardContent } from '#/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '#/components/ui/carousel'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

import { SectionShell } from './section-shell'

const defaultAwards = Array.from({ length: 10 }, (_, index) => ({
  id: `award-card-${index + 1}`,
  year: '2017',
  title: 'Startup with Best Social Impact',
  source: 'TEMPO.CO',
  image: '/figma/award-medal.svg',
}))

const defaultInstagramPosts = [
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

function AwardCard({
  year,
  title,
  source,
  id,
  image,
}: {
  year: string
  title: string
  source: string
  id: string
  image?: string
}) {
  const parts = source.split('.')
  const sourceLead = parts[0] || source
  const sourceSuffix = parts.slice(1).join('.')

  return (
    <Card
      data-testid={id}
      className="relative w-full overflow-hidden rounded-3xl border-white bg-white py-0 shadow-[0_14px_28px_rgba(17,17,17,0.045)]"
    >
      <CardContent className="relative flex min-h-56 flex-col p-6 lg:min-h-72">
        <span className="text-sm font-bold leading-none tracking-tight text-[#6b7280] lg:text-base">
          {year}
        </span>
        <h3 className="mt-2 max-w-48 text-lg font-black leading-tight tracking-tight text-[#08080c] lg:text-2xl">
          {title}
        </h3>
        <div className="mt-auto text-xs leading-none lg:text-sm">
          <span className="block font-medium text-[#6b7280]">Oleh</span>
          <span className="mt-1 block font-bold tracking-tight text-[#e45d51] uppercase">
            {sourceLead}
            {sourceSuffix ? `.${sourceSuffix}` : ''}
          </span>
        </div>

        <img
          src={image || '/figma/award-medal.svg'}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-2 bottom-2 h-auto w-24 lg:w-32 object-contain"
        />
      </CardContent>
    </Card>
  )
}

type AwardsSectionProps = {
  title?: string | null
  awards?: {
    id: number
    title: string
    year: string
    images?: { url: string }[] | null
  }[]
}

export function AwardsSection({ title, awards }: AwardsSectionProps) {
  const displayAwards =
    awards && awards.length > 0
      ? awards.map((a) => ({
          id: `award-${a.id}`,
          year: a.year,
          title: a.title,
          source: 'Garda Pangan', // Strapi doesn't have source in the user's list, using fallback
          image: normalizeStrapiMediaUrl(a.images?.[0]?.url) || undefined,
        }))
      : defaultAwards

  return (
    <SectionShell
      aria-labelledby="awards-recognition-heading"
      spacing="default"
      tone="transparent"
      className="bg-garda-mint-soft/50"
      innerClassName="max-w-none px-0"
    >
      <div className="relative w-full">
        <div className="mb-8 flex justify-center text-center">
          <h2
            id="awards-recognition-heading"
            className="text-[clamp(2.75rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tight text-garda-forest"
          >
            {title ? (
              <span dangerouslySetInnerHTML={{ __html: title.replace('\n', '<br/>') }} />
            ) : (
              <>
                Awards &<br />
                Recognition
              </>
            )}
          </h2>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full cursor-grab active:cursor-grabbing select-none"
        >
          <CarouselContent className="-ml-4 px-4 sm:px-6 lg:px-8">
            {displayAwards.map((award) => (
              <CarouselItem
                key={award.id}
                className="basis-[260px] pl-4 sm:basis-[300px] lg:basis-[320px]"
              >
                <AwardCard {...award} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </SectionShell>
  )
}

type InstagramSectionProps = {
  title?: string | null
  posts?: {
    id: number
    title?: string | null
    image?: { url: string } | null
  }[]
}

export function InstagramSection({ title, posts }: InstagramSectionProps) {
  const displayPosts =
    posts && posts.length > 0
      ? posts.map((p) => ({
          id: `ig-${p.id}`,
          src: normalizeStrapiMediaUrl(p.image?.url) || '/figma/instagram/post-1.png',
          alt: p.title || 'Instagram post',
        }))
      : defaultInstagramPosts

  return (
    <SectionShell
      aria-labelledby="our-instagram-heading"
      spacing="compact"
      tone="white"
    >
      <div className="mx-auto flex w-full flex-col gap-8">
        <div className="flex justify-center text-center">
          <h2
            id="our-instagram-heading"
            className="text-[clamp(2.5rem,5vw,3.5rem)] font-black uppercase leading-tight tracking-tight text-garda-forest"
          >
            {title || 'Our Instagram'}
          </h2>
        </div>

        <div
          data-testid="instagram-grid"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-6"
        >
          {displayPosts.map((post) => (
            <figure
              key={post.id}
              className="overflow-hidden bg-[#d7ddd7] rounded-xl aspect-square"
            >
              <img
                src={post.src}
                alt={post.alt}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

