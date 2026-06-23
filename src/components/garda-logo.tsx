import { cn } from '#/lib/utils'

type GardaLogoProps = {
  className?: string
}

export function GardaLogo({ className }: GardaLogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/figma/garda-logo.png"
        alt="Garda Pangan"
        className="h-[42px] w-[90px] object-contain object-left"
      />
    </div>
  )
}
