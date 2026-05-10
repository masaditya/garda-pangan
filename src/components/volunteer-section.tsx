import { ChevronRight } from 'lucide-react'

export function VolunteerSection() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center lg:pb-48 lg:pt-56">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Title */}
        <h1 className="font-sans text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
          Jadi Pahlawan<br />Pangan Nyata
        </h1>
        
        {/* Description */}
        <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
          Dapatkan pengalaman berharga turun tangan langsung menjadi Food Heroes Garda Pangan untuk mengantarkan makanan kepada masyarakat pra-sejahtera di Surabaya.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center pt-4">
          <a 
            href="#" 
            className="group flex items-center gap-4 rounded-full bg-garda-forest px-8 py-4 font-bold text-white transition-all hover:bg-garda-forest-strong hover:scale-105 shadow-2xl"
          >
            <span className="text-lg">Daftar Sekarang</span>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#FFC107] text-garda-forest transition-transform group-hover:translate-x-1">
              <ChevronRight className="size-6" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
