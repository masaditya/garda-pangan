export function AboutHeroSection({ data }: { data?: any }) {
  const bgImage = data?.heroBackground?.url || '/'
  const title = data?.heroTitle || 'Tentang Kami'
  const subtitle = data?.heroSubtitle || 'Garda Pangan adalah food bank yang bertujuan menyelamatkan makanan berlebih berpotensi terbuang dari industri hospitality maupun F&B, serta mendistribusikannya kepada masyarakat pra-sejahtera.'

  return (
    <section
      role="banner"
      className="relative isolate min-h-screen overflow-hidden bg-garda-forest text-white"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,56,30,0.30)_0%,rgba(12,56,30,0.18)_34%,rgba(12,56,30,0.26)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.98)_100%)] sm:h-44" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end gap-8 px-6 pb-28 pt-32 sm:px-10 sm:pt-36 md:gap-10 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="max-w-4xl space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg text-white/90 sm:text-xl font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
