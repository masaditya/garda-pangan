import { describe, expect, test, vi } from 'vitest'

import {
  buildStrapiUrl,
  fetchAllStrapiPages,
  normalizeStrapiMediaUrl,
} from './client'

describe('Strapi client', () => {
  test('builds Strapi URLs with nested query parameters', () => {
    const url = buildStrapiUrl('/api/articles', {
      status: 'published',
      sort: 'publishedAt:desc',
      filters: {
        slug: {
          $eq: 'food-rescue',
        },
      },
      populate: {
        cover: true,
        blocks: {
          populate: '*',
        },
      },
    })

    const query = decodeURIComponent(url.search)

    expect(url.origin).toBe(
      'https://promising-freedom-82afaec97e.strapiapp.com',
    )
    expect(url.pathname).toBe('/api/articles')
    expect(query).toContain('status=published')
    expect(query).toContain('sort=publishedAt:desc')
    expect(query).toContain('filters[slug][$eq]=food-rescue')
    expect(query).toContain('populate[cover]=true')
    expect(query).toContain('populate[blocks][populate]=*')
  })

  test('normalizes relative Strapi media URLs against the CMS base URL', () => {
    expect(normalizeStrapiMediaUrl('/uploads/photo.jpg')).toBe(
      'https://promising-freedom-82afaec97e.strapiapp.com/uploads/photo.jpg',
    )
    expect(normalizeStrapiMediaUrl('https://cdn.example.com/photo.jpg')).toBe(
      'https://cdn.example.com/photo.jpg',
    )
    expect(normalizeStrapiMediaUrl(null)).toBeNull()
  })

  test('fetches every page from a paginated Strapi collection', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: [{ id: 1, documentId: 'first' }],
            meta: {
              pagination: { page: 1, pageSize: 1, pageCount: 2, total: 2 },
            },
          }),
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: [{ id: 2, documentId: 'second' }],
            meta: {
              pagination: { page: 2, pageSize: 1, pageCount: 2, total: 2 },
            },
          }),
        ),
      )

    const result = await fetchAllStrapiPages<{
      id: number
      documentId: string
    }>('/api/articles', { status: 'published' }, { fetcher, pageSize: 1 })

    expect(result).toEqual([
      { id: 1, documentId: 'first' },
      { id: 2, documentId: 'second' },
    ])
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(decodeURIComponent(fetcher.mock.calls[1][0].toString())).toContain(
      'pagination[page]=2',
    )
  })
})
