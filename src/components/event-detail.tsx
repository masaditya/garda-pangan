import { EventShareButtons } from './event-share-buttons'

export type EventDetailProps = {
  title: string
  date: string
  imageUrl: string
  tags: string[]
  parsedContent: string
  eventUrl: string
  caption?: string
}

export function EventDetail({
  title,
  date,
  imageUrl,
  tags,
  parsedContent,
  eventUrl,
  caption,
}: EventDetailProps) {
  return (
    <>
      {/* Dark Green Hero Section */}
      <section className="relative bg-[#052E16] px-6 pb-0 pt-32 text-center text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <h1 className="mb-8 max-w-4xl font-sans text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <svg
                className="h-6 w-6 text-white/50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center text-left">
              <p className="mb-1 text-sm font-semibold leading-none">Admin</p>
              <p className="text-xs leading-none text-white/60">{date}</p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white/20 max-w-7xl mx-auto" />
        <div className="mb-6 flex flex-col items-center justify-between gap-4 px-2 sm:flex-row max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-garda-forest shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <EventShareButtons url={eventUrl} title={title} />
        </div>
        <div className="group relative mb-4 w-full overflow-hidden bg-gray-100 shadow-xl aspect-21/9 max-w-7xl mx-auto">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />

          {/* Placeholder for Carousel Controls (Visual only as per mockup for single image) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-between px-6 opacity-0 transition-opacity group-hover:opacity-100">
            <button className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-garda-forest shadow-sm hover:bg-white">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

            {/* Dots */}
            <div className="pointer-events-auto flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
            </div>

            <button className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-garda-forest shadow-sm hover:bg-white">
              Selanjutnya
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        </div>
      </section>

      {/* Main Content Overlapping Hero */}
      <section className="relative z-10 mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 lg:px-8">
        {/* Badges and Share Row */}


        {/* Hero Image / Carousel placeholder */}
        {/* Caption */}
        <p className="text-right text-[0.8rem] italic text-gray-400">
          {caption || 'Image courtesy of Garda Pangan'}
        </p>

        <hr className="my-6 border-black/10 max-w-7xl mx-auto" />

        {/* Markdown Content */}
        <div className="mx-auto max-w-[800px]">
          <div
            className="prose prose-garda prose-lg max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-garda-forest prose-a:text-garda-forest prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>
      </section>
    </>
  )
}
