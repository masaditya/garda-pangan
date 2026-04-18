import { Calendar, Share2 } from 'lucide-react'

export type MerchandiseItem = {
  id: number | string
  title: string
  category: string
  date: string
  description: string
  platforms: string[]
}

export function MerchandiseCard({ product }: { product: MerchandiseItem }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-garda-paper px-3 py-1 text-xs font-semibold text-garda-forest">
          {product.category}
        </span>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-garda-forest text-white transition-transform hover:scale-105">
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      {/* Image Placeholder */}
      <div className="mb-5 aspect-[4/3] w-full rounded-xl bg-garda-paper/80" />

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-garda-ink-soft">
          <Calendar className="h-3.5 w-3.5" />
          <span>{product.date}</span>
        </div>
        
        <h3 className="mb-2 text-lg font-bold leading-tight text-garda-ink">
          {product.title}
        </h3>
        
        <p className="mb-6 text-sm leading-relaxed text-garda-ink-soft line-clamp-2">
          {product.description}
        </p>

        {/* Footer/Links */}
        <div className="mt-auto flex flex-wrap gap-2">
          {product.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-full bg-garda-paper/50 px-3 py-1 text-xs font-semibold text-garda-forest border border-garda-forest/10"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
