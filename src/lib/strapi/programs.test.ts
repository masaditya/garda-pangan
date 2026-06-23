import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it, vi } from 'vitest'

import {
  formatProgramDescription,
  getProgramThumbnailUrl,
  getPrograms,
  mapProgramToDetailButtons,
} from './programs'

import type { Program } from './programs'

const sampleProgram: Program = {
  id: 2,
  documentId: 'qtk88kedte40tclcgs35ij0d',
  title: 'FOOD RESCUE DARI BISNIS MAKANAN',
  description: 'Paragraph one.\n\nParagraph two.',
  ctaLabel: 'Selengkapnya',
  ctaLink: '/mitra',
  createdAt: '2026-05-16T07:56:45.079Z',
  updatedAt: '2026-05-16T07:56:45.079Z',
  publishedAt: '2026-05-16T07:56:45.141Z',
  thumbnail: {
    id: 23,
    documentId: 'r0atlk738rxdzjy8ralvx4qp',
    name: 'image.png',
    alternativeText: null,
    caption: null,
    focalPoint: null,
    width: 526,
    height: 704,
    formats: {
      small: {
        ext: '.png',
        url: '/uploads/small_image.png',
        hash: 'small_hash',
        mime: 'image/png',
        name: 'small_image.png',
        path: null,
        size: 100,
        width: 374,
        height: 500,
      },
    },
    hash: 'hash',
    ext: '.png',
    mime: 'image/png',
    size: 207.53,
    url: '/uploads/image.png',
    previewUrl: null,
    provider: 'strapi-provider-upload-strapi-cloud',
    createdAt: '2026-05-09T08:56:53.794Z',
    updatedAt: '2026-05-09T08:56:53.794Z',
    publishedAt: '2026-05-09T08:56:53.794Z',
  },
}

describe('programs helpers', () => {
  it('formats program description into HTML paragraphs', () => {
    expect(formatProgramDescription(sampleProgram.description)).toBe(
      '<p>Paragraph one.</p><p>Paragraph two.</p>',
    )
  })

  it('prefers small format for program thumbnails when available', () => {
    expect(getProgramThumbnailUrl(sampleProgram.thumbnail)).toBe(
      'https://promising-freedom-82afaec97e.strapiapp.com/uploads/small_image.png',
    )
  })

  it('maps CTA fields into program detail buttons', () => {
    expect(mapProgramToDetailButtons(sampleProgram)).toEqual([
      { text: 'Selengkapnya', href: '/mitra', variant: 'subtle' },
      { text: 'Jadi Mitra', href: '/id/kontak', variant: 'primary' },
    ])
  })

  it('fetches programs from Strapi with populate=*', async () => {
    const exampleResponse = JSON.parse(
      readFileSync(
        resolve('public/example-response/programs (2).json'),
        'utf8',
      ),
    )

    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify(exampleResponse)),
    )

    const programs = await getPrograms({ fetcher })

    expect(programs).toHaveLength(2)
    expect(programs[0]?.title).toBe('FOOD RESCUE DARI BISNIS MAKANAN')
    expect(programs[0]?.thumbnail?.formats?.small?.url).toContain(
      'strapiapp.com',
    )

    const requestUrl = decodeURIComponent(fetcher.mock.calls[0][0].toString())
    expect(requestUrl).toContain('/api/programs')
    expect(requestUrl).toContain('populate=*')
    expect(requestUrl).toContain('sort=publishedAt:asc')
    expect(requestUrl).toContain('locale=id')
  })
})
