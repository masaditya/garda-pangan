import { ActionCard } from './action-card'
import { GardaButton } from './garda-button'
import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

type AgentChangeSectionProps = {
  title?: string | null
  subtitle?: string | null
  cards?: {
    id: number
    title: string
    description: string
    image?: { url: string } | null
  }[]
}

export function AgentChangeSection({
  title,
  subtitle,
  cards,
}: AgentChangeSectionProps) {

  const defaultCards = [
    {
      title: 'Donasi Makanan',
      description: 'Methodical Data Collection and Meaningful Organization',
      iconSrc: '/figma/agent-food.png',
    },
    {
      title: 'Donasi Tunai',
      description: 'Methodical Data Collection and Meaningful Organization',
      iconSrc: '/figma/agent-cash.png',
    },
    {
      title: 'Usul Penerima',
      description: 'Methodical Data Collection and Meaningful Organization',
      iconSrc: '/figma/agent-suggest.png',
    },
    {
      title: 'Jadi Relawan',
      description: 'Methodical Data Collection and Meaningful Organization',
      iconSrc: '/figma/agent-volunteer.png',
    },
  ]

  const displayCards =
    cards && cards.length > 0
      ? cards.map((card, index) => ({
        title: card.title,
        description: card.description,
        iconSrc:
          normalizeStrapiMediaUrl(card.image?.url) ||
          defaultCards[index % defaultCards.length].iconSrc,
      }))
      : defaultCards

  return (
    <SectionShell
      aria-labelledby="agent-change-heading"
      spacing="default"
      tone="transparent"
    >
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2
          id="agent-change-heading"
          className="garda-section-heading text-[clamp(2rem,5vw,3.5rem)] capitalize"
        >
          {title || 'Ayo Jadi agen perubahan'}
        </h2>
        <p className="max-w-136 text-balance text-base leading-normal text-white/80 sm:text-lg">
          {subtitle ||
            'Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan kerawanan pangan di Indonesia.'}
        </p>
      </div>

      <div
        data-testid="agent-change-grid"
        className="relative z-10 mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {displayCards.map((card) => (
          <ActionCard
            key={card.title}
            title={card.title}
            description={card.description}
            iconSrc={card.iconSrc}
            className='rounded-lg!'
            action={
              <div className="flex">
                <GardaButton href="#" variant="impact" className="w-full">
                  MULAI
                </GardaButton>
              </div>
            }
          />
        ))}
      </div>
    </SectionShell>
  )
}
