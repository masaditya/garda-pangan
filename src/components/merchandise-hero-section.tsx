import type { MerchandisePage } from '#/lib/strapi/pages'
import { getMessages, type Locale } from '#/lib/i18n'

export function MerchandiseHeroSection({
  data,
  locale = 'id',
}: {
  data?: MerchandisePage | null
  locale?: Locale
}) {
  const messages = getMessages(locale)
  const title = data?.heroTitle || messages.merchandise.heroTitle
  const desc = data?.heroDescription || messages.merchandise.heroDescription

  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center gap-8 px-6 pb-28 pt-32 text-center sm:px-10 sm:pt-36 md:gap-10 lg:px-8 lg:pb-32 lg:pt-40">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="mx-auto max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-lg">
            {desc}
          </p>
        </div>
      </div>
    </section>
  )
}
