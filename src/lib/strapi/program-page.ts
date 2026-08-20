import { fetchStrapiSingleSafe } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'

import type { StrapiEntry, StrapiMedia } from './types'

export type ProgramPage = StrapiEntry & {
  title?: string | null
  description?: string | null
  backgroundImage?: StrapiMedia | null
}

export async function getProgramPage({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  return fetchStrapiSingleSafe<ProgramPage>(
    '/api/program-page',
    withStrapiLocale(
      {
        populate: '*',
      },
      locale,
    ),
  )
}
