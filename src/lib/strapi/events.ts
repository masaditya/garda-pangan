import { fetchAllStrapiPagesSafe } from './client'

import type { StrapiCollectionResponse, StrapiEntry, StrapiMedia } from './types'

export type Event = StrapiEntry & {
  title: string
  slug: string
  date: string
  summary?: string | null
  location?: string | null
  eventTag?: string | null
  content?: string | null
  coverImage?: StrapiMedia | null
}

export type EventsResponse = StrapiCollectionResponse<Event>

export async function getEvents() {
  return fetchAllStrapiPagesSafe<Event>('/api/events', {
    populate: {
      coverImage: true,
    },
    sort: 'date:desc',
  })
}
