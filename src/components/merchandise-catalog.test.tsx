import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MerchandiseCatalog } from './merchandise-catalog'

describe('MerchandiseCatalog', () => {
  it('renders filter list and product cards', () => {
    render(<MerchandiseCatalog />)
    // Filter title
    expect(screen.getByText('Opsi Filter')).toBeTruthy()
    // Should render some products initially
    const cards = screen.getAllByText('FRESH MAGGOT')
    expect(cards.length).toBeGreaterThan(0)
  })
})
