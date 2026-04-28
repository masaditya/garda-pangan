import { fetchStrapiSingle } from './client'

import type { StrapiEntry, StrapiMedia } from './types'

export type AboutPage = StrapiEntry & {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroBackground?: StrapiMedia | null
  historyTitle?: string | null
  historyContent?: string | null
  historyImages?: StrapiMedia[]
  visionContent?: string | null
  missionContent?: string | null
  legalityContent?: string | null
}

export type MitraInfoCard = {
  id: number
  content: string
}

export type MitraFlowStep = {
  id: number
  title: string
  description?: string | null
  icon?: StrapiMedia | null
  button1Label?: string | null
  button1Link?: string | null
  button2Label?: string | null
  button2Link?: string | null
}

export type MitraPage = StrapiEntry & {
  heroTitle?: string | null
  heroBackgroundMedia?: StrapiMedia | null
  heroVideoUrl?: string | null
  heroInfoCards?: MitraInfoCard[]
  flowTitle?: string | null
  flowDescription?: string | null
  flowSteps?: MitraFlowStep[]
  partnerSectionTitle?: string | null
}

export type MerchandisePage = StrapiEntry & {
  heroTitle?: string | null
  heroDescription?: string | null
  heroBackground?: StrapiMedia | null
}

export async function getAboutPage() {
  return fetchStrapiSingle<AboutPage>('/api/about', {
    populate: {
      heroBackground: true,
      historyImages: true,
    },
  })
}

export async function getMitraPage() {
  return fetchStrapiSingle<MitraPage>('/api/mitra', {
    populate: {
      heroBackgroundMedia: true,
      heroInfoCards: true,
      flowSteps: {
        populate: '*',
      },
    },
  })
}

export async function getMerchandisePage() {
  return fetchStrapiSingle<MerchandisePage>('/api/merchandise-page', {
    populate: {
      heroBackground: true,
    },
  })
}
