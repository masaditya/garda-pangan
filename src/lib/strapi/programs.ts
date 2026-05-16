import { fetchAllStrapiPages, normalizeStrapiMediaUrl } from './client'

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

export function mapProgramToDetailButtons(program: Program): ProgramDetailButton[] {
  const buttons: ProgramDetailButton[] = []

  if (program.ctaLabel && program.ctaLink) {
    const isMoreLink = program.ctaLabel.toLowerCase().includes('selengkapnya')

    buttons.push({
      text: program.ctaLabel,
      href: program.ctaLink,
      variant: isMoreLink ? 'subtle' : 'primary',
    })
  }

  buttons.push({
    text: 'Jadi Mitra',
    href: '/kontak',
    variant: 'primary',
  })

  return buttons
}

export async function getPrograms() {
  return fetchAllStrapiPages<Program>('/api/programs', {
    populate: {
      thumbnail: true,
    },
    sort: ['publishedAt:asc'],
  })
}
