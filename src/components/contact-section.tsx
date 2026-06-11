import { ArrowRight } from 'lucide-react'

export interface ContactCategory {
  id: string
  title: string
  description: string
  buttonLabel: string
  buttonLink: string
  illustrationUrl: string
}

const contactCategories: ContactCategory[] = [
  {
    id: '1',
    title: 'DUKUNG KAMI DENGAN DONASI DANA',
    description: 'Dukung operasional kami agar kami bisa menyelamatkan makanan lebih banyak lagi untuk saudara kita yang membutuhkan.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/donation.svg'
  },
  {
    id: '2',
    title: 'BERGABUNG MENJADI KLIEN PENGOLAHAN SAMPAH ORGANIK',
    description: 'Kami mengolah sampah organik dari bisnis kuliner Anda menjadi produk bernilai guna dan mencegahnya berakhir di TPA.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/organic.svg'
  },
  {
    id: '3',
    title: 'KUNJUNGAN',
    description: 'Ingin melihat langsung bagaimana kami bekerja? Kami menerima kunjungan untuk edukasi dan berbagi pengalaman.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/visit.svg'
  },
  {
    id: '4',
    title: 'BOOK JADWAL FOOD RESCUE',
    description: 'Punya makanan berlebih dari acara Anda? Hubungi kami untuk menjemput dan mendistribusikannya.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/rescue.svg'
  },
  {
    id: '5',
    title: 'KOLABORASI CSR',
    description: 'Wujudkan dampak sosial perusahaan Anda melalui program kolaborasi yang berkelanjutan bersama Garda Pangan.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/csr.svg'
  },
  {
    id: '6',
    title: 'PERMINTAAN SPEAKER/ JURI/NARASUMBER/ KULIAH TAMU',
    description: 'Kami senang berbagi pengetahuan tentang isu food loss dan waste di berbagai forum edukatif.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/speaker.svg'
  },
  {
    id: '7',
    title: 'PERMINTAAN LIPUTAN MEDIA',
    description: 'Untuk keperluan peliputan, wawancara, atau informasi seputar isu ketahanan pangan dan food waste.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/media.svg'
  },
  {
    id: '8',
    title: 'PERMINTAAN SKRIPSI/ TESIS/RISET',
    description: 'Kami mendukung penelitian akademis yang sejalan dengan misi kami dalam mengurangi sampah makanan.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/research.svg'
  },
  {
    id: '9',
    title: 'PERMOHONAN MAGANG',
    description: 'Dapatkan pengalaman berharga dengan bergabung sebagai bagian dari tim Garda Pangan.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/intern.svg'
  },
  {
    id: '10',
    title: 'PERMINTAAN PERHITUNGAN SUSUT, SISA, DAN SAMPAH MAKANAN',
    description: 'Kami membantu bisnis kuliner Anda menghitung dan menganalisis potensi kerugian dari sampah makanan.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/audit.svg'
  },
  {
    id: '11',
    title: 'PERMINTAAN KEBUTUHAN LAINNYA',
    description: 'Punya ide kolaborasi lain atau pertanyaan umum? Silakan hubungi kami di sini.',
    buttonLabel: 'Hubungi Kami',
    buttonLink: '#',
    illustrationUrl: '/illustrations/other.svg'
  }
]

export function ContactSection() {
  return (
    <div className="relative w-full">
      {/* Hero Content Section */}
      <section className="relative flex min-h-[85vh] flex-col items-start justify-center px-6 text-left">
        <div className="mx-auto w-full max-w-7xl space-y-6 pt-20">
          <h1 className="font-serif text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
            Hubungi<br />Kami
          </h1>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            Ada pertanyaan atau ingin berkolaborasi? Kami senang mendengar dari Anda. Pilih kategori yang sesuai dengan kebutuhan Anda di bawah ini.
          </p>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="relative px-6 pb-48 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {contactCategories.map((cat) => (
              <div 
                key={cat.id} 
                className="mb-6 break-inside-avoid flex flex-col items-start rounded-3xl bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] ring-1 ring-garda-border/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
              >
                {/* Illustration Placeholder */}
                <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-2xl bg-garda-mint-soft/30 overflow-hidden">
                   <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="size-16 rounded-full border-2 border-dashed border-garda-forest" />
                      <span className="text-sm font-bold uppercase tracking-widest text-garda-forest">Illustration</span>
                   </div>
                </div>

                <h3 className="mb-4 font-sans text-xl font-bold leading-tight tracking-wider text-black/80 uppercase">
                  {cat.title}
                </h3>
                <p className="mb-8 text-lg font-medium leading-relaxed text-black/70">
                  {cat.description}
                </p>
                <div className="self-end">
                  <a 
                    href={cat.buttonLink}
                    className="inline-flex items-center gap-2 rounded-full bg-garda-forest px-5 py-2 text-xs font-bold text-white transition-all hover:bg-garda-forest-strong hover:gap-3"
                  >
                    <span>{cat.buttonLabel}</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fade Effect (Optional, for continuity) */}
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10 bg-linear-to-t from-white to-transparent" />
      </section>
    </div>
  )
}
