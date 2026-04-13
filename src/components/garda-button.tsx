import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

const gardaButtonVariants = cva(
  'group inline-flex h-auto min-h-12 items-center justify-center gap-3 rounded-full border border-transparent px-5 py-2.5 text-sm font-bold tracking-[-0.02em] shadow-[0_16px_36px_rgba(13,42,22,0.14)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(13,42,22,0.18)] focus-visible:ring-garda-mint',
  {
    variants: {
      variant: {
        primary:
          'bg-garda-forest text-white hover:bg-garda-forest-strong dark:bg-garda-forest dark:text-white',
        hero: 'bg-garda-forest text-white hover:bg-garda-forest-strong',
        impact:
          'min-h-14 justify-between gap-4 border-transparent bg-garda-forest px-3 py-3 text-base tracking-[-0.03em] text-garda-sun shadow-none hover:bg-garda-forest hover:shadow-[0_14px_22px_rgba(10,90,47,0.18)]',
        subtle:
          'border-garda-border bg-white/90 text-garda-forest shadow-[0_12px_28px_rgba(13,42,22,0.08)] hover:bg-garda-mint-soft',
      },
      size: {
        default: '',
        compact: 'min-h-10 px-4 py-2 text-[0.92rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type GardaButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'variant' | 'size' | 'asChild'
> &
  VariantProps<typeof gardaButtonVariants> & {
    className?: string
    href?: string
    withIcon?: boolean
  }

export function GardaButton({
  children,
  className,
  href = '#',
  variant = 'primary',
  size = 'default',
  withIcon = true,
  ...props
}: GardaButtonProps) {
  const content = (
    <>
      <span
        className={cn(
          variant === 'hero' && 'text-white',
          variant === 'impact' && 'text-garda-sun',
        )}
      >
        {children}
      </span>
      {withIcon ? (
        <span
          className={cn(
            'flex size-8 items-center justify-center rounded-full bg-garda-sun text-garda-forest transition-transform duration-200 group-hover:translate-x-0.5',
            size === 'compact' && 'size-7',
          )}
          role="img"
          aria-label="Arrow icon"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      ) : null}
    </>
  )

  return (
    <Button
      asChild={Boolean(href)}
      variant="ghost"
      className={cn(gardaButtonVariants({ variant, size }), className)}
      {...props}
    >
      {href ? <a href={href}>{content}</a> : content}
    </Button>
  )
}
