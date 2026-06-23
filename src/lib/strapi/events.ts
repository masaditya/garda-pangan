import { fetchAllStrapiPagesSafe } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'

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

export async function getEvents({ locale = 'id' }: StrapiLocaleOptions = {}) {
  return fetchAllStrapiPagesSafe<Event>(
    '/api/events',
    withStrapiLocale(
      {
        populate: {
          coverImage: true,
        },
        sort: 'date:desc',
      },
      locale,
    ),
  )
}
