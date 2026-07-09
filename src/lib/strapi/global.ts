import { fetchStrapiSingleSafe } from './client'
import type { StrapiEntry, StrapiMedia } from './types'

export type GlobalSocialLinks = {
  id: number
  youtube?: string | null
  tiktok?: string | null
  linkedin?: string | null
  instagram?: string | null
  facebook?: string | null
}

export type GlobalDefaultSeo = {
  id: number
  metaTitle?: string | null
  metaDescription?: string | null
  shareImage?: StrapiMedia | null
}

export type Global = StrapiEntry & {
  siteName?: string | null
  siteDescription?: string | null
  footerAddress?: string | null
  footerEmail?: string | null
  footerPhone?: string | null
  favicon?: StrapiMedia | null
  footerSocialLinks?: GlobalSocialLinks | null
  defaultSeo?: GlobalDefaultSeo | null
}

export async function getGlobal() {
  return fetchStrapiSingleSafe<Global>('/api/global', { pLevel: '' })
}
