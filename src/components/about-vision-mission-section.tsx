import { SectionShell } from './section-shell'

export function AboutVisionMissionSection({ data }: { data?: any }) {
  const vision =
    data?.visionContent ||
    'Mewujudkan Indonesia Bebas Lapar Lewat Pendistribusian Makanan Berlebih\nKami mempunyai visi untuk mewujudkan pengelolaan makanan berlebih berpotensi terbuang untuk berbagai tujuan sosial, lingkungan, dan ekonomi sesuai dengan food recovery hierarchy.'
  const visions = vision.split('\n').filter(Boolean)

  const missionString =
    data?.missionContent ||
    'Menyelamatkan potensi makanan terbuang.\nMenyalurkan donasi makanan kepada kalangan masyarakat pra-sejahtera.\nMendorong semakin banyak industri dan bisnis di bidang makanan untuk menjadi donatur yang peduli akan pembuangan makanan.\nMeningkatkan kesadaran masyarakat akan kerugian yang ditimbulkan dari pembuangan makanan, baik dari segi ekonomi, lingkungan, dan sosial, lewat kampanye dan edukasi kreatif.\nMendorong pemerintah kota untuk menciptakan iklim dan sistem yang kondusif untuk mendorong entitas di dalamnya ikut aktif terlibat mengurangi sampah makanan, yang selaras dengan komitmen Kota Surabaya dalam mewujudkan kota ramah lingkungan dan peduli sosial.'
  const missions = missionString
    .split('\n')
    .map((s: string) => s.replace(/^[•*-]\s*/, '').trim())
    .filter(Boolean)

  return (
    <SectionShell tone="paper">
      <div className="space-y-24">
        {/* Vision */}
        <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
          <div className="relative lg:col-span-1">
            {/* Faint background text approach */}
            <span className="absolute -left-4 -top-8 -z-10 select-none text-[8rem] font-black leading-none text-garda-forest/5 sm:-left-8 sm:-top-12 sm:text-[12rem]">
              Visi
            </span>
            <h2 className="text-4xl font-black tracking-tight text-garda-forest sm:text-5xl lg:sticky lg:top-32">
              Visi
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-3">
            <ul className="space-y-6 text-xl font-medium leading-relaxed text-garda-ink sm:text-2xl lg:text-3xl">
              {visions.map((v: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-none text-garda-forest">•</span>
                  <p>{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mission */}
        <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
          <div className="relative lg:col-span-1">
            <span className="absolute -left-4 -top-8 -z-10 select-none text-[8rem] font-black leading-none text-garda-forest/5 sm:-left-8 sm:-top-12 sm:text-[12rem]">
              Misi
            </span>
            <h2 className="text-4xl font-black tracking-tight text-garda-forest sm:text-5xl lg:sticky lg:top-32">
              Misi
            </h2>
          </div>
          <div className="space-y-4 lg:col-span-3 lg:pt-4">
            <ul className="space-y-6 text-lg leading-relaxed text-garda-ink-soft">
              {missions.map((m: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-none text-garda-forest mt-1">•</span>
                  <p>{m}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
