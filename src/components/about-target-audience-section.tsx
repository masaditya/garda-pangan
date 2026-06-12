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

function AudienceCard({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-garda-neutral/10 transition-shadow hover:shadow-md">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-garda-paper" />
      <h3 className="leading-tight text-garda-ink">{title}</h3>
    </div>
  )
}

export function AboutTargetAudienceSection() {
  return (
    <SectionShell tone="white">
      <div className="space-y-20">
        {/* Donatur */}
        <div className="space-y-8">
          <h2 className="text-3xl tracking-tight text-garda-forest sm:text-4xl">
            Target Donatur
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {TARGET_DONATUR.map((target) => (
              <AudienceCard key={target} title={target} />
            ))}
          </div>
        </div>

        {/* Penerima */}
        <div className="space-y-8">
          <h2 className="text-3xl tracking-tight text-garda-forest sm:text-4xl">
            Target Penerima
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {TARGET_PENERIMA.map((target) => (
              <AudienceCard key={target} title={target} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
