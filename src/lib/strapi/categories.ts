import { fetchAllStrapiPages } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'

import type { StrapiCollectionResponse, StrapiEntry } from './types'

export type Category = StrapiEntry & {
  name: string
  slug: string
  description?: string | null
  sortOrder?: number
}

export type CategoriesResponse = StrapiCollectionResponse<Category>

export async function getCategories({ locale = 'id' }: StrapiLocaleOptions = {}) {
  return fetchAllStrapiPages<Category>(
    '/api/categories',
    withStrapiLocale(
      {
        sort: 'sortOrder:asc,name:asc',
      },
      locale,
    ),
  )
}
