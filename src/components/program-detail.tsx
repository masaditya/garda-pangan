import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { GardaButton } from './garda-button'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

export type ProgramDetailButton = {
  text: string
  href: string
  variant?: 'primary' | 'subtle'
}

type ProgramDetailProps = {
  title: string
  description: string
  image?: string | null
  buttons?: ProgramDetailButton[]
  reverse?: boolean
}

function isMoreDetailsButton(button: ProgramDetailButton) {
  return button.text.toLowerCase().includes('selengkapnya')
}

function getPreviewDescription(html: string) {
  const firstParagraph = html.match(/<p>[\s\S]*?<\/p>/i)?.[0]
  return firstParagraph ?? html
}

export function ProgramDetail({
  title,
  description,
  image,
  buttons = [],
  reverse = false,
}: ProgramDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const imageUrl =
    normalizeStrapiMediaUrl(image) || '/images/food-rescue-fallback.jpg'
  const previewDescription = getPreviewDescription(description)
  const modalButtons = buttons.filter((button) => !isMoreDetailsButton(button))
  const moreButton = buttons.find(isMoreDetailsButton)
  const modalTitleId = `program-modal-title-${title.replace(/\s+/g, '-')}`

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    modalRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const modal =
    isModalOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
        role="presentation"
      >
        <div
          className="absolute inset-0"
          aria-hidden="true"
          onClick={closeModal}
        />
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          tabIndex={-1}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#f8fdf9] shadow-2xl animate-in fade-in zoom-in duration-300 focus:outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-full bg-white/80 text-garda-forest shadow-sm backdrop-blur-md transition-colors hover:bg-white focus:outline-none"
            aria-label="Tutup"
          >
            <X className="size-5" />
          </button>

          <div className="relative flex flex-col items-center px-6 py-12 sm:px-12 md:py-16 lg:px-20">
            <img
              src="/decorative-top.png"
              alt=""
              className="pointer-events-none absolute left-0 top-0 z-0 w-48 object-contain opacity-90 sm:w-64 md:w-80"
            />
            <img
              src="/decorative-bottom.png"
              alt=""
              className="pointer-events-none absolute bottom-0 right-0 z-0 w-48 object-contain opacity-90 sm:w-64 md:w-80"
            />

            <div className="relative z-10 flex w-full flex-col items-center">
              <div className="relative mb-10 aspect-4/3 w-full max-w-2xl overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ backgroundColor: '#e2e8f0' }}
                />
              </div>

              <h2
                id={modalTitleId}
                className="mb-8 max-w-3xl text-center font-sans text-3xl font-black uppercase leading-[1.15] tracking-[-0.02em] text-garda-forest sm:text-4xl md:text-[2.75rem]"
              >
                {title}
              </h2>

              <div
                className="prose prose-garda prose-lg mb-12 max-w-3xl text-left leading-relaxed text-garda-forest/80"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {modalButtons.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {modalButtons.map((btn, index) => (
                    <GardaButton
                      key={index}
                      href={btn.href}
                      variant={btn.variant || 'primary'}
                    >
                      {btn.text}
                    </GardaButton>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-0 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-garda-mint-soft px-6 py-10 sm:px-10 md:py-14 lg:px-14">
          <div className="absolute left-0 top-0 -z-10 h-full w-full opacity-40">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-garda-mint blur-3xl mix-blend-multiply" />
            <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/3 rounded-full bg-garda-mint blur-3xl mix-blend-multiply" />
          </div>

          <div
            data-testid="program-detail-content"
            className={`relative z-10 flex flex-col gap-10 md:gap-14 lg:items-center ${
              reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
            }`}
          >
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl md:aspect-5/4 lg:aspect-4/3">
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ backgroundColor: '#e2e8f0' }}
                />
              </div>
            </div>

            <div className="flex w-full flex-col justify-center gap-6 lg:w-1/2">
              <h2 className="font-sans text-3xl font-black uppercase leading-[1.1] tracking-[-0.02em] text-garda-forest sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
              <div
                className="prose prose-garda max-w-none text-base text-garda-forest/80"
                dangerouslySetInnerHTML={{ __html: previewDescription }}
              />

              {(moreButton || modalButtons.length > 0) && (
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {moreButton ? (
                    <GardaButton
                      href=""
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      variant={moreButton.variant || 'subtle'}
                    >
                      {moreButton.text}
                    </GardaButton>
                  ) : null}
                  {modalButtons.map((btn, index) => (
                    <GardaButton
                      key={index}
                      href={btn.href}
                      variant={btn.variant || 'primary'}
                    >
                      {btn.text}
                    </GardaButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {modal}
    </>
  )
}
