import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

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

export function BeneficiarySection({ data }: { data?: any }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const title = data?.heroTitle || 'Penerima Bantuan'
  const description = data?.heroDescription || 'Penerima manfaat (beneficiaries) utama dari distribusi makanan Garda Pangan adalah masyarakat pra-sejahtera di Surabaya, yang telah dipilih dengan cermat serta disurvei agar bantuan yang diberikan tepat sasaran. Kategori penerima diantaranya berasal dari kaum dhuafa, yatim piatu, janda, lansia, difabel, pengungsi, dan anak jalanan.'
  const buttonLabel = data?.testimonialButtonLabel || 'Tonton Testimoni'
  const videoUrl = data?.heroVideoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  const videoId = getYoutubeId(videoUrl)
  
  const bgImage = normalizeStrapiMediaUrl(data?.heroBackground?.url) || '/garda-hero-reference.png'

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center isolate">
        {/* Background Image or Video */}
        {!isPlaying ? (
          <div
            className="absolute inset-0 -z-20 bg-cover bg-fixed bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        ) : videoId ? (
          <div className="absolute inset-0 -z-20 bg-black animate-in fade-in duration-1000">
            <iframe
              className="h-full w-full object-cover"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0`}
              title="Beneficiary Testimonial Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}

        {/* Overlays */}
        {!isPlaying && (
          <>
            <div className="absolute inset-0 -z-10 bg-[#0C381E]/80 mix-blend-multiply transition-opacity duration-700" />
            <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-linear-to-b from-[#0C381E]/60 to-transparent" />
          </>
        )}

        {/* Close Button when playing */}
        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-28 right-6 sm:right-10 lg:right-16 z-50 flex size-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/70 border border-white/20 shadow-xl"
          >
            <X className="size-6" />
          </button>
        )}

        {/* Hero Content */}
        <div className={`relative z-10 mx-auto max-w-4xl space-y-8 pt-20 transition-all duration-700 ${isPlaying ? 'opacity-0 scale-95 pointer-events-none translate-y-8' : 'opacity-100 scale-100 translate-y-0'}`}>
          <h1 className="font-sans text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
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
      <section id="testimoni" className="relative mt-20 px-6 pb-48 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="mb-8 break-inside-avoid rounded-3xl bg-white p-8 shadow-[0_12px_50px_rgba(0,0,0,0.06)] ring-1 ring-garda-border/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
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
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
