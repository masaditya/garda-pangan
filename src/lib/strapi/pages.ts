import { fetchStrapiSingle, fetchStrapiSingleSafe } from './client'

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

export type PenerimaPage = StrapiEntry & {
  heroTitle?: string | null
  heroDescription?: string | null
  heroBackground?: StrapiMedia | null
  heroVideoUrl?: string | null
  testimonialButtonLabel?: string | null
}

export type DidYouKnowItem = {
  id: number
  content: string
}

export type ImpactStat = {
  id: number
  label: string
  value: string
  image?: StrapiMedia | null
}

export type FeaturedBy = {
  id: number
  title: string
  logos?: StrapiMedia[] | null
}

export type AgentChangeCard = {
  id: number
  title: string
  description: string
  image?: StrapiMedia | null
}

export type AwardCard = {
  id: number
  title: string
  year: string
  images?: StrapiMedia[] | null
}

export type InstagramCard = {
  id: number
  title?: string | null
  subtitle?: string | null
  instagramHandle?: string | null
  image?: StrapiMedia | null
}

export type SupporterCard = {
  id: number
  title: string
  image?: StrapiMedia | null
}

export type Homepage = StrapiEntry & {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroCtaText?: string | null
  heroCtaLink?: string | null
  heroBackground?: StrapiMedia | null
  didYouKnow?: DidYouKnowItem[]
  impactTitle?: string | null
  impactImage?: StrapiMedia | null
  impactStats?: ImpactStat[]
  featuredBy?: FeaturedBy | null
  agenPerubahanTitle?: string | null
  agenPerubahanSubtitle?: string | null
  agenPerubahanCards?: AgentChangeCard[]
  awardTitle?: string | null
  awardCards?: AwardCard[]
  instagramTitle?: string | null
  instagramCards?: InstagramCard[]
  supporterTitle?: string | null
  supporterSubtitle?: string | null
  supporterCards?: SupporterCard[]
  // Legacy fields (optional)
  statsPortionsRescued?: string | null
  statsCo2Reduced?: string | null
  statsFoodLossPotential?: string | null
  statsFoodScrap?: string | null
}

export async function getAboutPage() {
  return fetchStrapiSingleSafe<AboutPage>('/api/about', {
    populate: {
      heroBackground: true,
      historyImages: true,
    },
  })
}

export async function getMitraPage() {
  return fetchStrapiSingleSafe<MitraPage>('/api/mitra', {
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
  return fetchStrapiSingleSafe<MerchandisePage>('/api/merchandise-page', {
    populate: {
      heroBackground: true,
    },
  })
}

export async function getPenerimaPage() {
  return fetchStrapiSingleSafe<PenerimaPage>('/api/penerima-page', {
    populate: '*',
  })
}

export async function getHomepage() {
  return fetchStrapiSingleSafe<Homepage>('/api/homepage', {
    populate: {
      heroBackground: true,
      didYouKnow: true,
      impactImage: true,
      impactStats: {
        populate: ['image'],
      },
      featuredBy: {
        populate: ['logos'],
      },
      agenPerubahanCards: {
        populate: ['image'],
      },
      awardCards: {
        populate: ['images'],
      },
      instagramCards: {
        populate: ['image'],
      },
      supporterCards: {
        populate: ['image'],
      },
    },
  })
}

