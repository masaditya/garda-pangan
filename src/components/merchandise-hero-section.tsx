import type { MerchandisePageData } from '../routes/merchandise'

export function MerchandiseHeroSection({ data }: { data?: MerchandisePageData | null }) {
  const title = data?.heroTitle || 'Merchandise'
  const desc = data?.heroDescription || 'Yuk jadi bagian dari gaya hidup bebas sampah, sekaligus membantu kami mengirimkan semakin banyak makanan untuk masyarakat pra-sejahtera di kantong-kantong kemiskinan. Setiap pembelian menunjukkan komitmenmu mengurangi sampah makanan sekaligus membantu saudara kita yang mengalami kerawanan pangan.'

  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center gap-8 px-6 pb-28 pt-32 text-center sm:px-10 sm:pt-36 md:gap-10 lg:px-8 lg:pb-32 lg:pt-40">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="mx-auto max-w-4xl space-y-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
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
