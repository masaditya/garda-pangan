import { createFileRoute } from '@tanstack/react-router'

import { SiteContainer } from '../components/site-container'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="py-24">
      <SiteContainer>
        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(13,42,22,0.08)] backdrop-blur-sm sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-garda-forest">
            About
          </p>
          <h1 className="mb-3 text-4xl font-black tracking-[-0.06em] text-garda-ink sm:text-5xl">
            A small starter with room to grow.
          </h1>
          <p className="m-0 max-w-3xl text-base leading-8 text-garda-ink-soft">
            TanStack Start gives you type-safe routing, server functions, and
            modern SSR defaults. Use this as a clean foundation, then layer in
            your own routes, styling, and add-ons.
          </p>
        </section>
      </SiteContainer>
    </main>
  )
}
