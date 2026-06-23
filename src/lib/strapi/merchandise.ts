import { fetchAllStrapiPages, normalizeStrapiMediaUrl } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'
import type { Locale } from '#/lib/i18n/locales'
import { getIntlLocale } from '#/lib/i18n/locales'

import type { MerchandiseItem } from '../../components/merchandise-card'
import type { CategoryCount } from '../../components/merchandise-filter'
import type {
  StrapiCollectionResponse,
  StrapiEntry,
  StrapiImage,
} from './types'

export type MerchandiseStoreLink = {
  id: number
  platformName: string
  url: string
}

export type MerchandiseCategory = StrapiEntry & {
  name: string
}

export type Merchandise = StrapiEntry & {
  title: string
  description?: string | null
  releaseDate?: string | null
  images?: StrapiImage[] | null
  category?: MerchandiseCategory | null
  storeLinks?: MerchandiseStoreLink[] | null
}

export type MerchandisesResponse = StrapiCollectionResponse<Merchandise>
export type MerchandiseCategoriesResponse =
  StrapiCollectionResponse<MerchandiseCategory>

function getMerchandiseImageUrl(images?: StrapiImage[] | null) {
  const firstImage = images?.[0]
  const preferredUrl =
    firstImage?.formats?.medium?.url ??
    firstImage?.formats?.small?.url ??
    firstImage?.url

  return normalizeStrapiMediaUrl(preferredUrl)
}

export function formatMerchandiseDate(releaseDate: string, locale: Locale = 'id') {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    month: 'short',
    year: 'numeric',
  }).format(new Date(releaseDate))
}

export function mapMerchandiseToItem(
  merchandise: Merchandise,
  locale: Locale = 'id',
): MerchandiseItem {
  return {
    id: merchandise.id,
    title: merchandise.title,
    category: merchandise.category?.name ?? '',
    date: merchandise.releaseDate
      ? formatMerchandiseDate(merchandise.releaseDate, locale)
      : '',
    description: merchandise.description ?? '',
    platforms: (merchandise.storeLinks ?? []).map((link) => link.platformName),
    imageUrl: getMerchandiseImageUrl(merchandise.images),
  }
}

export function buildMerchandiseCategoryCounts(
  categories: MerchandiseCategory[],
  merchandises: Merchandise[],
): CategoryCount[] {
  const counts = new Map<string, number>()

  for (const merchandise of merchandises) {
    const categoryName = merchandise.category?.name
    if (!categoryName) {
      continue
    }

    counts.set(categoryName, (counts.get(categoryName) ?? 0) + 1)
  }

  return categories.map((category) => ({
    name: category.name,
    count: counts.get(category.name) ?? 0,
  }))
}

export async function getMerchandises({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  return fetchAllStrapiPages<Merchandise>(
    '/api/merchandises',
    withStrapiLocale(
      {
        populate: '*',
        sort: 'releaseDate:desc',
      },
      locale,
    ),
  )
}

export async function getMerchandiseCategories({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  return fetchAllStrapiPages<MerchandiseCategory>(
    '/api/merchandise-categories',
    withStrapiLocale(
      {
        sort: 'name:asc',
      },
      locale,
    ),
  )
}
