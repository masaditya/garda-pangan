import { SiteContainer } from './site-container'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-garda-border bg-white/75 py-8 backdrop-blur-sm">
      <SiteContainer className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-garda-forest">
            Garda Pangan
          </p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-garda-ink-soft">
            Menghubungkan donatur, mitra, penerima, dan relawan dalam satu
            ekosistem distribusi pangan yang lebih bermakna.
          </p>
        </div>
        <p className="text-sm text-garda-ink-soft">
          &copy; {year} Garda Pangan. All rights reserved.
        </p>
      </SiteContainer>
    </footer>
  )
}
