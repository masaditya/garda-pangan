import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { KnowledgeList } from './knowledge-list'
import type { KnowledgeItem } from './knowledge-list'

describe('KnowledgeList', () => {
  const dummyData: KnowledgeItem[] = [
    {
      id: 1,
      documentId: 'doc-1',
      title: 'First Insight',
      slug: 'first-insight',
      category: 'Kategori A',
      date: new Date('2026-05-01').toISOString(),
    },
    {
      id: 2,
      documentId: 'doc-2',
      title: 'Second Knowledge',
      slug: 'second-knowledge',
      category: 'Kategori B',
      date: new Date('2026-04-01').toISOString(),
    },
    {
      id: 3,
      documentId: 'doc-3',
      title: 'Third Item',
      slug: 'third-item',
      category: 'Kategori A',
      date: new Date('2026-06-01').toISOString(),
    },
  ]

  test('renders search input and category tabs', () => {
    render(<KnowledgeList initialKnowledges={dummyData} />)

    expect(screen.getByPlaceholderText(/Cari Knowledge & Insights/i)).toBeTruthy()
    expect(screen.getByText('Tampilkan Semua')).toBeTruthy()
    // It should render categories derived from initial data in tabs
    expect(screen.getAllByText('Kategori A').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Kategori B').length).toBeGreaterThan(0)
  })

  test('renders provided initial data', () => {
    render(<KnowledgeList initialKnowledges={dummyData} />)

    expect(screen.getByText('First Insight')).toBeTruthy()
    expect(screen.getByText('Second Knowledge')).toBeTruthy()
    expect(screen.getByText('Third Item')).toBeTruthy()
  })

  test('renders dummy UI data when initial array is empty', () => {
    render(<KnowledgeList initialKnowledges={[]} />)

    // Should display the preview dummy items
    expect(screen.getAllByText('Apresiasi Satu Indonesia Awards').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Garda Pangan dalam One Planet Network Forum').length).toBeGreaterThan(0)
  })

  test('filters by search query', () => {
    render(<KnowledgeList initialKnowledges={dummyData} />)

    const searchInput = screen.getByPlaceholderText(/Cari Knowledge & Insights/i)
    fireEvent.change(searchInput, { target: { value: 'Second' } })

    expect(screen.getByText('Second Knowledge')).toBeTruthy()
    expect(screen.queryByText('First Insight')).toBeNull()
    expect(screen.queryByText('Third Item')).toBeNull()
  })

  test('filters by category tab', () => {
    render(<KnowledgeList initialKnowledges={dummyData} />)

    // Click on 'Kategori B' tab
    const tabButton = screen.getAllByText('Kategori B')[0] // The first might be the tab, the second might be the dropdown or card label
    fireEvent.click(tabButton)

    expect(screen.getByText('Second Knowledge')).toBeTruthy()
    expect(screen.queryByText('First Insight')).toBeNull()
    expect(screen.queryByText('Third Item')).toBeNull()
  })

  test('sorts items by date correctly', () => {
    render(<KnowledgeList initialKnowledges={dummyData} />)

    // By default it's sorted by 'Terbaru'
    let headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings[0].textContent).toBe('Third Item') // June
    expect(headings[1].textContent).toBe('First Insight') // May
    expect(headings[2].textContent).toBe('Second Knowledge') // April

    // Change sort to 'Terlama'
    const sortDropdownToggle = screen.getByText('Terbaru')
    fireEvent.click(sortDropdownToggle)
    
    const sortOption = screen.getByRole('button', { name: 'Terlama' })
    fireEvent.click(sortOption)

    headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings[0].textContent).toBe('Second Knowledge') // April
    expect(headings[1].textContent).toBe('First Insight') // May
    expect(headings[2].textContent).toBe('Third Item') // June
  })
})
