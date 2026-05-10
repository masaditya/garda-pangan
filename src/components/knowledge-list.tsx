import { useState, useMemo } from 'react'
import {
  FolderOpen,
  Search,
  ChevronDown,
} from 'lucide-react'

import type { StrapiMedia } from '../lib/strapi/types'

export type KnowledgeItem = {
  id: number
  documentId: string
  title: string
  slug: string
  category: string
  date: string
  coverImage?: StrapiMedia
}

type KnowledgeListProps = {
  initialKnowledges: KnowledgeItem[]
}

export function KnowledgeList({ initialKnowledges }: KnowledgeListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState<string>('')
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('Tampilkan Semua')
  const [sortOrder, setSortOrder] = useState<'Terbaru' | 'Terlama'>('Terbaru')
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  // Extract unique categories
  const categories = useMemo(() => {
    const allCategories = initialKnowledges.map((item) => item.category).filter(Boolean)
    return Array.from(new Set(allCategories)).sort()
  }, [initialKnowledges])

  // Use dummy categories if none exist (for UI matching the image)
  const displayCategoriesTabs = categories.length > 0
    ? ['Tampilkan Semua', ...categories]
    : ['Tampilkan Semua', 'Kategori A', 'Kategori B', 'Kategori C', 'Kategori D']

  const displayCategoriesDropdown = categories.length > 0
    ? categories
    : ['Kategori A', 'Kategori B', 'Kategori C', 'Kategori D']

  const filteredKnowledges = useMemo(() => {
    return initialKnowledges
      .filter((item) => {
        const matchSearch = item.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

        // Filter by category from dropdown
        const matchDropdown = selectedCategoryDropdown ? item.category === selectedCategoryDropdown : true

        // Filter by category from tabs
        const matchTab = selectedCategoryTab !== 'Tampilkan Semua'
          ? item.category === selectedCategoryTab
          : true

        return matchSearch && matchDropdown && matchTab
      })
      .sort((a, b) => {
        const timeA = new Date(a.date || 0).getTime()
        const timeB = new Date(b.date || 0).getTime()
        return sortOrder === 'Terbaru' ? timeB - timeA : timeA - timeB
      })
  }, [initialKnowledges, searchQuery, selectedCategoryDropdown, selectedCategoryTab, sortOrder])

  // Use dummy data only if the API returns no items at all (for UI preview)
  const isPreviewMode = initialKnowledges.length === 0;

  const displayKnowledges = isPreviewMode
    ? Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      documentId: `dummy-${i}`,
      title: i % 3 === 0
        ? 'Apresiasi Satu Indonesia Awards'
        : i % 3 === 1
          ? 'Garda Pangan dalam One Planet Network Forum'
          : 'Apresiasi untuk Garda Pangan dalam IDAFLW 2024',
      slug: `dummy-${i}`,
      category: 'Kategori A',
      date: new Date().toISOString(),
      coverImage: {
        url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop'
      } as StrapiMedia
    }))
    : filteredKnowledges;

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Floating Search Bar */}
      <div className="relative -mt-10 mb-16 flex justify-center z-20">
        <div className="flex w-full max-w-4xl flex-col md:flex-row items-center gap-2 md:gap-0 rounded-3xl md:rounded-full bg-white p-2 shadow-[0_12px_40px_rgba(13,42,22,0.1)]">
          <div className="flex flex-1 items-center px-6 py-3 w-full">
            <input
              type="text"
              placeholder="Cari Knowledge & Insights"
              className="w-full bg-transparent text-garda-forest outline-none placeholder:text-garda-forest/40 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-garda-border" />

          {/* Custom Category Dropdown */}
          <div className="relative flex items-center justify-between px-6 py-3 min-w-[200px] w-full md:w-auto border-t md:border-t-0 border-garda-border">
            <button
              className="flex w-full items-center justify-between gap-3 text-garda-forest font-medium outline-none"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="size-5 text-garda-forest/50" />
                <span>{selectedCategoryDropdown || 'Kategori'}</span>
              </div>
              <ChevronDown
                className={`size-4 text-garda-forest/50 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full right-0 mt-4 w-full md:w-48 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-50">
                <button
                  className="w-full px-4 py-3 text-left text-sm hover:bg-garda-mint-soft text-garda-forest font-medium"
                  onClick={() => {
                    setSelectedCategoryDropdown('')
                    setIsCategoryDropdownOpen(false)
                  }}
                >
                  Semua Kategori
                </button>
                {displayCategoriesDropdown.map((cat) => (
                  <button
                    key={cat}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-garda-mint-soft text-garda-forest font-medium"
                    onClick={() => {
                      setSelectedCategoryDropdown(cat)
                      setIsCategoryDropdownOpen(false)
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-garda-forest px-8 font-bold text-white transition-colors hover:bg-garda-forest-strong shadow-md">
            <span>Search</span>
            <Search className="size-4" />
          </button>
        </div>
      </div>

      {/* Tabs & Sort */}
      <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-garda-border/40 md:flex-row">
        <div className="flex flex-wrap items-center gap-8">
          {displayCategoriesTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategoryTab(tab)}
              className={`pb-4 text-base font-bold transition-all relative ${selectedCategoryTab === tab
                ? 'text-garda-forest'
                : 'text-garda-forest/40 hover:text-garda-forest/70'
                }`}
            >
              {tab}
              {selectedCategoryTab === tab && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-garda-forest" />
              )}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative pb-4">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center gap-3 rounded-full border border-garda-border bg-white px-6 py-2.5 text-sm font-semibold text-garda-forest shadow-sm transition-all hover:bg-garda-mint-soft"
          >
            <span>{sortOrder}</span>
            <ChevronDown className={`size-4 transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-30 animate-in fade-in slide-in-from-top-2">
              {(['Terbaru', 'Terlama'] as const).map((option) => (
                <button
                  key={option}
                  className={`w-full px-5 py-3 text-left text-sm font-bold transition-colors ${sortOrder === option ? 'bg-garda-mint-soft text-garda-forest' : 'text-garda-forest/60 hover:bg-garda-mint-soft/50'
                    }`}
                  onClick={() => {
                    setSortOrder(option)
                    setIsSortDropdownOpen(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayKnowledges.map((item) => {
          const imageUrl = item.coverImage?.url || 'https://placehold.co/600x900'
          const itemUrl = `/knowledge/${item.slug}`

          return (
            <a
              href={itemUrl}
              key={item.id}
              className="group relative flex aspect-2/3 w-full flex-col justify-end overflow-hidden rounded-xl bg-garda-forest shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              {/* Background Image */}
              <img
                src={imageUrl}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/50" />

              {/* Content */}
              <div className="relative z-10 flex flex-col p-8 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                <span className="mb-3 text-sm font-bold tracking-wider uppercase text-[#FFC107]">
                  {item.category || 'Kategori A'}
                </span>
                <h3 className="font-sans text-2xl font-bold leading-tight text-white md:text-3xl line-clamp-3">
                  {item.title}
                </h3>
              </div>
            </a>
          )
        })}
      </div>

      {/* Pagination (Dummy) */}
      <div className="mt-16 flex items-center justify-between border-t border-garda-border/40 pt-8">
        <button className="flex items-center gap-2 text-sm font-bold text-garda-forest/40 hover:text-garda-forest transition-colors">
          &lt; Previous
        </button>
        <div className="flex items-center gap-6 text-sm font-bold text-garda-forest/40">
          <button className="text-garda-forest">1</button>
          <button className="hover:text-garda-forest transition-colors">2</button>
          <button className="hover:text-garda-forest transition-colors">3</button>
          <span className="opacity-50">...</span>
          <button className="hover:text-garda-forest transition-colors">10</button>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-garda-forest hover:text-garda-forest-strong transition-colors">
          Next &gt;
        </button>
      </div>
    </div>
  )
}
