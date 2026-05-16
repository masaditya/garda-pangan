import { describe, expect, it } from 'vitest'

import {
  getArticleCarouselImages,
  mapArticleToKnowledgeItem,
} from './knowledge'

import type { Article } from './articles'

const sampleArticle: Article = {
  id: 2,
  documentId: 'n1s5ymh2003fyj45huu5x1cf',
  title: 'Apresiasi Satu Indonesia Awards',
  description: 'Ringkasan artikel',
  slug: 'apresiasi-satu-indonesia-awards',
  isFeatured: false,
  createdAt: '2026-05-16T09:03:50.446Z',
  updatedAt: '2026-05-16T09:03:50.446Z',
  publishedAt: '2026-05-16T09:03:50.536Z',
  category: {
    id: 1,
    documentId: 'rnzp7zlrdbjk9jna6a1j0hdr',
    name: 'Kesehatan Mental',
    slug: 'kesehatan-mental',
    createdAt: '2026-05-16T09:02:12.666Z',
    updatedAt: '2026-05-16T09:02:12.666Z',
    publishedAt: '2026-05-16T09:02:12.644Z',
  },
  cover: {
    id: 24,
    documentId: 'he63esup46li889x9c9ra4wr',
    name: 'cover.png',
    alternativeText: null,
    caption: null,
    focalPoint: null,
    width: 526,
    height: 700,
    formats: {
      small: {
        ext: '.png',
        url: '/uploads/small_cover.png',
        hash: 'small_hash',
        mime: 'image/png',
        name: 'small_cover.png',
        path: null,
        size: 100,
        width: 376,
        height: 500,
      },
    },
    hash: 'hash',
    ext: '.png',
    mime: 'image/png',
    size: 150,
    url: '/uploads/cover.png',
    previewUrl: null,
    provider: 'strapi-provider-upload-strapi-cloud',
    createdAt: '2026-05-09T08:56:54.487Z',
    updatedAt: '2026-05-09T13:14:05.476Z',
    publishedAt: '2026-05-09T08:56:54.487Z',
  },
}

describe('knowledge mappers', () => {
  it('builds carousel images from cover and gallery', () => {
    expect(getArticleCarouselImages(sampleArticle)).toEqual([
      'https://promising-freedom-82afaec97e.strapiapp.com/uploads/small_cover.png',
    ])
  })

  it('maps article fields into knowledge list items', () => {
    expect(mapArticleToKnowledgeItem(sampleArticle)).toEqual({
      id: 2,
      documentId: 'n1s5ymh2003fyj45huu5x1cf',
      title: 'Apresiasi Satu Indonesia Awards',
      slug: 'apresiasi-satu-indonesia-awards',
      category: 'Kesehatan Mental',
      categorySlug: 'kesehatan-mental',
      date: '2026-05-16T09:03:50.536Z',
      coverImageUrl:
        'https://promising-freedom-82afaec97e.strapiapp.com/uploads/small_cover.png',
    })
  })
})
