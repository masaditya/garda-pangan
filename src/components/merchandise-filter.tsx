import { cn } from '#/lib/utils'

export type CategoryCount = {
  name: string
  count: number
}

interface MerchandiseFilterProps {
  categories: CategoryCount[]
  selected: string[]
  onChange: (category: string) => void
}

export function MerchandiseFilter({
  categories,
  selected,
  onChange,
}: MerchandiseFilterProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-garda-neutral/5">
      <h2 className="mb-6 text-xl text-garda-ink">Opsi Filter</h2>

      <div className="mb-6">
        <h3 className="mb-2 text-sm text-garda-ink-soft">
          Kategori yang diterapkan
        </h3>
        {selected.length === 0 ? (
          <p className="text-sm text-garda-ink-soft/70">Belum ada</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((s) => (
              <span
                key={s}
                className="rounded-full bg-garda-forest/10 px-3 py-1 text-xs font-semibold text-garda-forest"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 h-px w-full bg-garda-neutral/10" />

      <div>
        <h3 className="mb-4 text-sm text-garda-ink-soft">
          Daftar Kategori
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => {
            const isChecked = selected.includes(cat.name)
            return (
              <li key={cat.name} className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-garda-neutral/20 checked:border-garda-forest checked:bg-garda-forest transition-colors"
                      checked={isChecked}
                      onChange={() => onChange(cat.name)}
                    />
                    <svg
                      className={cn(
                        'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white transition-opacity',
                        isChecked ? 'opacity-100' : 'opacity-0',
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-garda-ink">
                    {cat.name}
                  </span>
                </label>
                <span className="flex items-center justify-center rounded-full border border-garda-neutral/10 bg-garda-paper px-2 py-0.5 text-xs font-semibold text-garda-ink-soft min-w-[2rem]">
                  {cat.count}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
