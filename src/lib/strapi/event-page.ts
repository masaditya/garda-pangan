import { fetchStrapiSingleSafe } from './client'

import type { StrapiEntry, StrapiMedia } from './types'

export type EventPage = StrapiEntry & {
  heroTitle?: string | null
  heroDescription?: string | null
  heroBackground?: StrapiMedia | null
}

export async function getEventPage() {
  return fetchStrapiSingleSafe<EventPage>('/api/event-page', {
    populate: '*',
  })
}
