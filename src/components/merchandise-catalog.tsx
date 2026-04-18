import { useState } from 'react'
import { SectionShell } from './section-shell'
import { MerchandiseFilter } from './merchandise-filter'
import { MerchandiseCard, type MerchandiseItem } from './merchandise-card'

const MOCK_CATEGORIES = [
  { name: 'Kaos', count: 0 },
  { name: 'Pupuk', count: 15 },
  { name: 'Totebag', count: 104 },
  { name: 'Tumbler', count: 123 },
]

const MOCK_PRODUCTS: MerchandiseItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `prod-${i}`,
  title: 'FRESH MAGGOT',
  category: 'Pupuk',
  date: 'Okt 2024',
  description: 'Maggot fresh yang kaya protein, untuk pakan ternak',
  platforms: ['Tokopedia', 'Shopee'],
}))

export function MerchandiseCatalog() {
  const [selectedCats, setSelectedCats] = useState<string[]>([])

  const handleToggle = (cat: string) => {
    setSelectedCats((prev) => 
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  // Filter products if categories are selected, else show all
  const filteredProducts = selectedCats.length > 0 
    ? MOCK_PRODUCTS.filter(p => selectedCats.includes(p.category))
    : MOCK_PRODUCTS

  return (
    <div className="min-h-screen pb-24">
      <SectionShell tone="transparent" spacing="compact">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <MerchandiseFilter 
                categories={MOCK_CATEGORIES} 
                selected={selectedCats} 
                onChange={handleToggle} 
              />
            </div>
          </div>
          
          {/* Grid */}
          <div className="lg:col-span-9">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <MerchandiseCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  )
}
