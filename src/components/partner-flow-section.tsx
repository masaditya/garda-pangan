import { SectionShell } from './section-shell'
import { cn } from '#/lib/utils'
import type { MitraData } from '../routes/mitra'

const FALLBACK_STEPS = [
  {
    title: 'Punya makanan berlebih yang masih layak konsumsi?',
    description: 'Donasikan ke Garda Pangan saja!',
    imagePlaceholder: 'heart',
  },
  {
    title: 'Silahkan hubungi narahubung kami di',
    description: '',
    imagePlaceholder: 'heart-smile',
    buttons: ['WhatsApp 1', 'WhatsApp 2']
  },
  {
    title: 'Informasikan beberapa keterangan',
    description: 'Jenis makanan, jumlah makanan, jadwal penjemputan donasi dan lokasi donatur',
    imagePlaceholder: 'heart-smile',
  },
  {
    title: 'Tim Garda Pangan akan menjemput donasi',
    description: 'Donasi akan disalurkan kepada masyarakat pra sejahtera di Surabaya',
    imagePlaceholder: 'heart-smile',
  },
  {
    title: 'Laporan bulanan dari tim Garda Pangan',
    description: 'Laporan bulanan akan dikirim mengenai lokasi distribusi donasi, sebagai pertanggungjawaban.',
    imagePlaceholder: 'document',
  },
]

export function PartnerFlowSection({ data }: { data?: MitraData }) {
  const flowTitle = data?.flowTitle || 'Bagaimana alur donasi Garda Pangan'
  const flowDescription = data?.flowDescription || 'Garda Pangan menjalin kerjasama dengan Mitra (mitra dari restoran, hotel, bakery, cafe, rumah makan, katering, mall, distributor, FMCG, dan berbagai bisnis makanan lainnya) yang berkomitmen mendonasikan makanan surplus layak makan yang dihasilkan. Food rescue dilakukan setiap harinya dengan menjemput makanan yang tidak terjual dari mitra, untuk didistribusikan langsung secara gratis ke panti asuhan/masyarakat yang membutuhkan.'

  return (
    <SectionShell tone="white">
      {/* Intro block */}
      <div className="mb-24 grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-black tracking-tight text-garda-ink sm:text-5xl">
            {flowTitle}
          </h2>
        </div>
        <div className="text-base leading-relaxed text-garda-ink-soft sm:text-lg lg:col-span-7">
          <p>{flowDescription}</p>
        </div>
      </div>

      {/* Timeline flow */}
      <div className="relative mx-auto max-w-4xl pt-8">
        <div className="absolute bottom-0 left-[24px] top-6 w-[2px] bg-garda-ink md:left-1/2 md:-ml-[1px]" />
        
        <div className="space-y-12 md:space-y-8">
          {(data?.flowSteps || FALLBACK_STEPS).map((step: any, index: number) => {
            const isEven = index % 2 === 0
            const number = index + 1
            const buttons = []
            if (step.button1Label) buttons.push({ label: step.button1Label, link: step.button1Link || '#' })
            else if (step.buttons?.[0]) buttons.push({ label: step.buttons[0], link: '#' })
            if (step.button2Label) buttons.push({ label: step.button2Label, link: step.button2Link || '#' })
            else if (step.buttons?.[1]) buttons.push({ label: step.buttons[1], link: '#' })
            
            return (
              <div 
                key={number} 
                className={cn(
                  'relative flex items-center md:justify-between w-full',
                  !isEven && 'md:flex-row-reverse'
                )}
              >
                {/* Center / Left dot (hidden in the mock, but we can replace it with direct line) */}
                
                {/* Content Card Wrapper */}
                <div className="relative ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]">
                  
                  {/* Horizontal Connector Line */}
                  <div className={cn(
                    "hidden md:block absolute top-1/2 w-10 h-[2px] bg-garda-ink -translate-y-1/2",
                    isEven ? "-right-10" : "-left-10"
                  )} />
                  <div className="md:hidden absolute top-1/2 -left-10 w-10 h-[2px] bg-garda-ink -translate-y-1/2" />

                  <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-garda-forest bg-white px-6 pb-8 pt-10 md:px-8 text-center shadow-sm">
                    {/* Faint number watermark inside card */}
                    <span className="absolute -bottom-8 -right-2 z-0 select-none text-[12rem] opacity-20 font-bold leading-none text-garda-neutral/10">
                      {number}
                    </span>
                    
                    <div className="relative z-10">
                      <div className="mb-6 w-full flex items-center justify-center">
                         {step.icon?.url ? (
                           <img src={step.icon.url} alt="Icon flow" className="h-[180px] w-auto object-contain" />
                         ) : (
                           <div className="h-40 w-40 bg-garda-paper/50 flex items-center justify-center rounded-xl text-garda-ink-soft/40 uppercase tracking-widest text-xs font-bold border border-garda-forest/10">{step.imagePlaceholder} img</div>
                         )}
                      </div>
                      <h3 className="mb-2 text-[1.35rem] font-bold leading-tight text-garda-ink text-balance">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="text-sm font-medium leading-relaxed text-garda-ink/90">
                          {step.description}
                        </p>
                      )}
                      
                      {buttons.length > 0 && (
                        <div className="mt-8 flex flex-col items-center gap-3 max-w-[280px] mx-auto">
                          {buttons.map((btn, i) => (
                            <a key={i} href={btn.link} className="w-full flex justify-between items-center bg-garda-forest text-white rounded-full pl-6 pr-2 py-2 text-xs font-semibold hover:bg-garda-forest/90 transition-colors shadow-sm">
                              <span className="flex-1 text-center font-bold tracking-wide">{btn.label}</span>
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-garda-lemon text-garda-forest">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-[1px]">
                                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Empty spacer for alternating md grid */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
