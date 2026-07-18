import { useState } from 'react'
import { GardaButton } from './garda-button'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'
import type { ProgramDetailButton } from '#/lib/strapi/programs'
import { ProgramDetailModal } from './program-detail-modal'

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

  const imageUrl =
    normalizeStrapiMediaUrl(image) || '/images/food-rescue-fallback.jpg'
  const previewDescription = getPreviewDescription(description)
  const modalButtons = buttons.filter((button) => !isMoreDetailsButton(button))
  const moreButton = buttons.find(isMoreDetailsButton)

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
                  decoding="async"
                  style={{ backgroundColor: '#e2e8f0' }}
                />
              </div>
            </div>

            <div className="flex w-full flex-col justify-center gap-6 lg:w-1/2">
              <h2 className="font-serif text-3xl uppercase leading-[1.1] tracking-[-0.02em] text-garda-forest sm:text-4xl lg:text-[2.75rem]">
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

      <ProgramDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        image={image}
        buttons={buttons}
      />
    </>
  )
}
