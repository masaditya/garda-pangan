import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { KnowledgeDetail } from '../components/knowledge-detail'

describe('KnowledgeDetail', () => {
  const mockProps = {
    title: 'Apresiasi Satu Indonesia Awards',
    authorName: 'Admin Garda Pangan',
    date: '16 Mei 2026',
    images: [
      'https://example.com/cover.jpg',
      'https://example.com/carousel-1.jpg',
    ],
    tags: ['Kesehatan Mental'],
    parsedContent: '<p>Konten artikel lengkap.</p>',
    articleUrl: 'http://localhost:4321/knowledge/apresiasi-satu-indonesia-awards',
    caption: 'Foto dokumentasi kegiatan',
  }

  it('renders hero with author and date', () => {
    render(<KnowledgeDetail {...mockProps} />)

    expect(screen.getByText('Apresiasi Satu Indonesia Awards')).toBeDefined()
    expect(screen.getByText('Admin Garda Pangan')).toBeDefined()
    expect(screen.getByText('16 Mei 2026')).toBeDefined()
  })

  it('renders category tags', () => {
    render(<KnowledgeDetail {...mockProps} />)

    expect(screen.getByText('Kesehatan Mental')).toBeDefined()
  })

  it('navigates carousel images', () => {
    render(<KnowledgeDetail {...mockProps} />)

    const image = screen.getByAltText('Apresiasi Satu Indonesia Awards')
    expect(image.getAttribute('src')).toBe('https://example.com/cover.jpg')

    fireEvent.click(screen.getByRole('button', { name: 'Selanjutnya' }))
    expect(image.getAttribute('src')).toBe('https://example.com/carousel-1.jpg')

    fireEvent.click(screen.getByRole('button', { name: 'Sebelumnya' }))
    expect(image.getAttribute('src')).toBe('https://example.com/cover.jpg')
  })

  it('renders parsed markdown content and caption', () => {
    render(<KnowledgeDetail {...mockProps} />)

    expect(screen.getByText('Konten artikel lengkap.')).toBeDefined()
    expect(screen.getByText('Foto dokumentasi kegiatan')).toBeDefined()
  })
})
