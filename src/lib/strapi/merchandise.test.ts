import { describe, expect, it } from 'vitest'

import {
  buildMerchandiseCategoryCounts,
  mapMerchandiseToItem,
} from './merchandise'

import type { Merchandise, MerchandiseCategory } from './merchandise'

const sampleMerchandise: Merchandise = {
  id: 2,
  documentId: 'rr5l3hwcjq7oku7r4nmw2uov',
  title: 'Totebag Senja',
  description: 'Totebag mantul membuat anda marah marah ',
  releaseDate: '2026-05-15',
  createdAt: '2026-05-16T09:22:17.740Z',
  updatedAt: '2026-05-16T09:22:17.740Z',
  publishedAt: '2026-05-16T09:22:17.917Z',
  category: {
    id: 8,
    documentId: 'ueiu4ynuz3x8iax2p2ns7e03',
    name: 'Totebag',
    createdAt: '2026-05-16T09:20:25.857Z',
    updatedAt: '2026-05-16T09:20:25.857Z',
    publishedAt: '2026-05-16T09:20:25.885Z',
  },
  images: [
    {
      id: 27,
      documentId: 'eptohmrbuocvcpmp7zvogv1p',
      name: 'totebag.webp',
      alternativeText: null,
      caption: null,
      focalPoint: null,
      width: 750,
      height: 1100,
      formats: {
        small: {
          ext: '.webp',
          url: '/uploads/small_totebag.webp',
          hash: 'small_hash',
          mime: 'image/webp',
          name: 'small_totebag.webp',
          path: null,
          size: 6.71,
          width: 341,
          height: 500,
        },
      },
      hash: 'hash',
      ext: '.webp',
      mime: 'image/webp',
      size: 39.1,
      url: '/uploads/totebag.webp',
      previewUrl: null,
      provider: 'strapi-provider-upload-strapi-cloud',
      createdAt: '2026-05-16T09:21:32.598Z',
      updatedAt: '2026-05-16T09:21:32.598Z',
      publishedAt: '2026-05-16T09:21:32.598Z',
    },
  ],
  storeLinks: [
    {
      id: 3,
      platformName: 'Shopee',
      url: 'https://shopee.co.id/example',
    },
    {
      id: 4,
      platformName: 'Tokopedia',
      url: 'https://tokopedia.com/example',
    },
  ],
}

const sampleCategories: MerchandiseCategory[] = [
  {
    id: 2,
    documentId: 'efu69r92rw5yydev1e1a3nzq',
    name: 'Kaos',
    createdAt: '2026-05-16T09:18:59.512Z',
    updatedAt: '2026-05-16T09:18:59.512Z',
    publishedAt: '2026-05-16T09:18:59.553Z',
  },
  {
    id: 8,
    documentId: 'ueiu4ynuz3x8iax2p2ns7e03',
    name: 'Totebag',
    createdAt: '2026-05-16T09:20:25.857Z',
    updatedAt: '2026-05-16T09:20:25.857Z',
    publishedAt: '2026-05-16T09:20:25.885Z',
  },
]

describe('merchandise mappers', () => {
  it('maps merchandise into catalog card items', () => {
    expect(mapMerchandiseToItem(sampleMerchandise)).toEqual({
      id: 2,
      title: 'Totebag Senja',
      category: 'Totebag',
      date: 'Mei 2026',
      description: 'Totebag mantul membuat anda marah marah ',
      platforms: ['Shopee', 'Tokopedia'],
      imageUrl:
        'https://promising-freedom-82afaec97e.strapiapp.com/uploads/small_totebag.webp',
    })
  })

  it('builds category counts from API categories and merchandises', () => {
    expect(
      buildMerchandiseCategoryCounts(sampleCategories, [sampleMerchandise]),
    ).toEqual([
      { name: 'Kaos', count: 0 },
      { name: 'Totebag', count: 1 },
    ])
  })
})
