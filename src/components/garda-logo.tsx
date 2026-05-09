import { cn } from '#/lib/utils'

type GardaLogoProps = {
  className?: string
}

export function GardaLogo({ className }: GardaLogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <div className="flex size-10 items-center justify-center rounded-lg bg-transparent text-garda-forest">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8 text-garda-sun"
        >
          <path d="M12 2v20M7 7l5 5 5-5M7 13l5 5 5-5" />
        </svg>
      </div>
      <span className="sr-only">Garda Pangan</span>
      <div
        className="flex flex-col text-[1.1rem] leading-[0.85] font-black tracking-[-0.04em] text-garda-forest sm:text-[1.3rem]"
        aria-label="Garda Pangan"
      >
        <span>Garda</span>
        <span className="-mt-0.5">Pangan</span>
      </div>
    </div>
  )
}
