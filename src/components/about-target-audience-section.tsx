import { SectionShell } from './section-shell'

const TARGET_DONATUR = [
  'Industri Makanan',
  'Distributor Makanan',
  'Industri Hospitality',
  'Katering',
  'Festival Kuliner',
  'Sekolah',
  'Pertanian',
  'Individu',
]

const TARGET_PENERIMA = [
  'Pemukiman Masyarakat Pra-Sejahtera',
  'Panti Asuhan',
  'Panti Jompo',
  'Shelter Anak Jalanan',
  'Liponsos',
  'Rumah Singgah Pasien',
  'Warga Difabel',
]

import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

function AudienceCard({ title, icon }: { title: string; icon?: any }) {
  const iconUrl = normalizeStrapiMediaUrl(icon?.url)

  return (
    <div className="flex flex-col items-start gap-4 shadow rounded-2xl bg-white p-4 text-left font-serif">
      {iconUrl && (
        <div className="flex h-20 w-20 items-center justify-center">
          <img src={iconUrl} alt="" className="h-full w-full object-contain" />
        </div>
      )}
      <h3 className="leading-tight font-medium text-2xl text-garda-ink">{title}</h3>
    </div>
  )
}

export function AboutTargetAudienceSection({ data }: { data?: any }) {
  const donorTitle = data?.targetDonaturTitle || 'Target Donatur'
  const recipientTitle = data?.targetPenerimaTitle || 'Target Penerima'
  const donaturCards = data?.targetDonaturCards || TARGET_DONATUR.map((t, i) => ({ id: i, title: t }))
  const penerimaCards = data?.targetPenerimaCards || TARGET_PENERIMA.map((t, i) => ({ id: i, title: t }))

  return (
    <SectionShell tone="white">
      <div className="space-y-20">
        <div className="space-y-8">
          <h2 className="text-3xl tracking-tight text-garda-forest sm:text-4xl">
            {donorTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {donaturCards.map((target: any) => (
              <AudienceCard key={target.id} title={target.title} icon={target.icon} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl tracking-tight text-garda-forest sm:text-4xl">
            {recipientTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {penerimaCards.map((target: any) => (
              <AudienceCard key={target.id} title={target.title} icon={target.icon} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
