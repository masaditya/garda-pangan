import { normalizeStrapiMediaUrl } from './client'
import type { Locale } from '#/lib/i18n/locales'
import { getIntlLocale } from '#/lib/i18n/locales'

import type { Article } from './articles'
import type { StrapiImage } from './types'

function getStrapiImageUrl(image?: StrapiImage | null) {
  const preferredUrl =
    image?.formats?.large?.url ??
    image?.formats?.medium?.url ??
    image?.formats?.small?.url ??
    image?.url

  return normalizeStrapiMediaUrl(preferredUrl)
}

export type KnowledgeItem = {
  id: number
  documentId: string
  title: string
  slug: string
  category: string
  categorySlug: string
  date: string
  coverImageUrl?: string | null
}

export function formatKnowledgeArticleDate(
  date: string,
  locale: Locale = 'id',
) {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function getArticleImageCaption(
  article: Article,
  fallback = 'Image courtesy of Garda Pangan',
) {
  const cover = article.cover

  return cover?.caption || cover?.alternativeText || fallback
}

export function getArticleCarouselImages(article: Article) {
  const images: string[] = []

  const coverUrl = getStrapiImageUrl(article.cover ?? null)
  if (coverUrl) {
    images.push(coverUrl)
  }

  for (const image of article.carouselImages ?? []) {
    const url = getStrapiImageUrl(image)
    if (url && !images.includes(url)) {
      images.push(url)
    }
  }

  return images
}

export function mapArticleToKnowledgeItem(article: Article): KnowledgeItem {
  const coverUrl =
    article.cover?.formats?.small?.url ??
    article.cover?.formats?.medium?.url ??
    article.cover?.url

  return {
    id: article.id,
    documentId: article.documentId,
    title: article.title,
    slug: article.slug,
    category: article.category?.name ?? '',
    categorySlug: article.category?.slug ?? '',
    date: article.publishedAt ?? article.createdAt,
    coverImageUrl: normalizeStrapiMediaUrl(coverUrl),
  }
}
