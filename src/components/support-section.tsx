import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

type SupportSectionProps = {
  titleLine1: string
  titleLine2: string
  description: string
  qrisImageSrc: string
}

export function SupportSection({
  titleLine1,
  titleLine2,
  description,
  qrisImageSrc,
}: SupportSectionProps) {
  console.log(qrisImageSrc, description)
  const qrisUrl = normalizeStrapiMediaUrl(qrisImageSrc)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center lg:pb-48 lg:pt-56">
      <div className="mx-auto max-w-4xl space-y-12">
        <h1 className="font-serif text-6xl tracking-tight text-white sm:text-7xl lg:text-8xl">
          {titleLine1}
          <br />
          {titleLine2}
        </h1>

        <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
          {description}
        </p>

        <div className="mx-auto mt-12 w-full max-w-sm overflow-hidden rounded-[40px] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col items-center gap-4">
            <img
              src={qrisUrl ?? qrisImageSrc}
              alt="QRIS"
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
