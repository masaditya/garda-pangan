import { useState } from 'react'
import { SectionShell } from './section-shell'
import { MerchandiseFilter } from './merchandise-filter'
import { MerchandiseCard } from './merchandise-card'
import type { MerchandiseItem } from './merchandise-card'
import type { CategoryCount } from './merchandise-filter'

type MerchandiseCatalogProps = {
  products: MerchandiseItem[]
  categories: CategoryCount[]
}

export function MerchandiseCatalog({
  products,
  categories,
}: MerchandiseCatalogProps) {
  const [selectedCats, setSelectedCats] = useState<string[]>([])

  const handleToggle = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  const filteredProducts =
    selectedCats.length > 0
      ? products.filter((product) => selectedCats.includes(product.category))
      : products

  return (
    <div className="min-h-screen pb-24">
      <SectionShell tone="transparent" spacing="compact">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <MerchandiseFilter
                categories={categories}
                selected={selectedCats}
                onChange={handleToggle}
              />
            </div>
          </div>

          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <MerchandiseCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl bg-white px-6 py-12 text-center text-garda-ink-soft shadow-sm ring-1 ring-garda-neutral/5">
                Belum ada merchandise untuk kategori yang dipilih.
              </p>
            )}
          </div>
        </div>
      </SectionShell>
    </div>
  )
}
