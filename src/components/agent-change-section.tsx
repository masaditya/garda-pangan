import { ActionCard } from './action-card'
import { GardaButton } from './garda-button'
import { SectionShell } from './section-shell'

const actionCards = [
  {
    title: 'Donasi Makanan',
    description:
      'Menyalurkan donasi makanan kepada kalangan masyarakat pra-sejahtera.',
  },
  {
    title: 'Donasi Tunai',
    description:
      'Berpartisipasi mengurangi kerawanan pangan saudara kita dari masyarakat pra-sejahtera.',
  },
  {
    title: 'Usul Penerima',
    description:
      'Bantu kami menemukan penerima manfaat baru agar distribusi pangan bisa menjangkau lebih tepat sasaran.',
  },
  {
    title: 'Jadi Relawan',
    description:
      'Dapatkan pengalaman berharga turun tangan langsung menjadi Food Heroes Garda Pangan untuk mengantarkan makanan.',
  },
] as const

export function AgentChangeSection() {
  return (
    <SectionShell
      aria-labelledby="agent-change-heading"
      spacing="compact"
      tone="white"
    >
      <div className="relative grid gap-8 overflow-hidden rounded-[2rem] bg-white px-4 py-8 shadow-[0_26px_50px_rgba(13,54,31,0.06)] sm:px-5 sm:py-10 lg:rounded-[2.5rem] lg:px-[3.75rem] lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-36 hidden h-[23rem] w-[19rem] rotate-[16deg] rounded-[52%_48%_38%_62%/49%_35%_65%_51%] bg-[#f7c94b] [filter:drop-shadow(-14px_16px_0_#35594d)_drop-shadow(8px_6px_0_#0a0a0a)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-44 top-14 hidden h-[22rem] w-[25rem] rotate-[-8deg] rounded-[41%_59%_62%_38%/39%_36%_64%_61%] bg-[#f7c94b] [filter:drop-shadow(-14px_16px_0_#35594d)_drop-shadow(8px_6px_0_#0a0a0a)] lg:block"
        />

        <div className="relative z-10 mx-auto flex max-w-[48rem] flex-col items-center gap-4 text-center">
          <h2
            id="agent-change-heading"
            className="text-[clamp(2.75rem,5vw,3.5rem)] font-black uppercase leading-[1.02] tracking-[-0.06em] text-[#080808]"
          >
            Ayo Jadi Agen Perubahan
          </h2>
          <p className="max-w-[34rem] text-balance text-base leading-[1.5] text-[#080808]/80 sm:text-lg lg:text-[1.25rem]">
            Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan
            kerawanan pangan di Indonesia.
          </p>
        </div>

        <div
          data-testid="agent-change-grid"
          className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {actionCards.map((card) => (
            <ActionCard
              key={card.title}
              title={card.title}
              description={card.description}
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
      </div>
    </SectionShell>
  )
}
