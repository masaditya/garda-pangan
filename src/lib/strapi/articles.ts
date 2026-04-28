import { fetchAllStrapiPages, strapiFetch } from './client'

import type {
  StrapiCollectionResponse,
  StrapiEntry,
  StrapiMedia,
} from './types'

export type ArticleAuthor = StrapiEntry & {
  name?: string | null
  email?: string | null
  avatar?: StrapiMedia | null
}

export type ArticleCategory = StrapiEntry & {
  name?: string | null
  slug?: string | null
}

export type RichTextBlock = {
  id: number
  __component: 'shared.rich-text'
  body?: string | null
}

export type MediaBlock = {
  id: number
  __component: 'shared.media'
  file?: StrapiMedia | null
}

export type QuoteBlock = {
  id: number
  __component: 'shared.quote'
  title?: string | null
  body?: string | null
}

export type SliderBlock = {
  id: number
  __component: 'shared.slider'
  files?: StrapiMedia[]
}

export type ArticleBlock = RichTextBlock | MediaBlock | QuoteBlock | SliderBlock

export type Article = StrapiEntry & {
  title: string
  description?: string | null
  slug: string
  cover?: StrapiMedia | null
  author?: ArticleAuthor | null
  category?: ArticleCategory | null
  blocks?: ArticleBlock[]
  isFeatured?: boolean
}

export function getArticlePopulateQuery() {
  return {
    cover: true,
    author: true,
    category: true,
    blocks: {
      populate: '*',
    },
  }
}

export async function getPublishedArticles() {
  return fetchAllStrapiPages<Article>('/api/articles', {
    status: 'published',
    sort: 'publishedAt:desc',
    populate: getArticlePopulateQuery(),
  })
}

export async function getArticleBySlug(slug: string) {
  const response = await strapiFetch<StrapiCollectionResponse<Article>>(
    '/api/articles',
    {
      status: 'published',
      filters: {
        slug: {
          $eq: slug,
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
      populate: getArticlePopulateQuery(),
    },
  )

  return response.data[0] ?? null
}
