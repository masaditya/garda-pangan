import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'

type ActionCardProps = {
  action: React.ReactNode
  className?: string
  description: string
  eyebrow?: string
  title: string
}

export function ActionCard({
  action,
  className,
  description,
  eyebrow,
  title,
}: ActionCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[3.125rem] border-white bg-white py-0 shadow-[0_20px_30px_rgba(18,34,21,0.08),0_10px_18px_rgba(18,34,21,0.04)]',
        className,
      )}
    >
      <CardContent className="flex h-full min-h-[23.375rem] flex-col px-[15px] py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="size-[6.25rem] rounded-full border-4 border-white bg-[#f2f2f2] shadow-[0_14px_26px_rgba(0,0,0,0.08)]" />
          {eyebrow ? (
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-garda-forest/65">
              {eyebrow}
            </span>
          ) : null}
        </div>
        <div className="mt-8 flex flex-1 flex-col px-1">
          <h3 className="text-[1.75rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#08080c]">
            {title}
          </h3>
          <p className="mt-4 text-base leading-[1.625] font-medium text-[#6b7280]">
            {description}
          </p>
        </div>
        <div className="mt-6">{action}</div>
      </CardContent>
    </Card>
  )
}
