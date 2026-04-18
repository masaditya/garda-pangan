import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PartnerHeroSection } from '../components/partner-hero-section'
import { PartnerFlowSection } from '../components/partner-flow-section'
import { PartnerCurrentSection } from '../components/partner-current-section'

export type StrapiMediaFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export type StrapiMedia = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint: string | null
  width: number
  height: number
  formats: {
    large?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    thumbnail?: StrapiMediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type MitraFlowStep = {
  id: number
  title: string
  description: string
  button1Label: string | null
  button1Link: string | null
  button2Label: string | null
  button2Link: string | null
  icon: StrapiMedia | null
}

export type MitraData = {
  id: number
  documentId: string
  heroTitle: string
  heroVideoUrl: string | null
  flowTitle: string
  flowDescription: string
  partnerSectionTitle: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  flowSteps: MitraFlowStep[]
  heroBackgroundMedia: StrapiMedia | null
}

export type MitraResponse = {
  data: MitraData | null
  meta: any
}

export const fetchMitraData = createServerFn({ method: 'GET' }).handler(
  async (): Promise<MitraResponse> => {
    try {
      const res = await fetch(
        'https://promising-freedom-82afaec97e.strapiapp.com/api/mitra?populate[flowSteps][populate]=*&populate[heroBackgroundMedia][populate]=*'
      )
      if (!res.ok) return { data: null, meta: {} }
      return await res.json()
    } catch (error) {
      return { data: null, meta: {} }
    }
  }
)

export const Route = createFileRoute('/mitra')({
  loader: async () => await fetchMitraData(),
  component: MitraPage,
})

function MitraPage() {
  const payload = Route.useLoaderData()
  const data = payload?.data || undefined

  return (
    <main>
      <PartnerHeroSection data={data} />
      <PartnerFlowSection data={data} />
      <PartnerCurrentSection data={data} />
    </main>
  )
}
