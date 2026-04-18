import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { MerchandiseHeroSection } from '../components/merchandise-hero-section'
import { MerchandiseCatalog } from '../components/merchandise-catalog'

export type StrapiMediaResponse = {
  url: string
}

export type MerchandisePageData = {
  heroTitle: string
  heroDescription: string
  heroBackground: StrapiMediaResponse | null
}

export type MerchandisePageResponse = {
  data: MerchandisePageData | null
}

export const fetchMerchandisePage = createServerFn({ method: "GET" }).handler(
  async (): Promise<MerchandisePageResponse> => {
    try {
      const res = await fetch("https://promising-freedom-82afaec97e.strapiapp.com/api/merchandise-page?populate=*")
      if (!res.ok) return { data: null }
      return await res.json()
    } catch {
      return { data: null }
    }
  }
)

export const Route = createFileRoute('/merchandise')({
  loader: async () => await fetchMerchandisePage(),
  component: MerchandisePage,
})

function MerchandisePage() {
  const payload = Route.useLoaderData()
  const data = payload?.data

  const bgImage = data?.heroBackground?.url || '/garda-hero-reference.png'

  return (
    <main className="relative isolate min-h-screen">
       {/* Global Page Background */}
       <div 
         className="absolute inset-0 -z-20 bg-cover bg-fixed bg-center" 
         style={{ backgroundImage: `url(${bgImage})` }} 
       />
       {/* Dark overlay to make text readable and cards pop */}
       <div className="absolute inset-0 -z-10 bg-[#0C381E]/80 mix-blend-multiply" />
       <div className="absolute inset-x-0 top-0 h-[50vh] -z-10 bg-gradient-to-b from-[#0C381E]/60 to-transparent" />
       
       <div className="relative z-10 w-full">
         <MerchandiseHeroSection data={data} />
         <MerchandiseCatalog />
       </div>
    </main>
  )
}
