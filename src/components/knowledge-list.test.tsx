import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { KnowledgeList } from './knowledge-list'
import type { KnowledgeItem } from '#/lib/strapi/knowledge'

const defaultLabels = {
  searchPlaceholder: 'Cari Knowledge & Insights',
  categoryFilterLabel: 'Kategori',
  filterAllLabel: 'Tampilkan Semua',
  sortNewestLabel: 'Terbaru',
  sortOldestLabel: 'Terlama',
  searchSubmitLabel: 'Search',
  paginationPrevLabel: 'Previous',
  paginationNextLabel: 'Next',
  emptyListMessage: 'Tidak ada artikel yang cocok dengan filter Anda.',
}

describe('KnowledgeList', () => {
  const dummyData: KnowledgeItem[] = [
    {
      id: 1,
      documentId: 'doc-1',
      title: 'First Insight',
      slug: 'first-insight',
      category: 'Kategori A',
      categorySlug: 'kategori-a',
      date: new Date('2026-05-01').toISOString(),
    },
    {
      id: 2,
      documentId: 'doc-2',
      title: 'Second Knowledge',
      slug: 'second-knowledge',
      category: 'Kategori B',
      categorySlug: 'kategori-b',
      date: new Date('2026-04-01').toISOString(),
    },
    {
      id: 3,
      documentId: 'doc-3',
      title: 'Third Item',
      slug: 'third-item',
      category: 'Kategori A',
      categorySlug: 'kategori-a',
      date: new Date('2026-06-01').toISOString(),
    },
  ]

  const categories = [
    { name: 'Kategori A', slug: 'kategori-a' },
    { name: 'Kategori B', slug: 'kategori-b' },
  ]

  test('renders search input and category tabs', () => {
    render(
      <KnowledgeList
        initialKnowledges={dummyData}
        categories={categories}
        labels={defaultLabels}
      />,
    )

    expect(screen.getByPlaceholderText(/Cari Knowledge & Insights/i)).toBeTruthy()
    expect(screen.getByText('Tampilkan Semua')).toBeTruthy()
    expect(screen.getAllByText('Kategori A').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Kategori B').length).toBeGreaterThan(0)
  })

  test('renders provided initial data', () => {
    render(
      <KnowledgeList
        initialKnowledges={dummyData}
        categories={categories}
        labels={defaultLabels}
      />,
    )

    expect(screen.getByText('First Insight')).toBeTruthy()
    expect(screen.getByText('Second Knowledge')).toBeTruthy()
    expect(screen.getByText('Third Item')).toBeTruthy()
  })

  test('shows empty message when no articles match filters', () => {
    render(
      <KnowledgeList initialKnowledges={[]} categories={[]} labels={defaultLabels} />,
    )

    expect(screen.getByText(defaultLabels.emptyListMessage)).toBeTruthy()
    expect(screen.queryByText('Apresiasi Satu Indonesia Awards')).toBeNull()
  })

  test('filters by search query', () => {
    render(
      <KnowledgeList
        initialKnowledges={dummyData}
        categories={categories}
        labels={defaultLabels}
      />,
    )

    const searchInput = screen.getByPlaceholderText(/Cari Knowledge & Insights/i)
    fireEvent.change(searchInput, { target: { value: 'Second' } })

    expect(screen.getByText('Second Knowledge')).toBeTruthy()
    expect(screen.queryByText('First Insight')).toBeNull()
    expect(screen.queryByText('Third Item')).toBeNull()
  })

  test('filters by category tab', () => {
    render(
      <KnowledgeList
        initialKnowledges={dummyData}
        categories={categories}
        labels={defaultLabels}
      />,
    )

    const tabButton = screen.getAllByText('Kategori B')[0]
    fireEvent.click(tabButton)

    expect(screen.getByText('Second Knowledge')).toBeTruthy()
    expect(screen.queryByText('First Insight')).toBeNull()
    expect(screen.queryByText('Third Item')).toBeNull()
  })

  test('sorts items by date correctly', () => {
    render(
      <KnowledgeList
        initialKnowledges={dummyData}
        categories={categories}
        labels={defaultLabels}
      />,
    )

    let headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings[0].textContent).toBe('Third Item')
    expect(headings[1].textContent).toBe('First Insight')
    expect(headings[2].textContent).toBe('Second Knowledge')

    fireEvent.click(screen.getByText('Terbaru'))
    fireEvent.click(screen.getByRole('button', { name: 'Terlama' }))

    headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings[0].textContent).toBe('Second Knowledge')
    expect(headings[1].textContent).toBe('First Insight')
    expect(headings[2].textContent).toBe('Third Item')
  })

  test('links articles to knowledge detail pages', () => {
    render(
      <KnowledgeList
        initialKnowledges={dummyData}
        categories={categories}
        labels={defaultLabels}
      />,
    )

    expect(screen.getByRole('link', { name: /First Insight/i }).getAttribute('href')).toBe(
      '/knowledge/first-insight',
    )
  })
})
