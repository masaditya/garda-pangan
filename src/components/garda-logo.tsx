import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { cn } from '#/lib/utils'

type GardaLogoProps = {
  className?: string
}

export function GardaLogo({ className }: GardaLogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <Avatar className="size-12 border border-garda-border bg-white/75 shadow-sm">
        <AvatarFallback className="bg-transparent text-sm font-black text-garda-forest">
          GP
        </AvatarFallback>
      </Avatar>
      <span className="sr-only">Garda Pangan</span>
      <div
        className="flex flex-col text-[1.05rem] leading-[0.88] font-black tracking-[-0.06em] text-garda-forest sm:text-[1.22rem]"
        aria-label="Garda Pangan"
      >
        <span>Garda</span>
        <span className="text-garda-forest/90">Pangan</span>
      </div>
    </div>
  )
}
