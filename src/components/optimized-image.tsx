import { cn } from '#/lib/utils'

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** When true, loads eagerly (above-the-fold images). Default: lazy */
  priority?: boolean
}

/**
 * Drop-in `<img>` replacement that applies lazy-loading, async decoding,
 * and `fetchpriority` hints automatically.
 *
 * Use `priority` for hero / above-the-fold images so the browser fetches
 * them immediately instead of deferring.
 */
export function OptimizedImage({
  priority = false,
  className,
  alt = '',
  ...rest
}: OptimizedImageProps) {
  return (
    <img
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      alt={alt}
      className={cn(className)}
      {...rest}
    />
  )
}
