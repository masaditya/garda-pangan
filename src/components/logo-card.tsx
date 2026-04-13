import type * as React from 'react'

import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'

type LogoCardProps = React.ComponentPropsWithoutRef<typeof Card> & {
  className?: string
}

export function LogoCard({ children, className, ...props }: LogoCardProps) {
  return (
    <Card
      className={cn(
        'rounded-[0.75rem] border-transparent bg-[#f8f8f8] py-0 shadow-none',
        className,
      )}
      {...props}
    >
      <CardContent className="flex min-h-[10.5rem] items-center justify-center px-8 py-16">
        {children}
      </CardContent>
    </Card>
  )
}
