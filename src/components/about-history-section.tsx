import { SectionShell } from './section-shell'

export function AboutHistorySection({ data }: { data?: any }) {
  const title = data?.historyTitle || 'Sejarah Kami'
  const content =
    data?.historyContent ||
    'Berawal dari pengalaman salah seorang founder, Dedhy Trasno, yang berlatar belakang pengusaha katering pernikahan, yang seringkali menghadapi masalah pembuangan makanan tiap pekannya.\n\nDari sudut pandang bisnis membuang makanan menjadi pilihan ideal karena cepat, murah, dan praktis untuk dilakukan.\n\nMelihat pembuangan makanan ini sebagai hal yang menyedihkan dan mengganggu, Dedhy Trasno dan Eva Bachtiar—seseorang yang juga mempunyai semangat yang sama untuk menyelesaikan isu pembuangan makanan—menginisiasi gerakan food rescue di Surabaya dengan nama Garda Pangan.'
  const imageUrl = data?.historyImages?.[0]?.url

  return (
    <SectionShell tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2
            className="text-4xl font-black tracking-tight text-garda-forest sm:text-5xl lg:sticky lg:top-32"
            dangerouslySetInnerHTML={{
              __html: title.split(' ').join('<br class="hidden lg:block" /> '),
            }}
          />
        </div>
        <div className="space-y-8 text-lg leading-relaxed text-garda-ink-soft lg:col-span-7">
          <div className="prose prose-lg text-garda-ink-soft whitespace-pre-wrap">
            {content}
          </div>
          {/* Decorative image placeholder to match mockup */}
          <div className="relative mt-12 grid grid-cols-2 gap-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="aspect-square rounded-2xl object-cover bg-garda-paper/50"
              />
            ) : (
              <div className="aspect-square rounded-2xl bg-garda-paper/50" />
            )}
            <div className="aspect-square rounded-2xl bg-garda-paper/30 mt-12" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
