import { useState } from 'react'
import { Play, X } from 'lucide-react'

import { getMessages, type Locale } from '#/lib/i18n'

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

type Testimonial = {
  id: number
  text: string
  name: string
  location: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Waktu suami saya kena PHK, kami benar-benar kesulitan makan. Garda Pangan datang dengan paket makanan yang cukup untuk seminggu. Anak-anak saya bisa makan dengan layak. Terima kasih dari lubuk hati kami.",
    name: "Siti Rahayu",
    location: "Semampir, Surabaya",
    initials: "SR"
  },
  {
    id: 2,
    text: "Saya ibu tunggal dengan tiga anak. Garda Pangan bantu kami saat beras di rumah habis dan gajian masih lama. Rasanya rapat dan petugasnya sangat ramah. Tidak ada yang bikin malu, mereka sangat menghormati kami.",
    name: "Dewi Wahyuni",
    location: "Tambak Rejo, Surabaya",
    initials: "DW"
  },
  {
    id: 3,
    text: "Saya lansia, hidup sendiri, dan tidak punya penghasilan tetap. Tiap minggu relawan Garda Pangan antar makanan ke rumah. Mereka tidak hanya bawa makanan, tapi juga ngobrol dan peduli sama saya.",
    name: "Bapak Ponimin",
    location: "Wonokromo, Surabaya",
    initials: "BP"
  },
  {
    id: 4,
    text: "Waktu suami saya kena PHK, kami benar-benar kesulitan makan. Garda Pangan datang dengan paket makanan yang cukup untuk seminggu. Anak-anak saya bisa makan dengan layak. Terima kasih dari lubuk hati kami.",
    name: "Siti Rahayu",
    location: "Semampir, Surabaya",
    initials: "SR"
  },
  {
    id: 5,
    text: "Saya ibu tunggal dengan tiga anak. Garda Pangan bantu kami saat beras di rumah habis dan gajian masih lama. Rasanya rapat dan petugasnya sangat ramah. Tidak ada yang bikin malu, mereka sangat menghormati kami.",
    name: "Dewi Wahyuni",
    location: "Tambak Rejo, Surabaya",
    initials: "DW"
  },
  {
    id: 6,
    text: "Waktu suami saya kena PHK, kami benar-benar kesulitan makan. Garda Pangan datang dengan paket makanan yang cukup untuk seminggu. Anak-anak saya bisa makan dengan layak. Terima kasih dari lubuk hati kami.",
    name: "Siti Rahayu",
    location: "Semampir, Surabaya",
    initials: "SR"
  }
]

export function BeneficiarySection({
  data,
  locale = 'id',
}: {
  data?: any
  locale?: Locale
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const messages = getMessages(locale)

  const title = data?.heroTitle || (locale === 'en' ? 'Beneficiaries' : 'Penerima Bantuan')
  const description =
    data?.heroDescription ||
    (locale === 'en'
      ? 'Primary beneficiaries of Garda Pangan food distribution are underserved communities in Surabaya, carefully selected and surveyed so aid reaches the right people.'
      : 'Penerima manfaat (beneficiaries) utama dari distribusi makanan Garda Pangan adalah masyarakat pra-sejahtera di Surabaya, yang telah dipilih dengan cermat serta disurvei agar bantuan yang diberikan tepat sasaran. Kategori penerima diantaranya berasal dari kaum dhuafa, yatim piatu, janda, lansia, difabel, pengungsi, dan anak jalanan.')
  const buttonLabel =
    data?.testimonialButtonLabel || messages.penerima.watchTestimonial
  const videoUrl = data?.heroVideoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  const videoId = getYoutubeId(videoUrl)

  return (
    <div className="relative w-full">
      {/* Hero Content Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        {/* Video Overlay */}
        {isPlaying && videoId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in duration-500">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
            >
              <X className="size-6" />
            </button>
            <div className="relative aspect-video w-full max-w-6xl shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full rounded-2xl"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Beneficiary Testimonial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className={`mx-auto max-w-4xl space-y-8 pt-20 transition-all duration-700 ${isPlaying ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <h1 className="font-serif text-6xl tracking-tight text-white sm:text-7xl lg:text-8xl">
            {title.split(' ').map((word: string, i: number) => (
              <span key={i}>
                {word}
                {i === 0 && <br />}
                {i !== 0 && ' '}
              </span>
            ))}
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-3 rounded-full bg-garda-forest px-6 py-4 font-bold text-white transition-all hover:bg-garda-forest-strong hover:scale-105 shadow-xl"
            >
              <span className="text-lg">{buttonLabel}</span>
              <div className="flex size-10 items-center justify-center rounded-full bg-[#FFC107] text-garda-forest shadow-inner">
                <Play className="ml-0.5 size-5 fill-current" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Masonry Section */}
      <section id="testimoni" className="relative mt-20 px-6 pb-64 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Column 1 */}
            <div className="flex flex-col gap-8 lg:pt-24">
              {testimonials.filter((_, i) => i % 3 === 0).map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
            
            {/* Column 2 (Middle - Offset higher) */}
            <div className="flex flex-col gap-8">
              {testimonials.filter((_, i) => i % 3 === 1).map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8 lg:pt-24">
              {testimonials.filter((_, i) => i % 3 === 2).map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Blur Effect */}
        <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none z-20">
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-transparent backdrop-blur-[2px]" />
        </div>
      </section>
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div 
      className="break-inside-avoid rounded-3xl bg-white p-8 shadow-[0_12px_50px_rgba(0,0,0,0.06)] ring-1 ring-garda-border/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
    >
      <p className="mb-10 text-base font-medium leading-relaxed text-garda-forest/80 italic">
        "{t.text}"
      </p>
      <div className="flex items-center gap-4 border-t border-garda-border/10 pt-6">
        <div className="flex size-14 items-center justify-center rounded-full bg-garda-mint-soft text-base font-bold text-garda-forest shadow-sm">
          {t.initials}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-black text-garda-forest">{t.name}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-garda-forest/40">{t.location}</span>
        </div>
      </div>
    </div>
  )
}
