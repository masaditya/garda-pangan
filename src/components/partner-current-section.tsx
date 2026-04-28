import { SectionShell } from './section-shell'

import type { MitraPage as MitraData } from '#/lib/strapi/pages'

const CURRENT_PARTNERS = [
  'Organic Market',
  'Fruit Distributor',
  'Catering',
  'Pastry & Bakery',
  'Food Festival',
  'Restaurante',
]

export function PartnerCurrentSection({ data }: { data?: MitraData }) {
  const sectionTitle = data?.partnerSectionTitle || 'Current Partner'

  return (
    <SectionShell tone="white">
      <div className="space-y-12">
        <h2 className="text-3xl font-black tracking-tight text-garda-forest sm:text-4xl">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {CURRENT_PARTNERS.map((partner) => (
            <div
              key={partner}
              className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-garda-neutral/10 transition-shadow hover:shadow-md"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-garda-paper" />
              <h3 className="font-semibold leading-tight text-garda-ink">
                {partner}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
