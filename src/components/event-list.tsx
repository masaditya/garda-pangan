import { useState, useMemo } from 'react'
import {
  CalendarDays,
  Search,
  Share2,
  FolderOpen,
  ChevronDown,
} from 'lucide-react'

import type { StrapiMedia } from '../lib/strapi/types'

export type EventItem = {
  id: number
  documentId: string
  title: string
  slug: string
  date: string
  summary: string
  location?: string
  eventTag?: string
  content?: string
  coverImage?: StrapiMedia
}

type EventListProps = {
  initialEvents: EventItem[]
}

export function EventList({ initialEvents }: EventListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)

  const years = useMemo(() => {
    const allYears = initialEvents.map((event) =>
      new Date(event.date).getFullYear().toString(),
    )
    return Array.from(new Set(allYears)).sort((a, b) => b.localeCompare(a)) // descending
  }, [initialEvents])

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const eventYear = new Date(event.date).getFullYear().toString()
      const matchYear = selectedYear ? eventYear === selectedYear : true
      return matchSearch && matchYear
    })
  }, [initialEvents, searchQuery, selectedYear])

  const handleShare = async (title: string, url: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        alert('Tautan disalin ke clipboard!')
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Floating Search Bar */}
      <div className="relative -mt-10 mb-16 flex justify-center z-20">
        <div className="flex w-full max-w-4xl flex-col md:flex-row items-center gap-2 md:gap-0 rounded-3xl md:rounded-full bg-white p-2 shadow-[0_12px_40px_rgba(13,42,22,0.1)]">
          <div className="flex flex-1 items-center px-6 py-3 w-full">
            <input
              type="text"
              placeholder="Cari nama events"
              className="w-full bg-transparent text-garda-forest outline-none placeholder:text-garda-forest/40 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-garda-border" />

          {/* Custom Year Dropdown */}
          <div className="relative flex items-center justify-between px-6 py-3 min-w-[200px] w-full md:w-auto border-t md:border-t-0 border-garda-border">
            <button
              className="flex w-full items-center justify-between gap-3 text-garda-forest font-medium outline-none"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="size-5 text-garda-forest/50" />
                <span>{selectedYear || 'Filter Tahun'}</span>
              </div>
              <ChevronDown
                className={`size-4 text-garda-forest/50 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isYearDropdownOpen && (
              <div className="absolute top-full right-0 mt-4 w-full md:w-48 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-50">
                <button
                  className="w-full px-4 py-3 text-left text-sm hover:bg-garda-mint-soft text-garda-forest font-medium"
                  onClick={() => {
                    setSelectedYear('')
                    setIsYearDropdownOpen(false)
                  }}
                >
                  Semua Tahun
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-garda-mint-soft text-garda-forest font-medium"
                    onClick={() => {
                      setSelectedYear(year)
                      setIsYearDropdownOpen(false)
                    }}
                  >
                    {year}
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

      {/* Background Watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <h2 className="font-sans text-[clamp(6rem,20vw,18rem)] uppercase tracking-tighter text-garda-forest whitespace-nowrap">
          GardaPangan
        </h2>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => {
            const imageUrl =
              event?.coverImage?.url || 'https://placehold.co/600x400'
            const dateObj = new Date(event.date)
            const formattedDate = new Intl.DateTimeFormat('id-ID', {
              month: 'short',
              year: 'numeric',
            }).format(dateObj)
            console.log(event.slug)
            const eventUrl = `/event/${event.slug}`

            return (
              <a
                href={eventUrl}
                key={event.id}
                className="group relative flex flex-col overflow-hidden rounded-4xl border border-garda-border/40 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                {/* Header Row (Badge + Share) */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-[#EAF5EF] px-4 py-2 text-sm font-semibold text-garda-forest">
                    <FolderOpen className="size-4" />
                    <span>{event.eventTag || 'Event XXX'}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleShare(event.title, eventUrl)
                    }}
                    className="flex size-10 items-center justify-center rounded-full bg-[#0D2A16] text-white transition-transform hover:scale-110 shadow-sm"
                    aria-label="Share Event"
                  >
                    <Share2 className="size-4" />
                  </button>
                </div>

                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-garda-mint-soft">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col pt-6 pb-2">
                  <div className="mb-4 inline-flex items-center self-start gap-2 rounded-full bg-[#EAF5EF] px-4 py-2 text-sm font-semibold text-garda-forest">
                    <CalendarDays className="size-4" />
                    <span className="capitalize">{formattedDate}</span>
                  </div>

                  <h3 className="mb-3 font-sans text-2xl leading-tight text-[#111827] line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-[#4B5563] line-clamp-3 leading-relaxed text-[0.95rem]">
                    {event.summary}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-garda-mint-soft text-garda-forest/50">
            <Search className="size-8" />
          </div>
          <h3 className="mb-2 text-2xl text-garda-forest">
            Tidak ada event ditemukan
          </h3>
          <p className="text-garda-forest/70">
            Silakan coba kata kunci atau filter tahun yang berbeda.
          </p>
        </div>
      )}
    </div>
  )
}
