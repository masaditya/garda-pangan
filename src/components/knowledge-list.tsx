import { useState, useMemo } from 'react'
import {
  FolderOpen,
  Search,
  ChevronDown,
} from 'lucide-react'

import type { KnowledgeItem } from '#/lib/strapi/knowledge'
import type { Locale } from '#/lib/i18n/locales'
import { localizedPath } from '#/lib/i18n/routing'

export type { KnowledgeItem }

export type KnowledgeCategory = {
  name: string
  slug: string
}

export type KnowledgeListLabels = {
  searchPlaceholder: string
  categoryFilterLabel: string
  filterAllLabel: string
  sortNewestLabel: string
  sortOldestLabel: string
  searchSubmitLabel: string
  paginationPrevLabel: string
  paginationNextLabel: string
  emptyListMessage: string
}

type KnowledgeListProps = {
  initialKnowledges: KnowledgeItem[]
  categories: KnowledgeCategory[]
  labels: KnowledgeListLabels
  locale?: Locale
}

export function KnowledgeList({
  initialKnowledges,
  categories,
  labels,
  locale = 'id',
}: KnowledgeListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState('')
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(
    labels.filterAllLabel,
  )
  const [sortOrder, setSortOrder] = useState<
    typeof labels.sortNewestLabel | typeof labels.sortOldestLabel
  >(labels.sortNewestLabel)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  const displayCategoriesTabs = useMemo(
    () => [labels.filterAllLabel, ...categories.map((category) => category.name)],
    [categories, labels.filterAllLabel],
  )

  const displayCategoriesDropdown = useMemo(
    () => categories.map((category) => category.name),
    [categories],
  )

  const filteredKnowledges = useMemo(() => {
    return initialKnowledges
      .filter((item) => {
        const matchSearch = item.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

        const matchDropdown = selectedCategoryDropdown
          ? item.category === selectedCategoryDropdown
          : true

        const matchTab =
          selectedCategoryTab !== labels.filterAllLabel
            ? item.category === selectedCategoryTab
            : true

        return matchSearch && matchDropdown && matchTab
      })
      .sort((a, b) => {
        const timeA = new Date(a.date || 0).getTime()
        const timeB = new Date(b.date || 0).getTime()
        return sortOrder === labels.sortNewestLabel ? timeB - timeA : timeA - timeB
      })
  }, [
    initialKnowledges,
    labels.filterAllLabel,
    labels.sortNewestLabel,
    searchQuery,
    selectedCategoryDropdown,
    selectedCategoryTab,
    sortOrder,
  ])

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative -mt-10 mb-16 flex justify-center z-20">
        <div className="flex w-full max-w-4xl flex-col md:flex-row items-center gap-2 md:gap-0 rounded-3xl md:rounded-full bg-white p-2 shadow-[0_12px_40px_rgba(13,42,22,0.1)]">
          <div className="flex flex-1 items-center px-6 py-3 w-full">
            <input
              type="text"
              placeholder={labels.searchPlaceholder}
              className="w-full bg-transparent text-garda-forest outline-none placeholder:text-garda-forest/40 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-garda-border" />

          <div className="relative flex items-center justify-between px-6 py-3 min-w-[200px] w-full md:w-auto border-t md:border-t-0 border-garda-border">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 text-garda-forest font-medium outline-none"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="size-5 text-garda-forest/50" />
                <span>
                  {selectedCategoryDropdown || labels.categoryFilterLabel}
                </span>
              </div>
              <ChevronDown
                className={`size-4 text-garda-forest/50 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full right-0 mt-4 w-full md:w-48 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-50">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-garda-mint-soft text-garda-forest font-medium"
                  onClick={() => {
                    setSelectedCategoryDropdown('')
                    setIsCategoryDropdownOpen(false)
                  }}
                >
                  {labels.filterAllLabel}
                </button>
                {displayCategoriesDropdown.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm hover:bg-garda-mint-soft text-garda-forest font-medium"
                    onClick={() => {
                      setSelectedCategoryDropdown(category)
                      setIsCategoryDropdownOpen(false)
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-garda-forest px-8 font-bold text-white transition-colors hover:bg-garda-forest-strong shadow-md"
          >
            <span>{labels.searchSubmitLabel}</span>
            <Search className="size-4" />
          </button>
        </div>
      </div>

      <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-garda-border/40 md:flex-row">
        <div className="flex flex-wrap items-center gap-8">
          {displayCategoriesTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedCategoryTab(tab)}
              className={`pb-4 text-base font-bold transition-all relative ${
                selectedCategoryTab === tab
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

        <div className="relative pb-4">
          <button
            type="button"
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center gap-3 rounded-full border border-garda-border bg-white px-6 py-2.5 text-sm font-semibold text-garda-forest shadow-sm transition-all hover:bg-garda-mint-soft"
          >
            <span>{sortOrder}</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-30 animate-in fade-in slide-in-from-top-2">
              {[labels.sortNewestLabel, labels.sortOldestLabel].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full px-5 py-3 text-left text-sm font-bold transition-colors ${
                    sortOrder === option
                      ? 'bg-garda-mint-soft text-garda-forest'
                      : 'text-garda-forest/60 hover:bg-garda-mint-soft/50'
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

      {filteredKnowledges.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredKnowledges.map((item) => {
            const imageUrl =
              item.coverImageUrl || 'https://placehold.co/600x900'
            const itemUrl = localizedPath(`/knowledge/${item.slug}`, locale)

            return (
              <a
                href={itemUrl}
                key={item.id}
                className="group relative flex aspect-2/3 w-full flex-col justify-end overflow-hidden rounded-xl bg-garda-forest shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              >
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/50" />

                <div className="relative z-10 flex flex-col p-8 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                  {item.category ? (
                    <span className="mb-3 text-sm font-bold tracking-wider uppercase text-[#FFC107]">
                      {item.category}
                    </span>
                  ) : null}
                  <h3 className="font-serif text-2xl leading-tight text-white md:text-3xl line-clamp-3">
                    {item.title}
                  </h3>
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <p className="rounded-2xl bg-white px-6 py-12 text-center text-lg font-medium text-garda-forest/70">
          {labels.emptyListMessage}
        </p>
      )}

      <div className="mt-16 flex items-center justify-between border-t border-garda-border/40 pt-8">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-bold text-garda-forest/40 hover:text-garda-forest transition-colors"
        >
          &lt; {labels.paginationPrevLabel}
        </button>
        <div className="flex items-center gap-6 text-sm font-bold text-garda-forest/40">
          <button type="button" className="text-garda-forest">
            1
          </button>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-bold text-garda-forest hover:text-garda-forest-strong transition-colors"
        >
          {labels.paginationNextLabel} &gt;
        </button>
      </div>
    </div>
  )
}
