import { useState } from 'react'
import { EventShareButtons } from './event-share-buttons'

export type KnowledgeDetailProps = {
  title: string
  authorName: string
  date: string
  images: string[]
  tags: string[]
  parsedContent: string
  articleUrl: string
  caption?: string
}

export function KnowledgeDetail({
  title,
  authorName,
  date,
  images,
  tags,
  parsedContent,
  articleUrl,
  caption,
}: KnowledgeDetailProps) {
  const galleryImages =
    images.length > 0 ? images : ['https://placehold.co/1200x600']
  const [activeIndex, setActiveIndex] = useState(0)
  const currentImage = galleryImages[activeIndex] ?? galleryImages[0]
  const hasMultipleImages = galleryImages.length > 1

  const goToPrevious = () => {
    setActiveIndex((index) =>
      index === 0 ? galleryImages.length - 1 : index - 1,
    )
  }

  const goToNext = () => {
    setActiveIndex((index) =>
      index === galleryImages.length - 1 ? 0 : index + 1,
    )
  }

  return (
    <>
      <section className="relative bg-[#052E16] px-6 pb-0 pt-40 text-center text-white sm:pt-44 lg:pt-48">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <h1 className="mb-8 max-w-4xl font-serif text-3xl leading-tight tracking-tight md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <svg
                className="h-6 w-6 text-white/50"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center text-left">
              <p className="mb-1 text-sm font-semibold leading-none">
                {authorName}
              </p>
              <p className="text-xs leading-none text-white/60">{date}</p>
            </div>
          </div>
        </div>
        <hr className="mx-auto my-6 max-w-7xl border-white/20" />
        <div className="mx-auto mb-6 flex max-w-7xl flex-col items-center justify-between gap-4 px-2 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-garda-forest shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <EventShareButtons url={articleUrl} title={title} />
        </div>
        <div className="group relative mx-auto mb-4 aspect-21/9 w-full max-w-7xl overflow-hidden bg-gray-100 shadow-xl">
          <img
            src={currentImage}
            alt={title}
            className="h-full w-full object-cover"
          />

          {hasMultipleImages ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-between px-6 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={goToPrevious}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-garda-forest shadow-sm hover:bg-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Sebelumnya
              </button>

              <div className="pointer-events-auto flex items-center gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Gambar ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-garda-forest shadow-sm hover:bg-white"
              >
                Selanjutnya
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 lg:px-8">
        <p className="text-right text-[0.8rem] italic text-gray-400">
          {caption || 'Image courtesy of Garda Pangan'}
        </p>

        <hr className="mx-auto my-6 max-w-7xl border-black/10" />

        <div className="mx-auto max-w-[800px]">
          <div
            className="prose prose-garda prose-lg max-w-none font-serif text-gray-700 prose-headings:font-serif prose-headings:font-normal prose-headings:text-garda-forest prose-p:font-serif prose-a:text-garda-forest prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>
      </section>
    </>
  )
}
