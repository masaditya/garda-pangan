import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { SiteContainer } from './site-container'
import { cn } from '#/lib/utils'

const sectionShellVariants = cva('relative', {
  variants: {
    spacing: {
      compact: 'py-12 sm:py-16',
      default: 'py-16 sm:py-20 lg:py-24',
      hero: 'pt-28 pb-14 sm:pt-32 sm:pb-18 lg:pt-36 lg:pb-24',
    },
    tone: {
      transparent: 'bg-transparent',
      paper: 'bg-garda-paper/70',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    spacing: 'default',
    tone: 'transparent',
  },
})

type SectionShellProps = React.ComponentPropsWithoutRef<'section'> &
  VariantProps<typeof sectionShellVariants> & {
    innerClassName?: string
  }

export function SectionShell({
  className,
  innerClassName,
  children,
  spacing,
  tone,
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn(sectionShellVariants({ spacing, tone }), className)}
      {...props}
    >
      <SiteContainer className={innerClassName}>{children}</SiteContainer>
    </section>
  )
}
