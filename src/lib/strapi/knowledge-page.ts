import { fetchStrapiSingle } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'

import type { StrapiEntry, StrapiImage, StrapiSingleResponse } from './types'

export type KnowledgePage = StrapiEntry & {
  heroTitle: string
  heroSubtitle?: string | null
  heroBackground?: StrapiImage | null
  searchPlaceholder?: string | null
  categoryFilterLabel?: string | null
  filterAllLabel?: string | null
  sortNewestLabel?: string | null
  searchSubmitLabel?: string | null
  paginationPrevLabel?: string | null
  paginationNextLabel?: string | null
  emptyListMessage?: string | null
}

export type KnowledgePageResponse = StrapiSingleResponse<KnowledgePage>

export async function getKnowledgePage({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  return fetchStrapiSingle<KnowledgePage>(
    '/api/knowledge-page',
    withStrapiLocale(
      {
        populate: '*',
      },
      locale,
    ),
  )
}
