import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MerchandiseFilter } from './merchandise-filter'

describe('MerchandiseFilter', () => {
  const categories = [
    { name: 'Kaos', count: 0 },
    { name: 'Pupuk', count: 15 },
    { name: 'Totebag', count: 104 },
  ]

  it('renders filter options and counts', () => {
    render(
      <MerchandiseFilter
        categories={categories}
        selected={[]}
        onChange={() => {}}
      />,
    )
    expect(screen.getByText('Kaos')).toBeTruthy()
    expect(screen.getByText('15')).toBeTruthy() // Pupuk count
  })

  it('calls onChange when a checkbox is clicked', () => {
    const handleChange = vi.fn()
    render(
      <MerchandiseFilter
        categories={categories}
        selected={['Pupuk']}
        onChange={handleChange}
      />,
    )

    // Actually using role='checkbox'
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
  })
})
