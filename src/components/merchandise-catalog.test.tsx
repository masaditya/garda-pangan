import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MerchandiseCatalog } from './merchandise-catalog'

describe('MerchandiseCatalog', () => {
  const products = [
    {
      id: 1,
      title: 'Totebag Senja',
      category: 'Totebag',
      date: 'Mei 2026',
      description: 'Totebag mantul',
      platforms: ['Shopee'],
      imageUrl: 'https://example.com/totebag.jpg',
    },
    {
      id: 2,
      title: 'Kaos Garda',
      category: 'Kaos',
      date: 'Apr 2026',
      description: 'Kaos resmi',
      platforms: ['Tokopedia'],
    },
  ]

  const categories = [
    { name: 'Kaos', count: 1 },
    { name: 'Totebag', count: 1 },
  ]

  it('renders filter list and product cards from API data', () => {
    render(<MerchandiseCatalog products={products} categories={categories} />)

    expect(screen.getByText('Opsi Filter')).toBeTruthy()
    expect(screen.getByText('Totebag Senja')).toBeTruthy()
    expect(screen.getByText('Kaos Garda')).toBeTruthy()
  })

  it('filters products by selected category', () => {
    render(<MerchandiseCatalog products={products} categories={categories} />)

    fireEvent.click(screen.getByLabelText('Kaos'))

    expect(screen.getByText('Kaos Garda')).toBeTruthy()
    expect(screen.queryByText('Totebag Senja')).toBeNull()
  })
})
