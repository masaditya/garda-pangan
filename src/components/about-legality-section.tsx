import { SectionShell } from './section-shell'

export function AboutLegalitySection({ data }: { data?: any }) {
  const legality =
    data?.legalityContent ||
    'Garda Pangan merupakan yayasan berbadan hukum yang terdaftar dalam SK Kemenkumham AHU-0015694.AH.01.04.Tahun 2017\nYayasan Garda Pangan memiliki NPWP dengan nomor 83.155.653.1-604.000\nYayasan Garda Pangan juga telah memiliki Tanda Daftar Yayasan (TDY) dari Dinas Sosial Provinsi Jawa Timur dengan nomor 062/486/106.05/2021'
  const legalParagraphs = legality.split('\n').filter(Boolean)

  return (
    <SectionShell tone="white" spacing="compact">
      <div className="rounded-3xl bg-garda-paper p-8 sm:p-12">
        <h2 className="mb-6 text-2xl tracking-tight text-garda-forest sm:text-3xl">
          Legalitas
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-garda-ink-soft sm:text-base">
          {legalParagraphs.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
