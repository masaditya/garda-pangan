import { ActionCard } from './action-card'
import { GardaButton } from './garda-button'
import { SectionShell } from './section-shell'

export function AgentChangeSection() {
  const actionCards = [
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
  ] as const

  return (
    <SectionShell
      aria-labelledby="agent-change-heading"
      spacing="default"
      tone="transparent"
      className="bg-garda-mint-soft/50 rounded-3xl"
    >
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2
          id="agent-change-heading"
          className="text-[clamp(2.75rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tight text-garda-forest"
        >
          Ayo Jadi Agen Perubahan
        </h2>
        <p className="max-w-136 text-balance text-base leading-normal text-[#080808]/80 sm:text-lg">
          Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan
          kerawanan pangan di Indonesia.
        </p>
      </div>

      <div
        data-testid="agent-change-grid"
        className="relative z-10 mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {actionCards.map((card) => (
          <ActionCard
            key={card.title}
            title={card.title}
            description={card.description}
            iconSrc={card.iconSrc}
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
