import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'
import type { ProgramDetailButton } from '#/lib/strapi/programs'
import { ProgramDetailModal } from './program-detail-modal'

export type ProgramListItem = {
  title: string
  description: string
  image?: string | null
  buttons?: ProgramDetailButton[]
}

type ProgramListSectionProps = {
  title: string
  description: string
  backgroundImage?: string | null
  programs: ProgramListItem[]
  moreLabel: string
}

function getImageUrl(image?: string | null) {
  return normalizeStrapiMediaUrl(image) || '/images/food-rescue-fallback.jpg'
}

export function ProgramListSection({
  title,
  description,
  backgroundImage,
  programs,
  moreLabel,
}: ProgramListSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [previewTop, setPreviewTop] = useState<number | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<ProgramListItem | null>(
    null,
  )
  const listContainerRef = useRef<HTMLDivElement>(null)

  const bgUrl =
    normalizeStrapiMediaUrl(backgroundImage) ||
    '/images/hero-program-fallback.jpg'
  const titleLines = title.split(/<br\s*\/?>|\\n|\n/i)
  const hoveredProgram =
    hoveredIndex !== null ? programs[hoveredIndex] : null

  const updatePreviewPosition = (element: HTMLElement) => {
    const container = listContainerRef.current
    if (!container) {
      return
    }

    const itemRect = element.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    setPreviewTop(itemRect.top - containerRect.top + itemRect.height / 2)
  }

  const clearHover = () => {
    setHoveredIndex(null)
    setPreviewTop(null)
  }

  return (
    <>
      <section
        role="banner"
        data-testid="program-list-section"
        className="relative isolate min-h-screen overflow-hidden rounded-b-xl bg-garda-forest lg:rounded-b-2xl"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundColor: '#334155',
          }}
        />
        <div className="absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-garda-forest/40 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-64 bg-linear-to-t from-garda-forest/60 to-transparent backdrop-blur-lg [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="absolute inset-0 bg-garda-forest/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

        <div
          data-testid="program-hero-content"
          className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:px-12 md:px-16 lg:px-8"
        >
          <div className="flex flex-col items-end justify-between gap-8 md:flex-row">
            <h1 className="font-serif w-full max-w-[900px] text-[clamp(3rem,10vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-white md:w-3/5">
              {titleLines.map((line, index) => (
                <span key={index} className="block font-serif">
                  {line.trim()}
                </span>
              ))}
            </h1>
            <div className="flex w-full justify-end md:w-2/5">
              <p className="max-w-[420px] text-base font-medium leading-relaxed text-white/95 sm:text-lg md:text-right lg:text-xl">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-8 md:px-12 lg:px-8 lg:pb-20">
          <div ref={listContainerRef} className="relative">
            {hoveredProgram && previewTop !== null ? (
              <div
                data-testid="program-hover-preview"
                style={{ top: previewTop }}
                className="pointer-events-none absolute right-0 z-20 hidden w-[min(42vw,320px)] -translate-y-1/2 opacity-100 transition-[opacity,top] duration-300 lg:block xl:right-[8%] xl:w-[360px]"
                aria-hidden="true"
              >
                <div className="rotate-[12deg] overflow-hidden rounded-2xl border-4 border-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <img
                    src={getImageUrl(hoveredProgram.image)}
                    alt=""
                    className="aspect-4/3 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            <ul className="flex flex-col" role="list">
              {programs.map((program, index) => {
                const isHovered = hoveredIndex === index

                return (
                  <li key={`${program.title}-${index}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedProgram(program)}
                      onMouseEnter={(event) => {
                        setHoveredIndex(index)
                        updatePreviewPosition(event.currentTarget)
                      }}
                      onMouseLeave={clearHover}
                      onFocus={(event) => {
                        setHoveredIndex(index)
                        updatePreviewPosition(event.currentTarget)
                      }}
                      onBlur={clearHover}
                      className="group relative flex w-full items-center justify-between gap-4 border-b border-white/10 px-2 py-4 text-left transition-colors duration-300 sm:gap-6 sm:px-4 sm:py-5 md:py-6"
                    >
                      <span
                        className={`absolute inset-y-0 left-0 w-1 bg-garda-sun transition-transform duration-300 ${
                          isHovered ? 'scale-y-100' : 'scale-y-0'
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`absolute inset-0 bg-garda-forest/70 transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden="true"
                      />

                      <span
                        className={`relative z-10 font-serif text-[clamp(1.125rem,3.5vw,2.25rem)] uppercase leading-[1.15] tracking-[-0.02em] transition-colors duration-300 ${
                          isHovered ? 'text-garda-sun' : 'text-white'
                        }`}
                      >
                        {program.title}
                      </span>

                      <span
                        className={`relative z-10 flex shrink-0 items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 sm:gap-2 sm:text-xs ${
                          isHovered ? 'text-garda-sun' : 'text-garda-sun/80'
                        }`}
                      >
                        <span className="hidden sm:inline">{moreLabel}</span>
                        <ArrowUpRight
                          className="size-4 sm:size-5"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <ProgramDetailModal
        isOpen={selectedProgram !== null}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title ?? ''}
        description={selectedProgram?.description ?? ''}
        image={selectedProgram?.image}
        buttons={selectedProgram?.buttons}
      />
    </>
  )
}
