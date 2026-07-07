import { Calendar, ExternalLink, Share2 } from 'lucide-react'

export type MerchandiseItem = {
  id: number | string
  title: string
  category: string
  date: string
  description: string
  platforms: string[]
  /** URL keyed by platform name, e.g. { Tokopedia: 'https://...' } */
  platformLinks?: Record<string, string>
  /** Canonical product URL used for the share button */
  shareUrl?: string | null
  imageUrl?: string | null
}

/** Ensures a URL is absolute. Bare URLs like "shopee.com" become "https://shopee.com". */
function normalizeExternalUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url
  return `https://${url}`
}

async function handleShare(product: MerchandiseItem) {
  const url = product.shareUrl ?? window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: product.title, url })
    } catch {
      // user cancelled — do nothing
    }
  } else {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // clipboard not available — silently ignore
    }
  }
}

export function MerchandiseCard({ product }: { product: MerchandiseItem }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-garda-paper px-3 py-1 text-xs font-semibold text-garda-forest">
          {product.category}
        </span>
        <button
          type="button"
          aria-label={`Bagikan ${product.title}`}
          onClick={() => handleShare(product)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-garda-forest text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-garda-forest"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-garda-paper/80">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-garda-ink-soft">
          <Calendar className="h-3.5 w-3.5" />
          <span>{product.date}</span>
        </div>

        <h3 className="mb-2 font-serif text-lg leading-tight text-garda-ink">
          {product.title}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-garda-ink-soft line-clamp-2">
          {product.description}
        </p>

        {/* Footer/Links */}
        <div className="mt-auto flex flex-wrap gap-2">
          {product.platforms.map((platform) => {
            const href = product.platformLinks?.[platform]
            const chipClass =
              'rounded-full bg-garda-paper/50 px-3 py-1 text-xs font-semibold text-garda-forest border border-garda-forest/10 transition-colors'
            return href ? (
              <a
                key={platform}
                href={normalizeExternalUrl(href)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Beli di ${platform} (buka di tab baru)`}
                className={`${chipClass} inline-flex items-center gap-1 hover:bg-garda-forest hover:text-white hover:border-garda-forest`}
              >
                {platform}
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            ) : (
              <span
                key={platform}
                className={chipClass}
              >
                {platform}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
