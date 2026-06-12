import { SectionShell } from './section-shell'
import { GardaButton } from './garda-button'

export function VolunteerHeroSection() {
  return (
    <section className="relative overflow-hidden bg-garda-forest text-white h-screen min-h-[600px]">
      {/* Background Image Placeholder using a gradient/overlay mask */}
      <div
        className="absolute inset-0 bg-[#0C381E] bg-cover bg-center bg-no-repeat mix-blend-multiply opacity-80"
        style={{ backgroundImage: "url('/garda-hero-reference.png')" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />

      <SectionShell
        spacing="hero"
        className="relative z-10 flex h-full flex-col items-center justify-center text-center"
      >
        <div className="max-w-4xl space-y-8 flex flex-col items-center">
          <h1 className="text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl leading-tight">
            Jadi Pahlawan
            <br /> Pangan Nyata
          </h1>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-lg">
            Dapatkan pengalaman berharga turun tangan langsung menjadi Food
            Heroes Garda Pangan untuk mengantarkan makanan kepada masyarakat
            pra-sejahtera di Surabaya.
          </p>
          <div className="pt-4">
            <GardaButton href="/daftar-relawan" variant="hero">
              Daftar Sekarang
            </GardaButton>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}
