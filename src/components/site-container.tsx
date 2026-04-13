import { cn } from '#/lib/utils'

type SiteContainerProps = React.ComponentPropsWithoutRef<'div'>

export function SiteContainer({
  className,
  children,
  ...props
}: SiteContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
