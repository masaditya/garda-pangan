import { ArrowRight } from 'lucide-react'
import { actionItems } from './home-content'

function ActionCard({
  title,
  description,
  ctaLabel,
}: {
  title: string
  description: string
  ctaLabel?: string
}) {
  return (
    <article className="relative flex min-h-[21rem] flex-col justify-between rounded-[2rem] bg-white px-[0.9375rem] py-6 shadow-[0_22px_44px_rgba(17,17,17,0.09)] md:min-h-[23.375rem] md:rounded-[3.125rem]">
      <div
        aria-hidden="true"
        className="h-[6.25rem] w-[6.25rem] rounded-full border-4 border-white bg-[#f1f1f1] shadow-[0_14px_32px_rgba(17,17,17,0.12)]"
      />
      <div className="mt-auto pt-[2.125rem]">
        <h2 className="m-0 text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] text-[#111111]">
          {title}
        </h2>
        <p className="mt-4 mb-0 w-full max-w-[16.25rem] text-base leading-[1.625rem] font-medium text-[#6b7280]">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="mt-8 inline-flex min-h-14 w-full cursor-pointer items-center justify-end gap-3 rounded-full border-0 bg-[#0a5a2f] px-3 py-2 text-inherit"
        aria-label={ctaLabel ? `${title} ${ctaLabel}` : `${title} lanjutkan`}
      >
        <span className="min-w-0 flex-1 text-center text-base font-bold tracking-[-0.01em] text-[#ffe602]">
          {ctaLabel ?? ''}
        </span>
        <span
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffe45a] text-[#0a5a2f]"
          aria-hidden="true"
        >
          <ArrowRight size={18} strokeWidth={2.6} />
        </span>
      </button>
    </article>
  )
}

export default function ChangeAgentSection() {
  return (
    <section className="relative px-3 pt-6 md:px-[clamp(1rem,2vw,2.25rem)] md:pt-[clamp(1.5rem,2vw,2rem)]">
      <span
        aria-hidden="true"
        className="absolute bottom-10 left-[-10rem] z-0 aspect-square w-[15rem] rounded-[59%_41%_57%_43%_/_46%_52%_48%_54%] bg-[#ffc62f] shadow-[0_0_0_1.15rem_#2e6254,0_0_0_2rem_#080808] md:bottom-5 md:left-[-9rem] md:w-[clamp(15rem,24vw,22rem)]"
      />
      <span
        aria-hidden="true"
        className="absolute top-20 right-[-9rem] z-0 aspect-square w-[15rem] rounded-[59%_41%_57%_43%_/_46%_52%_48%_54%] bg-[#ffc62f] shadow-[0_0_0_1.15rem_#2e6254,0_0_0_2rem_#080808] md:top-2 md:right-[-7rem] md:w-[clamp(15rem,24vw,22rem)]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="m-0 text-[clamp(2.8rem,4vw,3.5rem)] leading-[1.08] font-black tracking-[-0.04em] text-[#111111]">
          AYO JADI AGEN PERUBAHAN
        </h1>
        <p className="mt-3 mb-0 w-full max-w-[34rem] text-base leading-[1.5] font-normal text-[#303030] md:text-[clamp(1rem,1.5vw,1.25rem)]">
          Melalui Garda Pangan kamu bisa berpartisipasi dalam menuntaskan
          kerawanan pangan di Indonesia.
        </p>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-1 gap-4 md:mt-[clamp(2rem,4vw,2.75rem)] lg:grid-cols-2 lg:gap-6 xl:grid-cols-4">
        {actionItems.map((item) => (
          <ActionCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}
