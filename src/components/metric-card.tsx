import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'

const metricCardVariants = cva(
  'relative isolate w-full overflow-hidden rounded-4xl border-white/80 bg-white py-0 shadow-[0_22px_56px_rgba(13,42,22,0.1)] backdrop-blur-sm lg:max-w-[400px]',
  {
    variants: {
      variant: {
        clipboard: '',
        megaphone: '',
        target: '',
        ecosystem: '',
      },
    },
    defaultVariants: {
      variant: 'clipboard',
    },
  },
)

type MetricCardProps = VariantProps<typeof metricCardVariants> & {
  imageSrc: string
  label: string
  testId: string
  value: string
  className?: string
}

const artClasses: Record<
  NonNullable<MetricCardProps['variant']>,
  { image: string; wrap: string }
> = {
  clipboard: {
    image: 'w-[10rem] sm:w-[12rem] lg:w-[15rem]',
    wrap: 'justify-start pt-4',
  },
  megaphone: {
    image: 'w-[10rem] sm:w-[12rem] lg:w-[16rem]',
    wrap: 'justify-start pt-4',
  },
  target: {
    image: 'w-[10rem] sm:w-[12rem] lg:w-[16rem]',
    wrap: 'justify-start pt-4',
  },
  ecosystem: {
    image: 'w-[10rem] sm:w-[12rem] lg:w-[18rem]',
    wrap: 'justify-start pt-4',
  },
}

export function MetricCard({
  imageSrc,
  label,
  testId,
  value,
  variant = 'clipboard',
  className,
}: MetricCardProps) {
  const safeVariant = variant || 'clipboard'
  const art = artClasses[safeVariant]

  return (
    <Card
      data-testid={testId}
      className={cn(metricCardVariants({ variant: safeVariant }), className)}
    >
      <CardContent className="relative flex h-full min-h-[350px] flex-col px-8 py-10 lg:min-h-[500px]">
        {safeVariant === 'megaphone' ? (
          <div
            aria-hidden="true"
            data-testid="impact-card-pattern"
            className="absolute inset-x-0 bottom-0 top-48 rounded-b-4xl bg-[radial-gradient(circle,rgba(15,15,15,0.1)_0.75px,transparent_0.75px)] bg-size-[9px_9px] opacity-20"
          />
        ) : null}
        <div className="relative z-10 flex flex-col gap-4">
          <p className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-garda-forest">
            {value}
          </p>
          <p className="max-w-[280px] text-[1.125rem] font-bold leading-snug tracking-tight text-garda-forest/80">
            {label}
          </p>
        </div>
        <div className={cn('relative z-10 mt-auto flex', art.wrap)}>
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className={cn('h-auto max-w-full object-contain', art.image)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
