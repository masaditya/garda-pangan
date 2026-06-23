import {
  fetchAllStrapiPages,
  fetchAllStrapiPagesSafe,
  strapiFetch,
} from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'

import type {
  StrapiCollectionResponse,
  StrapiEntry,
  StrapiImage,
  StrapiMedia,
} from './types'

export type ArticleAuthor = StrapiEntry & {
  name?: string | null
  email?: string | null
  bio?: string | null
  avatar?: StrapiMedia | null
}

export type ArticleCategory = StrapiEntry & {
  name: string
  slug: string
  description?: string | null
  sortOrder?: number
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
  content?: string | null
  cover?: StrapiImage | StrapiMedia | null
  carouselImages?: StrapiImage[] | null
  author?: ArticleAuthor | null
  category?: ArticleCategory | null
  blocks?: ArticleBlock[]
  isFeatured?: boolean
}

export type ArticlesResponse = StrapiCollectionResponse<Article>

export function getArticlePopulateQuery() {
  return {
    cover: true,
    author: true,
    category: true,
    carouselImages: true,
  }
}

export function getArticleListPopulateQuery() {
  return {
    cover: true,
    category: true,
  }
}

export async function getArticleSlugsForPaths({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  const articles = await fetchAllStrapiPagesSafe<Article>(
    '/api/articles',
    withStrapiLocale(
      {
        sort: 'publishedAt:desc',
      },
      locale,
    ),
  )

  return articles.map((article) => article.slug).filter(Boolean)
}

export async function getPublishedArticles({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  return fetchAllStrapiPagesSafe<Article>(
    '/api/articles',
    withStrapiLocale(
      {
        sort: 'publishedAt:desc',
        populate: getArticleListPopulateQuery(),
      },
      locale,
    ),
  )
}

export async function getArticlesForKnowledge({
  locale = 'id',
}: StrapiLocaleOptions = {}) {
  return fetchAllStrapiPages<Article>(
    '/api/articles',
    withStrapiLocale(
      {
        populate: '*',
        sort: 'publishedAt:desc',
      },
      locale,
    ),
  )
}

export async function getArticleBySlug(
  slug: string,
  { locale = 'id' }: StrapiLocaleOptions = {},
) {
  const response = await strapiFetch<StrapiCollectionResponse<Article>>(
    '/api/articles',
    withStrapiLocale(
      {
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
      locale,
    ),
  )

  return response.data[0] ?? null
}

export async function getKnowledgeArticleBySlug(
  slug: string,
  { locale = 'id' }: StrapiLocaleOptions = {},
) {
  const response = await strapiFetch<StrapiCollectionResponse<Article>>(
    '/api/articles',
    withStrapiLocale(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        pagination: {
          page: 1,
          pageSize: 1,
        },
        populate: '*',
      },
      locale,
    ),
  )

  return response.data[0] ?? null
}
