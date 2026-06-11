import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { GardaButton } from './garda-button'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'
import type { ProgramDetailButton } from '#/lib/strapi/programs'

type ProgramDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  image?: string | null
  buttons?: ProgramDetailButton[]
}

function isMoreDetailsButton(button: ProgramDetailButton) {
  return button.text.toLowerCase().includes('selengkapnya')
}

export function ProgramDetailModal({
  isOpen,
  onClose,
  title,
  description,
  image,
  buttons = [],
}: ProgramDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const imageUrl =
    normalizeStrapiMediaUrl(image) || '/images/food-rescue-fallback.jpg'
  const modalButtons = buttons.filter((button) => !isMoreDetailsButton(button))
  const modalTitleId = `program-modal-title-${title.replace(/\s+/g, '-')}`

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    modalRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
      role="presentation"
    >
      <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />
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
          onClick={onClose}
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
              className="mb-8 max-w-3xl text-center font-serif text-3xl font-black uppercase leading-[1.15] tracking-[-0.02em] text-garda-forest sm:text-4xl md:text-[2.75rem]"
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
}
