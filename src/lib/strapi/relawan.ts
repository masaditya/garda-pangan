import { fetchStrapiSingleSafe, normalizeStrapiMediaUrl } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'
import type { StrapiEntry, StrapiImage } from './types'

export type RelawanPage = StrapiEntry & {
  heroTitle: string
  heroSubtitle: string
  buttonText: string
  buttonLink: string
  heroBackground?: StrapiImage | null
  localizations?: Array<{
    id: number
    locale: string
    heroTitle: string
    heroSubtitle: string
    buttonText: string
    buttonLink: string
  }>
}

export function getHeroBackgroundUrl(heroBackground?: StrapiImage | null) {
  const preferredUrl =
    heroBackground?.formats?.large?.url ??
    heroBackground?.formats?.medium?.url ??
    heroBackground?.url

  return normalizeStrapiMediaUrl(preferredUrl)
}

type GetRelawanPageOptions = StrapiLocaleOptions & {
  fetcher?: typeof fetch
}

export async function getRelawanPage({
  locale = 'id',
  fetcher,
}: GetRelawanPageOptions = {}) {
  return fetchStrapiSingleSafe<RelawanPage>(
    '/api/relawan-page',
    withStrapiLocale(
      {
        populate: '*',
      },
      locale,
    ),
    { fetcher },
  )
}
