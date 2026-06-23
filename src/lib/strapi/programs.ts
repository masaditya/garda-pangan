import { fetchAllStrapiPages, normalizeStrapiMediaUrl } from './client'
import { withStrapiLocale, type StrapiLocaleOptions } from './locale'
import type { Locale } from '#/lib/i18n/locales'
import { localizedPath } from '#/lib/i18n/routing'

import type { StrapiCollectionResponse, StrapiEntry, StrapiImage } from './types'

export type ProgramDetailButton = {
  text: string
  href: string
  variant?: 'primary' | 'subtle'
}

export type Program = StrapiEntry & {
  title: string
  description: string
  ctaLabel?: string | null
  ctaLink?: string | null
  thumbnail?: StrapiImage | null
}

export type ProgramsResponse = StrapiCollectionResponse<Program>

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function formatProgramDescription(description: string) {
  const paragraphs = description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return paragraphs
    .map(
      (paragraph) =>
        `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`,
    )
    .join('')
}

export function getProgramThumbnailUrl(thumbnail?: StrapiImage | null) {
  const preferredUrl =
    thumbnail?.formats?.small?.url ??
    thumbnail?.formats?.medium?.url ??
    thumbnail?.formats?.large?.url ??
    thumbnail?.url

  return normalizeStrapiMediaUrl(preferredUrl)
}

export function mapProgramToDetailButtons(
  program: Program,
  locale: Locale = 'id',
): ProgramDetailButton[] {
  const buttons: ProgramDetailButton[] = []
  const partnerCta = locale === 'en' ? 'Become a Partner' : 'Jadi Mitra'

  if (program.ctaLabel && program.ctaLink) {
    const isMoreLink = program.ctaLabel.toLowerCase().includes('selengkapnya')

    buttons.push({
      text: program.ctaLabel,
      href: program.ctaLink,
      variant: isMoreLink ? 'subtle' : 'primary',
    })
  }

  buttons.push({
    text: partnerCta,
    href: localizedPath('/kontak', locale),
    variant: 'primary',
  })

  return buttons
}

type GetProgramsOptions = StrapiLocaleOptions & {
  fetcher?: typeof fetch
}

export async function getPrograms({
  locale = 'id',
  fetcher,
}: GetProgramsOptions = {}) {
  return fetchAllStrapiPages<Program>(
    '/api/programs',
    withStrapiLocale(
      {
        populate: '*',
        sort: 'publishedAt:asc',
      },
      locale,
    ),
    { fetcher },
  )
}
