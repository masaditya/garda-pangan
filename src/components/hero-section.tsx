import { GardaButton } from './garda-button'

export function HeroSection() {
  return (
    <section
      role="banner"
      className="relative isolate min-h-screen overflow-hidden bg-garda-forest"
    >
      <div className="absolute inset-0 bg-[url('/garda-hero-reference.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,56,30,0.30)_0%,rgba(12,56,30,0.18)_34%,rgba(12,56,30,0.26)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.98)_100%)] sm:h-44" />

      <div
        data-testid="hero-content"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-6 pb-28 pt-32 text-center sm:px-10 sm:pt-36 md:gap-10 lg:px-16 lg:pb-32 lg:pt-40"
      >
        <h1 className="max-w-[1084px] text-balance font-sans text-[clamp(4rem,8vw,6.875rem)] font-black uppercase leading-[0.92] tracking-[-0.06em] text-white">
          ONE STOP FOOD LOSS &amp; WASTE SOLUTION
        </h1>
        <div className="flex justify-center">
          <GardaButton href="/tentang-kami" variant="hero">
            Pelajari Selengkapnya
          </GardaButton>
        </div>
      </div>
    </section>
  )
}
