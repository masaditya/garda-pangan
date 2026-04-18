import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MerchandiseCard } from './merchandise-card'

describe('MerchandiseCard', () => {
  const mockProduct = {
    id: 1,
    title: 'FRESH MAGGOT',
    category: 'Pupuk',
    date: 'Okt 2024',
    description: 'Maggot fresh yang kaya protein, untuk pakan ternak',
    platforms: ['Tokopedia', 'Shopee']
  }

  it('renders product details correctly', () => {
    render(<MerchandiseCard product={mockProduct} />)
    expect(screen.getByText('FRESH MAGGOT')).toBeTruthy()
    expect(screen.getByText('Pupuk')).toBeTruthy()
    expect(screen.getByText('Okt 2024')).toBeTruthy()
    expect(screen.getByText(/kaya protein/i)).toBeTruthy()
    expect(screen.getByText('Tokopedia')).toBeTruthy()
    expect(screen.getByText('Shopee')).toBeTruthy()
  })
})
