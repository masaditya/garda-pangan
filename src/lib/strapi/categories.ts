import { fetchAllStrapiPages } from './client'

import type { StrapiCollectionResponse, StrapiEntry } from './types'

export type Category = StrapiEntry & {
  name: string
  slug: string
  description?: string | null
  sortOrder?: number
}

export type CategoriesResponse = StrapiCollectionResponse<Category>

export async function getCategories() {
  return fetchAllStrapiPages<Category>('/api/categories', {
    sort: ['sortOrder:asc', 'name:asc'],
  })
}
