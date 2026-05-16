import { describe, expect, it } from 'vitest'

import {
  formatProgramDescription,
  getProgramThumbnailUrl,
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
      { text: 'Jadi Mitra', href: '/kontak', variant: 'primary' },
    ])
  })
})
