import { ActionCard } from './action-card'
import { GardaButton } from './garda-button'
import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

const defaultAgentCards = [
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

type SupportersCollaboratorsSectionProps = {
  title?: string | null
  subtitle?: string | null
  cards?: {
    id: number
    title: string
    description: string
    image?: { url: string } | null
    ctaText?: string | null
    ctaLink?: string | null
  }[]
}

export function SupportersCollaboratorsSection({
  title,
  subtitle,
  cards,
}: SupportersCollaboratorsSectionProps) {
  const displayCards =
    cards && cards.length > 0
      ? cards.map((card, index) => ({
          title: card.title,
          description: card.description,
          iconSrc:
            normalizeStrapiMediaUrl(card.image?.url) ||
            defaultAgentCards[index % defaultAgentCards.length].iconSrc,
          ctaText: card.ctaText || 'MULAI',
          ctaLink: card.ctaLink || '#',
        }))
      : defaultAgentCards.map(c => ({
          ...c,
          ctaText: 'MULAI',
          ctaLink: '#',
        }))

  return (
    <SectionShell
      id="agent-change"
      aria-labelledby="agent-change-cards-heading"
      spacing="default"
      tone="transparent"
      className="bg-[#FCF9E0]"
    >
      <div className="mx-auto flex w-full flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            id="agent-change-cards-heading"
            className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-normal leading-tight tracking-tight text-garda-forest-deep capitalize"
          >
            {title || 'Ayo Jadi agen perubahan'}
          </h2>
          <p className="max-w-xl text-balance text-base leading-normal text-garda-ink-soft sm:text-lg">
            {subtitle ||
              'Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan kerawanan pangan di Indonesia.'}
          </p>
        </div>

        <div
          data-testid="agent-change-grid"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {displayCards.map((card) => (
            <ActionCard
              key={card.title}
              title={card.title}
              description={card.description}
              iconSrc={card.iconSrc}
              className="rounded-lg!"
              action={
                <div className="flex">
                  <GardaButton href={card.ctaLink} variant="impact" className="w-full">
                    {card.ctaText}
                  </GardaButton>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
