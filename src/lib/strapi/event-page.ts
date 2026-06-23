import { fetchStrapiSingleSafe } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'

import type { StrapiEntry, StrapiMedia } from './types'

export type EventPage = StrapiEntry & {
  heroTitle?: string | null
  heroDescription?: string | null
  heroBackground?: StrapiMedia | null
}

export async function getEventPage({ locale = 'id' }: StrapiLocaleOptions = {}) {
  return fetchStrapiSingleSafe<EventPage>(
    '/api/event-page',
    withStrapiLocale(
      {
        populate: '*',
      },
      locale,
    ),
  )
}
