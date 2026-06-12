import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'

type ActionCardProps = {
  action: React.ReactNode
  className?: string
  description: string
  title: string
  iconSrc?: string
}

export function ActionCard({
  action,
  className,
  description,
  title,
  iconSrc,
}: ActionCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[2.5rem] border-white bg-white py-0 shadow-[0_20px_30px_rgba(18,34,21,0.08)]',
        className,
      )}
    >
      <CardContent className="flex h-full min-h-93.5 flex-col px-6 py-10">
        <div className="flex aspect-square w-full items-center justify-center">
          {iconSrc ? (
            <img
              src={iconSrc}
              alt=""
              className="h-auto w-[80%] object-contain"
            />
          ) : (
            <div className="size-24 rounded-full bg-slate-100" />
          )}
        </div>
        <div className="mt-6 flex flex-1 flex-col text-center">
          <h3 className="text-xl leading-tight text-garda-forest">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            {description}
          </p>
        </div>
        <div className="mt-8">{action}</div>
      </CardContent>
    </Card>
  )
}
