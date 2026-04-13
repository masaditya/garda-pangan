import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'

const metricCardVariants = cva(
  'relative isolate w-full overflow-hidden rounded-[2rem] border-white/80 bg-white py-0 shadow-[0_22px_56px_rgba(13,42,22,0.1)] backdrop-blur-sm lg:w-[406px]',
  {
    variants: {
      placement: {
        'top-left':
          'lg:col-start-1 lg:row-start-1 lg:h-[558px] lg:justify-self-start lg:-mr-10 lg:-mt-[1.0625rem]',
        'top-right':
          'lg:col-start-3 lg:row-start-1 lg:h-[598px] lg:justify-self-end lg:-ml-8 lg:-mt-[2.875rem]',
        'bottom-left':
          'lg:col-start-1 lg:row-start-2 lg:h-[558px] lg:justify-self-start lg:-mr-12 lg:mt-[3.125rem]',
        'bottom-right':
          'lg:col-start-3 lg:row-start-2 lg:h-[650px] lg:justify-self-end lg:-ml-8 lg:mt-[3.375rem]',
      },
      variant: {
        clipboard: '',
        megaphone: '',
        target: '',
        ecosystem: '',
      },
    },
    defaultVariants: {
      placement: 'top-left',
      variant: 'clipboard',
    },
  },
)

type MetricCardProps = VariantProps<typeof metricCardVariants> & {
  imageSrc: string
  label: string
  testId: string
  value: string
}

const artClasses: Record<
  NonNullable<MetricCardProps['variant']>,
  { image: string; wrap: string }
> = {
  clipboard: {
    image: 'w-[12rem] sm:w-[13rem] lg:w-[16.8125rem]',
    wrap: 'justify-start pt-4 lg:pt-6',
  },
  megaphone: {
    image: 'w-[12rem] sm:w-[13rem] lg:w-[19.0625rem]',
    wrap: 'justify-start pt-4 lg:pt-8',
  },
  target: {
    image: 'w-[11.5rem] sm:w-[12.5rem] lg:w-[19.4375rem]',
    wrap: 'justify-start pt-4 lg:pt-8',
  },
  ecosystem: {
    image: 'w-[12rem] sm:w-[13rem] lg:w-[22.5625rem]',
    wrap: 'justify-start pt-4 lg:pt-10',
  },
}

export function MetricCard({
  imageSrc,
  label,
  placement,
  testId,
  value,
  variant = 'clipboard',
}: MetricCardProps) {
  return (
    <Card
      data-testid={testId}
      className={metricCardVariants({ placement, variant })}
    >
      <CardContent className="relative flex h-full min-h-[21rem] flex-col px-6 py-6 sm:px-8 sm:py-7 lg:min-h-0 lg:px-8 lg:py-8">
        {variant === 'megaphone' ? (
          <div
            aria-hidden="true"
            data-testid="impact-card-pattern"
            className="absolute inset-x-0 bottom-0 top-[16rem] rounded-b-[2rem] bg-[radial-gradient(circle,_rgba(15,15,15,0.18)_0.75px,_transparent_0.75px)] bg-[length:9px_9px] opacity-25 lg:top-[15.75rem]"
          />
        ) : null}
        <div className="relative z-10">
          <p className="font-display text-[clamp(3rem,7vw,5rem)] font-black leading-[0.88] tracking-[-0.04em] text-black lg:text-[5.375rem]">
            {value}
          </p>
          <p className="mt-3 max-w-[20.75rem] text-[1.05rem] font-bold leading-[1.45] tracking-[-0.03em] text-black lg:text-[1.5rem]">
            {label}
          </p>
        </div>
        <div
          className={cn(
            'relative z-10 mt-auto flex',
            artClasses[variant].wrap,
          )}
        >
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className={cn('h-auto max-w-full object-contain', artClasses[variant].image)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
